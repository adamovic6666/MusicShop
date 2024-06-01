import Conversation from "@/app/_components/Conversation/Conversation";
import ConversationsList from "@/app/_components/Conversation/ConversationsList";
import { getListing } from "@/app/services";

const MyMessages = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  if (searchParams?.conversationId) {
    const { data: listing } = await getListing(
      searchParams?.conversationId as string
    );
    return <Conversation listing={listing} />;
  }

  return <ConversationsList />;
};

export default MyMessages;
