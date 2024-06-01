// import { EditorState, convertToRaw } from "draft-js";
// import draftToHtml from "draftjs-to-html";
import { signIn } from "next-auth/react";
import { PAGES } from "../_constants";
import {
  Conversation,
  ConversationMessage,
  ConversationRates,
  Creator,
  Currency,
  DynamicObjectWithArrayOfNumbersOrStrings,
  GradesType,
  IsLikedType,
  Listing,
  ListingFormData,
  ListingRatingsFormData,
  OptionType,
  Rating,
  SortOptionsLabels,
  SortOptionsTypes,
  User,
  UserStatuses,
} from "../_types/Index";

export const signInHandler = async <T,>(user: T) => {
  await signIn("credentials", {
    redirect: false,
    user: JSON.stringify(user),
  });
};

// const convertToHtml = (editorState: EditorState) =>
// draftToHtml(convertToRaw(editorState.getCurrentContent()));

export const formatedListingFormData = (
  listingFormData: ListingFormData,
  brands: OptionType[]
) => {
  const formData = new FormData();
  const isNewlyMadeBrand = !brands.some(
    (brand) => brand.value === listingFormData.brand
  );

  // brand
  formData.append(
    isNewlyMadeBrand ? "brand" : "brand_id",
    listingFormData.brand
  );
  //model
  formData.append("model", listingFormData.model);
  //title
  formData.append("title", listingFormData.title);
  //description ( can be string or object )
  formData.append("description", listingFormData?.description);
  //price
  formData.append(
    "price",
    (parseInt(listingFormData?.price, 10) * 100).toString()
  );
  //category
  formData.append("category_id", listingFormData?.category);
  //currency
  formData.append("currency", listingFormData?.currency);
  // country
  listingFormData?.country
    ? formData.append("country_id", listingFormData.country)
    : formData.append("country_id", "197"); // ID FOR SERBIA
  // options
  if (listingFormData.options && Object.keys(listingFormData.options).length) {
    formData.append("options", JSON.stringify(listingFormData?.options));
  }
  //state
  listingFormData.state && formData.append("state", listingFormData?.state);
  //images
  if (listingFormData.images) {
    for (let i = 0; i < listingFormData.images.length; i++) {
      formData.append(`images[${[i]}]`, listingFormData.images[i]);
    }
  }

  return formData;
};

export const withNoCache = () => {
  return {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  };
};

