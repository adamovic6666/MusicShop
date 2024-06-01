import "next-auth";
import { User } from "./app/_types/Index";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    access_token: string;
    token_type: string;
    user: User;
  }
}
