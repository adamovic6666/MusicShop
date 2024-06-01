"use client";
// import { ConversationMessage } from "@/app/_types/Index";

import { ACTION, API_ENDPOINTS, QUERY, TEXT } from "@/app/_constants";
import {
  ConversationFormData,
  ConversationMessage,
  ConversationProps,
  FormFieldName,
  Listing,
} from "@/app/_types/Index";
import {
  conversationContainsMessagesFromBothUsers,
  formatPrice,
  getNameOfThePersonFromConversation,
  getRatingsPagePathLink,
  getRecepientId,
  getRelativeTime,
  isEnteredText,
} from "@/app/_utils";
import { newConversationMessageValidationSchema } from "@/app/_utils/validationSchemas";
import { sendMessage } from "@/app/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import Button from "../UI/Button";
import CkEditor from "../UI/CkEditor/CkEditor";
import Form from "../UI/Form";

const Conversation = ({ listing }: { listing: Listing }) => {
  const {
    title,
    id: listingId,
    user_id,
    price,
    currency,
    likes,
    created_at,
  } = listing;
  const searchParams = useSearchParams();

  const params = searchParams.get(QUERY.CONVERSATION_PAIR);
  const [isEditorClear, setIsEditorClear] = useState(false);
  const { data: session } = useSession();
  const { data: conversation, mutate } = useSWR<ConversationProps | undefined>(
    API_ENDPOINTS.CONVERSATION_MESSAGES_FOR_LISTING_ID(
      listing.id,
      params ? params : `${user_id}-${session?.user.id}`
    )
  );
  const { data: userFromConversation, isLoading } = useSWR(
    session?.user.id === listing.creator.id &&
      API_ENDPOINTS.GET_USER(conversation?.data?.[0].sender_id?.toString()!)
  );

  const { handleSubmit, register, control, watch, setValue } =
    useForm<ConversationFormData>({
      resolver: yupResolver(newConversationMessageValidationSchema),
    });

  const watchedConversationMessage = watch(FormFieldName.ConversationMessage);
  const recepientId =
    user_id !== session?.user.id ? user_id : getRecepientId(conversation?.data);

  const onSubmit = async (conversationFormData: ConversationFormData) => {
    setIsEditorClear(false);

    const { conversationMessage } = conversationFormData;
    const data = {
      content: conversationMessage,
      listing_id: listingId,
      recipient_id: recepientId,
      sender_id: session?.user.id,
    };
    await sendMessage(data);

    if (conversation?.data) {
      mutate(
        {
          data: [...conversation?.data, { ...data }],
          alreadyRated: conversation?.alreadyRated || false,
        },
        { revalidate: false }
      );
    }

    setIsEditorClear(true);
    setValue(FormFieldName.ConversationMessage, null);
  };

  return (
    <div className="container conversations-form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="conversation-form-header">
          <div>
            {session?.user.id === listing.creator.id
              ? userFromConversation?.data?.name
              : getNameOfThePersonFromConversation(session, listing)}
          </div>
          {conversationContainsMessagesFromBothUsers(
            conversation?.data,
            session?.user
          ) && (
            <Link
              className={conversation?.alreadyRated ? "link-disabled" : ""}
              href={getRatingsPagePathLink(
                conversation?.data,
                user_id,
                session?.user.id!
              )}
            >
              {ACTION.GIVE_GRADE}
            </Link>
          )}
        </div>
        <div>
          <p>{title}</p>
          <p>{formatPrice(price, currency)}</p>
          <p>{TEXT.LISTING_LIKES(likes?.length)}</p>
          <p>{getRelativeTime(created_at)}</p>
        </div>
        <div className="conversations">
          {conversation &&
            conversation?.data?.map(
              (message: ConversationMessage, i: number) => {
                return (
                  <div
                    className={`message-${
                      session?.user.id !== message.sender_id
                        ? "receiver"
                        : "sender"
                    }`}
                    key={i}
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  />
                );
              }
            )}
        </div>
        <CkEditor
          {...register(FormFieldName.ConversationMessage)}
          control={control}
          isEditorClear={isEditorClear}
        />
        <Button isDisabled={!isEnteredText(watchedConversationMessage)}>
          {ACTION.SEND_MESSAGE}
        </Button>
      </Form>
    </div>
  );
};

export default Conversation;
