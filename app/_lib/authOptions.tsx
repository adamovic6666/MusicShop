import httpClient from "@/httpClient";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        user: {},
      },
      // @ts-ignore
      async authorize(data = null) {
        if (data.user) {
          return JSON.parse(data.user);
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/user/login",
    error: "/user/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // @ts-ignore
    async signIn(data) {
      return data;
    },

    async jwt(token) {
      httpClient.defaults.headers.common.Authorization = `${token?.token?.token_type} ${token?.token?.access_token}`;
      return {
        user: token.token.user ?? token.user,
      };
    },

    async signOut() {},

    // @ts-ignore
    async session({ session, token }) {
      // @ts-ignore
      if (token?.user?.access_token) {
        // @ts-ignore
        httpClient.defaults.headers.common.Authorization = `${token?.user?.token_type} ${token?.user?.access_token}`;
      }

      return {
        expires: session.expires,
        // @ts-ignore
        token_type: token?.user?.token_type,
        // @ts-ignore
        access_token: token?.user?.access_token,
        // @ts-ignore
        user: { ...token?.user?.user },
      };
    },
  },
};
