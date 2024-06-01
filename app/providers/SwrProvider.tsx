"use client";

// Others

import httpClient from "@/httpClient";
import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

export const fetcher = async (url: string) =>
  httpClient.get(url).then((res) => res.data);

const SwrProvider = ({ children }: PropsWithChildren) => {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrProvider;
