"use client";
import { ACTION, PAGES, QUERY, TEXT } from "@/app/_constants";
import { Listing } from "@/app/_types/Index";
import { formatPrice, getFormatedDate, withQuery } from "@/app/_utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import flags from "../../_utils/flags";
import AddToFavorites from "../UI/AddToFavorites";

import SliderWithLightGallery from "../UI/SliderWithLightgallery";

const ListingDetailsPage = ({
  title,
  description,
  images,
  state,
  brand,
  country,
  created_at,
  price,
  currency,
  model,
  user_id,
  id,
  likedByUser,
  likes,
  creator,
  updateFavorites,
}: Listing) => {
  const { data: session } = useSession();

  return (
    <div>
      <AddToFavorites
        listingId={id}
        likedByUser={likedByUser}
        updateFavorites={updateFavorites}
      />
      <h2>{title}</h2>
      <p>{TEXT.LISTING_CREATOR_STATUS(creator?.status)}</p>
      <p>{TEXT.LISTING_CREATOR_NAME(creator?.name)}</p>
      <p>
        {TEXT.LISTING_CREATOR_POSITIVE_RATINGS}
        <Link
          className="default-link"
          href={`${PAGES.USER_RATINGS.PATH(creator?.id)}`}
        >
          {creator?.positiveRatings}
        </Link>
      </p>
      <p>
        {TEXT.LISTING_CREATOR_NEGATIVE_RATINGS}
        <Link
          className="default-link"
          href={`${PAGES.USER_RATINGS.PATH(creator?.id)}?rated-negative="true"`}
        >
          {creator?.negativeRatings}
        </Link>
      </p>
      {creator?.email_verified_at && (
        <p>{TEXT.LISTING_CREATOR_ACCOUNT_SINCE(creator?.email_verified_at)}</p>
      )}
      <p>{TEXT.LISTING_MODEL(model)}</p>
      <p>{TEXT.LISTING_DESCRIPTION(description)}</p>
      <p>{TEXT.LISTING_CREATED_AT(getFormatedDate(created_at))}</p>
      <p>{TEXT.LISTING_PRICE(formatPrice(price, currency))}</p>
      <p>{TEXT.LISTING_ID(id)}</p>
      <p>{TEXT.LISTING_LIKES(likes?.length)}</p>
      <p>{TEXT.LISTING_HOLDER_ACCOUNT_SINCE(creator.created_at)}</p>
      {brand && <p>{TEXT.LISTING_BRAND(brand?.name)}</p>}
      {country && <p>{flags[country.alpha2]}</p>}
      {state && <p>{TEXT.LISTING_STATE(state)}</p>}
      {!!images?.length && <SliderWithLightGallery images={images} />}
      <Link
        className="all-user-listings"
        href={PAGES.USER_SELLING_LISTINGS.PATH(user_id)}
      >
        {TEXT.LISTING_HOLDER_ALL_LISTINGS}
      </Link>
      {session?.user.id! !== user_id && (
        <Link
          href={
            !session
              ? `${PAGES.LOGIN.PATH}${withQuery(
                  QUERY.REDIRECT_CONVERSATION_ID,
                  id
                )}`
              : `${PAGES.USER_MESSAGES.PATH}${withQuery(
                  QUERY.CONVERSATION_ID,
                  id
                )}`
          }
        >
          {ACTION.CONTACT_SELLER}
        </Link>
      )}
    </div>
  );
};

export default ListingDetailsPage;
