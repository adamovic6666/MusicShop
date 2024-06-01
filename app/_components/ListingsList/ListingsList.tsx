"use client";
import { API_ENDPOINTS, TEXT } from "@/app/_constants";
import { Listing } from "@/app/_types/Index";
import {
  getSortedListings,
  onUpdateListingsAfterAddToFavoritesClickHandler,
} from "@/app/_utils";
// import { useSession } from "next-auth/react";
import useExchnageRates from "@/app/hooks/useExchangeRates";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import ListingsListItem from "./ListingsListItem";
// import useUser from "@/app/hooks/useUser";

const ListingsList = () => {
  // const { user } = useUser();
  const { data: listings, mutate, isLoading } = useSWR(API_ENDPOINTS.LISTINGS);
  const { conversationRates } = useExchnageRates();
  const searchParams = useSearchParams().get("sort");

  if (isLoading && !listings) {
    return <>{TEXT.LOADING}</>;
  }

  return (
    <div className="listings">
      {getSortedListings(searchParams, listings?.data, conversationRates)?.map(
        (listing: Listing) => (
          <ListingsListItem
            listing={listing}
            key={listing.id}
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
        )
      )}
    </div>
  );
};

export default ListingsList;
