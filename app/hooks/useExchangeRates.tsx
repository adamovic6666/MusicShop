import { useEffect, useState } from "react";
import { ConversationRates } from "../_types/Index";
import { getExchangeRates } from "../services";

const useExchnageRates = () => {
  const [conversationRates, setConversationRatess] =
    useState<ConversationRates | null>(null);

  useEffect(() => {
    getExchangeRates()
      .then((data) => setConversationRatess(data?.conversion_rates))
      .catch((error) => console.log(error, "error"));
  }, []);

  return { conversationRates };
};

export default useExchnageRates;
