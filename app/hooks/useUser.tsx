import { useSession } from "next-auth/react";

const useUser = () => {
  const { data: session } = useSession();
  return session?.user;
};

export default useUser;
