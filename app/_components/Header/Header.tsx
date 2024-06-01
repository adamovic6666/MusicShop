"use client";

import { PAGES } from "@/app/_constants";
import { QueryParams, ReactEventType } from "@/app/_types/Index";
import debounce from "@/app/_utils/debounce";
import useQueryParams from "@/app/hooks/useQueryParams";
import useSearch from "@/app/hooks/useSearch";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import Logo from "../UI/Logo";
import Search from "./Search";

const Header = () => {
  const { data: session } = useSession();
  const { setQueryParam } = useQueryParams();
  const { handleSearch } = useSearch();
  const isAuthenticated = session;

  const onChangeHandler = (e: ReactEventType) => {
    const { value } = e.target;
    debounce(() => {
      setQueryParam(QueryParams.Search, value);
      value.trim().length && value.length > 4 && handleSearch(value);
    }, 800);
  };

  return (
    <header className="header">
      <div className="container">
        {/* {isAuthenticated && <>Hello, {session?.user?.name}</>} */}
        <div>
          <Link href={PAGES.HOME_PAGE.PATH}>
            <Logo />
          </Link>
        </div>
        <Search onChange={onChangeHandler} />
        <nav>
          <ul>
            {!isAuthenticated && (
              <div className="auth-links">
                <li>
                  <Link href={PAGES.LOGIN.PATH}>{PAGES.LOGIN.LABEL}</Link>
                </li>
                <li>
                  <Link href={PAGES.REGISTER.PATH}>{PAGES.REGISTER.LABEL}</Link>
                </li>
              </div>
            )}
            <ProfileMenu />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
