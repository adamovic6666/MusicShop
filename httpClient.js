import axios from "axios";
import { getSession } from "next-auth/react";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

httpClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session && session?.access_token) {
    config.headers.Authorization = `${session.token_type} ${session.access_token}`;
  }
  return config;
});

export default httpClient;
