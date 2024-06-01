import { PAGES, TEXT } from "@/app/_constants";
import { Listing, ListingProps } from "@/app/_types/Index";
import { formatPrice, getFormatedDate } from "@/app/_utils";
import Link from "next/link";
import AddToFavorites from "../UI/AddToFavorites";

const ListingsListItem = ({
  listing,
  updateFavorites,
  canEdit,
}: ListingProps) => {
  const {
    id,
    title,
    description,
    created_at,
    likedByUser,
    price,
    currency,
  }: Listing = listing;
  return (
    <div className="listing-item">
      <AddToFavorites
        listingId={id}
        likedByUser={likedByUser}
        updateFavorites={updateFavorites}
      />
      <Link href={PAGES.SINGLE_LISTING_PAGE.PATH(id)}>
        <h2>{title}</h2>
      </Link>
      <p>{description}</p>
      <p>{getFormatedDate(created_at)}</p>
      <p>{TEXT.LISTING_PRICE(formatPrice(price, currency))}</p>
      {canEdit && (
        <Link
          className="change-listing"
          href={PAGES.LISTING_EDIT_PAGE.PATH(id)}
        >
          {TEXT.LISTING_EDIT}
        </Link>
      )}
    </div>
  );
};
export default ListingsListItem;
