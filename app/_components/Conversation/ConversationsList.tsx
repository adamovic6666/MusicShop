"use client";
// import useUser from "@/app/hooks/useUser";

import { API_ENDPOINTS, PAGES, QUERY } from "@/app/_constants";
import { Conversation } from "@/app/_types/Index";
import { getFormatedDate, getSenderName, withQuery } from "@/app/_utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";

const ConversationsList = () => {
  const { data: conversations } = useSWR(API_ENDPOINTS.CONVERSATIONS);
  const { data: session } = useSession();

  return (
    <div className="container">
      {conversations?.data?.map((conversation: Conversation, i: number) => {
        return (
          <Link
            href={`${PAGES.USER_MESSAGES.PATH}${withQuery(
              QUERY.CONVERSATION_ID,
              conversation.listing_id
            )}&${QUERY.CONVERSATION_PAIR}=${conversation?.sender_id}-${
              conversation?.recipient_id
            }`}
            key={i}
            className="conversation-teaser"
          >
            <span>{getSenderName(conversation, session?.user!)}</span>
            <span> {conversation?.listing.title}</span>
            <div
              dangerouslySetInnerHTML={{ __html: conversation.content }}
            ></div>
            {conversation?.updated_at && (
              <span>{getFormatedDate(conversation?.updated_at)}</span>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default ConversationsList;