export const getFormatedDate = (originalDateString: string) => {
  const dateObject = new Date(originalDateString);

  const day = dateObject.getUTCDate().toString().padStart(2, "0");
  const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = dateObject.getUTCFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export const getBrandName = (brands: OptionType[], branId: number) => {
  const brand = brands.find((brands: OptionType) => brands.value === branId);
  return brand?.label;
};

export const onUncheckHandler = (category: OptionType) => {
  // Find the category based on the provided value

  if (category) {
    // Iterate over each key in the additionalOptions object
    for (const key in category.additionalOptions) {
      if (category.additionalOptions.hasOwnProperty(key)) {
        // Iterate over each option and set isChecked to false
        category.additionalOptions[key].forEach((option) => {
          option.isChecked = false;
        });
      }
    }
  }

  return category;
};

export const getSelectedOptions = ({ additionalOptions }: OptionType) => {
  const newObject: DynamicObjectWithArrayOfNumbersOrStrings = {};
  for (const key in additionalOptions) {
    const selectedValues = Array.from(
      new Set(
        additionalOptions[key]
          .concat(additionalOptions[key] || [])
          .filter((innerObj) => innerObj.isChecked)
          .map(({ value }) => value)
      )
    );

    if (selectedValues.length > 0) {
      newObject[key] = selectedValues;
    }
  }

  return newObject;
};

export const selectCategoryHandler = (
  prevSelectedCategory: OptionType,
  isChecked: boolean,
  optionValue: string | number,
  key: string
) => {
  const data = { ...prevSelectedCategory };
  if (
    prevSelectedCategory.additionalOptions &&
    prevSelectedCategory.additionalOptions[key]
  ) {
    prevSelectedCategory.additionalOptions?.[key].forEach((element) => {
      element.isChecked = false;
    });
    const option = prevSelectedCategory?.additionalOptions?.[key].find(
      (opt) => opt.value === optionValue
    );

    option.isChecked = isChecked;
  }
  return data;
};

export const isAbleToSendMessage = (
  loggedUserID: number,
  createdLsitingUserID: number
) => {
  return loggedUserID !== createdLsitingUserID;
};

export const withQuery = (key: string, value: string | number) =>
  `?${key}=${encodeURIComponent(value)}`;

export const formatPrice = (price: number, currency: string) => {
  const numericPrice = price / 100;
  const formattedPrice = numericPrice.toLocaleString("de-DE", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedPrice;
};

export const isNumber = (value: string | number) => {
  return !isNaN(Number(value.toString()));
};

export const isEnteredText = (value: string | undefined) => {
  return !!value && value !== "<p></p>";
};

export const getRecepientId = (
  conversation: ConversationMessage[] | undefined
) => {
  return conversation?.[0].sender_id!;
};

export const onUpdateListingsAfterAddToFavoritesClickHandler = (
  listings: Listing[],
  listingId: number,
  likedByUser: boolean
) => {
  const updateData = listings?.map((item: Listing) => {
    if (item.id === listingId) {
      return { ...item, likedByUser };
    }
    return item;
  });
  return updateData;
};

export const getNameOfThePersonFromConversation = (
  sessionUser: any,
  listing: Listing
) => {
  return sessionUser?.id === listing.creator.id
    ? sessionUser.user.name
    : listing.creator.name;
};

export const getSenderName = (conversation: Conversation, user: User) => {
  if (conversation?.sender_id !== user?.id) {
    return conversation?.sender?.name;
  }
  return conversation?.recipient?.name;
};

export const getNameOfUserWhoseGradesAreBeingRated = (
  rating: Rating[],
  userId: string
) => {
  if (rating?.[0]?.buyer_id === +userId) {
    return rating[0]?.buyer?.name;
  }
  return rating?.[0]?.seller?.name;
};

export const conversationContainsMessagesFromBothUsers = (
  conversation: ConversationMessage[] | undefined,
  user: User | undefined
) => {
  {
    if (conversation?.length) {
      let hasSender = false;
      let hasRecipient = false;

      for (let i = 0; i < conversation.length; i++) {
        if (conversation[i].sender_id === user?.id) {
          hasSender = true;
        }
        if (conversation[i].recipient_id === user?.id) {
          hasRecipient = true;
        }
      }

      return hasSender && hasRecipient;
    }
  }
};

export const modifiedGradingData = (
  formData: ListingRatingsFormData,
  userSessionId: number,
  listing: Listing,
  userIdFromParams: null | string,
  buyer: User
) => {
  const modifiedData = {
    ...formData,
    listing_id: listing.id,
    buyer_id: userIdFromParams ? buyer?.id : userSessionId,
    seller_id: listing.creator.id,
    is_positive: +formData.is_positive,
    communication: +formData.communication,
    agreement: +formData.agreement,
    description: userIdFromParams ? null : +formData.description,
    payment: userIdFromParams ? +formData.description : null,
  };

  return modifiedData;
};

export const isAlreadyLikedByUser = (creator: Creator, userId: number) => {
  return creator?.ratings?.some((rating) => rating.buyer_id === userId);
};

export const getGrade = (value: number | undefined) => {
  return Object.keys(GradesType).find(
    (key) => GradesType[key as keyof typeof GradesType] === value?.toString()
  ) as GradesType | undefined;
};

export const getLikedByUser = (value: string) => {
  return Object.keys(IsLikedType).find(
    (key) => IsLikedType[key as keyof typeof IsLikedType] === value
  ) as IsLikedType | undefined;
};

export const getGraderName = (rating: Rating) => {
  if (rating.buyer_id !== rating.userId) {
    return rating.buyer.name;
  }
  return rating.seller.name;
};

export const getRatingsPagePathLink = (
  conversation: ConversationMessage[] | undefined,
  userId: number,
  sessionsUserId: number
) => {
  const id = userId !== sessionsUserId ? userId : getRecepientId(conversation);
  if (userId !== sessionsUserId) {
    return `${PAGES.USER_GRADES_AND_COMMENTS.PATH}/${conversation?.[0].listing_id}`;
  }
  return `${PAGES.USER_GRADES_AND_COMMENTS.PATH}/${conversation?.[0].listing_id}?user_id=${id}`;
};

export const getOnlySellerPositiveRatings = (
  ratings: Rating[],
  userId: number
) => {
  return ratings?.filter(
    (rating) => rating.is_positive === 1 && rating.seller.id === userId
  );
};
export const getOnlySellerNegativeRatings = (
  ratings: Rating[],
  userId: number
) => {
  return ratings?.filter(
    (rating) => rating.is_positive === 0 && rating.seller.id === userId
  );
};

export const getUserRatingTabsWithTotals = (
  ratings: Rating[],
  userId: number
) => {
  const sellerPositiveTotal = ratings?.filter(
    (rating) => rating.is_positive === 1 && rating.seller.id === userId
  ).length;

  const sellerNegativeTotal = ratings?.filter(
    (rating) => rating.is_positive === 0 && rating.seller.id === userId
  ).length;

  const buyerPositiveTotal = ratings?.filter(
    (rating) => rating.is_positive === 1 && rating.buyer.id === userId
  ).length;

  const buyerNegativeTotal = ratings?.filter(
    (rating) => rating.is_positive === 0 && rating.buyer.id === userId
  ).length;

  return {
    seller: [
      {
        is_positive: 1,
        type: UserStatuses.Seller,
        total: sellerPositiveTotal,
        id: `${UserStatuses.Seller}-1`,
      },
      {
        is_positive: 0,
        type: UserStatuses.Seller,
        total: sellerNegativeTotal,
        id: `${UserStatuses.Seller}-0`,
      },
    ],
    buyer: [
      {
        is_positive: 1,
        type: UserStatuses.Buyer,
        total: buyerPositiveTotal,
        id: `${UserStatuses.Buyer}-1`,
      },
      {
        is_positive: 0,
        type: UserStatuses.Buyer,
        total: buyerNegativeTotal,
        id: `${UserStatuses.Buyer}-0`,
      },
    ],
  };
};

export const updateUserRatingTabValues = (
  initialRatings: Rating[],
  type: string,
  is_positive: number,
  userId: number
) => {
  return initialRatings.filter((rating) => {
    const isSellerMatch =
      type === UserStatuses.Seller &&
      +rating.seller.id === +userId &&
      rating.is_positive === is_positive;
    const isBuyerMatch =
      type === UserStatuses.Buyer &&
      +rating.buyer.id === +userId &&
      rating.is_positive === is_positive;
    return isSellerMatch || isBuyerMatch;
  });
};

export const getOnlyUserRatings = (ratings: Rating[], userId: number) => {
  return ratings?.filter((rating) => rating.rater_id !== userId);
};

// i need a function which will take a date, and return a string like : juce, pre dva dana, pre tri dana do nedelju dana, a onda dalje dve nedelje, tri nedelje i na kraju pre mesec dana
export const getRelativeTime = (date: string) => {
  const dateObject = new Date(date);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - dateObject.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return "danas";
  }
  if (daysDifference === 1) {
    return "juče";
  }
  if (daysDifference === 2) {
    return "pre dva dana";
  }
  if (daysDifference === 3) {
    return "pre tri dana";
  }
  if (daysDifference <= 7) {
    return `pre ${daysDifference} dana`;
  }
  if (daysDifference <= 14) {
    return "pre nedelju dana";
  }
  if (daysDifference <= 21) {
    return "pre dve nedelje";
  }
  if (daysDifference <= 28) {
    return "pre tri nedelje";
  }
  return "pre mesec dana";
};

export const getInitialUserRatings = (
  ratedNegative: boolean,
  onlyUserRatings: Rating[],
  userId: number
) => {
  return ratedNegative
    ? getOnlySellerNegativeRatings(onlyUserRatings, userId)
    : getOnlySellerPositiveRatings(onlyUserRatings, userId);
};

export const compareDates = (date1String: string, date2String: string) => {
  const date1 = new Date(date1String);
  const date2 = new Date(date2String);
  return date1 < date2;
};

export const comparePrices = (
  a: Listing,
  b: Listing,
  conversationRates: ConversationRates | null,
  priceSortingType: SortOptionsTypes.PriceAsc | SortOptionsTypes.PriceDesc
) => {
  let priceA = a.price;
  let priceB = b.price;
  const convertCurrencyToEur = (price: number, currency: string) => {
    if (currency === Currency.eur || currency === Currency.EUR) {
      return price / 100 / conversationRates?.EUR!;
    }
    if (currency === Currency.USD) {
      return price / 100 / conversationRates?.USD!;
    }
    if (currency === Currency.RSD) {
      return price / 100;
    }
    return price;
  };

  priceA = convertCurrencyToEur(a.price, a.currency);
  priceB = convertCurrencyToEur(b.price, b.currency);

  return priceSortingType === SortOptionsTypes.PriceAsc
    ? priceA - priceB
    : priceB - priceA;
};
export const getSortedListings = (
  searchParams: string | null,
  listings: Listing[],
  conversationRates: ConversationRates | null
) => {
  const sortedListings = searchParams
    ? listings?.sort((a: Listing, b: Listing) => {
        if (searchParams === SortOptionsTypes.PriceAsc) {
          return comparePrices(
            a,
            b,
            conversationRates,
            SortOptionsTypes.PriceAsc
          );
        } else if (searchParams === SortOptionsTypes.PriceDesc) {
          return comparePrices(
            a,
            b,
            conversationRates,
            SortOptionsTypes.PriceDesc
          );
        } else if (searchParams === SortOptionsTypes.YearAsc) {
          return compareDates(a.created_at, b.created_at) ? -1 : 1;
        } else if (searchParams === SortOptionsTypes.YearDesc) {
          return compareDates(a.created_at, b.created_at) ? 1 : -1;
        }
        return 0;
      })
    : listings;

  return sortedListings;
};

export const SortOptions = [
  {
    value: SortOptionsTypes.PriceAsc,
    label: SortOptionsLabels[SortOptionsTypes.PriceAsc],
  },
  {
    value: SortOptionsTypes.PriceDesc,
    label: SortOptionsLabels[SortOptionsTypes.PriceDesc],
  },
  {
    value: SortOptionsTypes.YearAsc,
    label: SortOptionsLabels[SortOptionsTypes.YearAsc],
  },
  {
    value: SortOptionsTypes.YearDesc,
    label: SortOptionsLabels[SortOptionsTypes.YearDesc],
  },
];
