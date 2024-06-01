"use client";
import ListingDetailsPage from "@/app/_components/ListingsList/ListingDetailsPage";
import { API_ENDPOINTS } from "@/app/_constants";
import useSWR from "swr";

const SingleListingPage = ({ params }: { params: { listingId: string } }) => {
  const { data, mutate } = useSWR(
    API_ENDPOINTS.LISTINGS + "/" + params?.listingId
  );

  return (
    data && (
      <div className="container listing-page">
        <ListingDetailsPage
          {...data?.data}
          updateFavorites={(likedByUser) => {
            return mutate({
              ...data,
              data: {
                ...data.data,
                likedByUser,
              },
            });
          }}
        />
      </div>
    )
  );
};

export default SingleListingPage;
