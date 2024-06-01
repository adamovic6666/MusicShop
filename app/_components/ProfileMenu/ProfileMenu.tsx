"use client";

import { ACTION, API_ENDPOINTS, PAGES } from "@/app/_constants";
import { ToastType } from "@/app/_types/Index";
import httpClient from "@/httpClient";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import { createToast } from "../UI/Toast";

const ProfileMenu = () => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  const isAuthenticated = session;
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
  const nameFirstLetter = session?.user.name.charAt(0);

  useEffect(() => setProfileMenuIsOpen(false), [pathname]);

  return (
    <div className="profile-menu">
      {isAuthenticated && (
        <div
          onClickCapture={() => setProfileMenuIsOpen(!profileMenuIsOpen)}
          className="avatar"
        >
          {nameFirstLetter}
        </div>
      )}
      {profileMenuIsOpen && (
        <nav>
          {isAuthenticated && (
            <>
              <li>
                <Link href={PAGES.NEW_LISTING.PATH}>
                  {PAGES.NEW_LISTING.LABEL}
                </Link>
              </li>
              <li>
                <Link href={PAGES.USER_SELLING_LISTINGS.PATH(session.user.id)}>
                  {PAGES.USER_SELLING_LISTINGS.LABEL}
                </Link>
              </li>
              <li>
                <Link href={PAGES.MY_GRADES.PATH(session.user.id)}>
                  {PAGES.MY_GRADES.LABEL}
                </Link>
              </li>
              <li>
                <Link href={PAGES.USER_SELLING_ORDERS.PATH}>
                  {PAGES.USER_SELLING_ORDERS.LABEL}
                </Link>
              </li>

              <li>
                <Link href={PAGES.USER_BYING_ORDERS.PATH}>
                  {PAGES.USER_BYING_ORDERS.LABEL}
                </Link>
              </li>
              <li>
                <Link href={PAGES.USER_FAVORITES.PATH}>
                  {PAGES.USER_FAVORITES.LABEL}
                </Link>
              </li>
              <li>
                <Link href={PAGES.USER_MESSAGES.PATH}>
                  {PAGES.USER_MESSAGES.LABEL}
                </Link>
              </li>
              <li>
                <Link href={PAGES.USER_ACCOUNT.PATH}>
                  {PAGES.USER_ACCOUNT.LABEL}
                </Link>
              </li>
              <li>
                <Button
                  onClick={() => {
                    signOut({ redirect: false });
                    push(PAGES.HOME_PAGE.PATH);
                    httpClient
                      .post(API_ENDPOINTS.LOGOUT, {
                        headers: {
                          Authorization: `Bearer ${session?.access_token}`,
                        },
                      })
                      .then(async ({ data }) => {
                        push(PAGES.LOGIN.PATH);
                        createToast({
                          message: data.message,
                          type: ToastType.Success,
                        });
                      });
                  }}
                >
                  {ACTION.LOGOUT}
                </Button>
              </li>
            </>
          )}
        </nav>
      )}
    </div>
  );
};

export default ProfileMenu;
