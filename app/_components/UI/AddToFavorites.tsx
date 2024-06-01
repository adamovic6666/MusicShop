"use client";

import { API_ENDPOINTS, PAGES } from "@/app/_constants";
import { AddToFavoritesProps, ToastType } from "@/app/_types/Index";
import httpClient from "@/httpClient";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import useSWRMutation from "swr/mutation";
import * as Icons from "../Icons/Icons";
import { createToast } from "./Toast";

const postRequest = async (
  url: string,
  { arg }: { arg: { listing_id: number } }
) => {
  return httpClient.post(url, arg).then((res) => res.data);
};

const AddToFavorites = (props: AddToFavoritesProps) => {
  const { listingId, likedByUser, updateFavorites } = props;
  const { trigger: addToFavoritesHandler } = useSWRMutation(
    API_ENDPOINTS.FAVORITES,
    postRequest
  );
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    session &&
    pathname !== PAGES.USER_FAVORITES.PATH && (
      <Icons.Favorite
        isLiked={likedByUser}
        onClick={async () => {
          try {
            const data = await addToFavoritesHandler({
              listing_id: listingId,
            });
            updateFavorites(!likedByUser);
            createToast({
              message: data.message,
              type: ToastType.Success,
            });
          } catch (e: any) {
            // error handling
            createToast({
              message: e?.message,
              type: ToastType.Success,
            });
          }
        }}
      />
    )
  );
};

export default AddToFavorites;
