// Third party library
import { getServerSession } from "next-auth";

// Others
import { redirect } from "next/navigation";
import { PAGES } from "../_constants";
import { authOptions } from "../_lib/authOptions";

const useProtect = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect(PAGES.HOME_PAGE.PATH);
};

export default useProtect;
