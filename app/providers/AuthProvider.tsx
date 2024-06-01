"use client";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: any) => (
  <SessionProvider>{children}</SessionProvider>
);

export default AuthProvider;
