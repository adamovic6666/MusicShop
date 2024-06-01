"use client";
import { API_ENDPOINTS } from "@/app/_constants";
import { Listing } from "@/app/_types/Index";
import { onUpdateListingsAfterAddToFavoritesClickHandler } from "@/app/_utils";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import ListingsListItem from "../ListingsList/ListingsListItem";

const UserListings = ({ userId }: { userId: number }) => {
  const { data: session } = useSession();
  const {
    data: listings,
    mutate,
    error,
  } = useSWR(API_ENDPOINTS.GET_USER_LISTINGS(userId));

  if (error)
    return <div className="container">{error.response.data.message}</div>;

  return (
    <div className="container listings">
      {listings?.data?.map((listing: Listing) => {
        return (
          <ListingsListItem
            listing={listing}
            key={listing.id}
            canEdit={session?.user.id === userId}
            updateFavorites={(likedByUser) => {
              const updatedData =
                onUpdateListingsAfterAddToFavoritesClickHandler(
                  listings.data,
                  listing.id,
                  likedByUser
                );
              return mutate(
                { ...listings, data: [...updatedData] },
                { revalidate: false }
              );
            }}
          />
        );
      })}
    </div>
  );
};

export default UserListings;
