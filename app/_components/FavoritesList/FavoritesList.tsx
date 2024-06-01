"use client";
import { API_ENDPOINTS, TEXT } from "@/app/_constants";
import { Listing } from "@/app/_types/Index";
import { onUpdateListingsAfterAddToFavoritesClickHandler } from "@/app/_utils";
import useSWR from "swr";
import ListingsListItem from "../ListingsList/ListingsListItem";

const FavoritesList = () => {
  const {
    data: favorites,
    mutate,
    isLoading,
  } = useSWR(API_ENDPOINTS.FAVORITES);

  if (isLoading) {
    return <>{TEXT.LOADING}</>;
  }

  if (!favorites?.data?.length) {
    return <>{TEXT.NO_LISTINGS}</>;
  }

  return (
    <div className="container listings">
      {favorites?.data?.map((listing: Listing) => {
        return (
          <ListingsListItem
            listing={listing}
            key={listing.id}
            updateFavorites={(likedByUser) => {
              const updatedData =
                onUpdateListingsAfterAddToFavoritesClickHandler(
                  favorites.data,
                  listing.id,
                  likedByUser
                );
              return mutate(
                { ...favorites, data: [...updatedData] },
                { revalidate: false }
              );
            }}
          />
        );
      })}
    </div>
  );
};

export default FavoritesList;
