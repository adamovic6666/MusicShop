import React, {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
} from "react";
import { Control } from "react-hook-form";

export type ReactEventType = React.ChangeEvent<HTMLInputElement>;
export type ReactNodeType = React.ReactNode;

export interface InputProps {
  name: string;
  type?: FormInputType;
  label?: string;
  error?: string | undefined;
  onChange: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  id?: string;
}

export interface ListingProps {
  listing: Listing;
  updateFavorites: (isLiked: boolean) => void;
  canEdit?: boolean;
}

export interface TextAreaProps {
  name: string;
  label?: string;
  error?: string | undefined;
  onChange: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  required?: Boolean;
}

export interface BackdropProps {
  onClose: () => void;
  children: ReactNodeType;
}

export interface PortalProps {
  children: ReactNodeType;
}

export interface CreatableSelectProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string | undefined;
  onBlur?: FocusEventHandler;
  control?: Control<any>;
  options: OptionType[];
  allowCreate?: boolean;
  isClearable?: boolean;
  defaultValue?: OptionType[] | undefined;
}

export interface CkEditorProps {
  label?: string;
  name: string;
  required?: boolean;
  error?: string | undefined;
  control: Control<any>;
  isGeneratedListingDescription?: boolean;
  isEditorClear?: boolean;
  onResetDescriptionGeneration?: () => void;
}

export interface Brand {
  id: number;
  name: string;
  created_at: null | string;
  updated_at: null | string;
  slug: string;
}

export interface Country {
  id: number;
  name: string;
  created_at: null | string;
  updated_at: null | string;
  alpha2: string;
  alpha3: string;
}

export interface Category {
  id: number;
  name: string;
  options: {
    [key: string]: string[];
  };
}

export interface SelectProps {
  label?: string;
  name: string;
  required?: boolean;
  error?: string | undefined;
  onChange: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  control?: Control<any>;
  options: OptionType[];
  allowCreate?: boolean;
  defaultValue?: OptionType[] | undefined;
}

export interface ButtonProps {
  children: ReactNodeType;
  onClick?: () => void;
  isDisabled?: boolean;
}

export interface FormProps {
  children: ReactNodeType;
  onSubmit: FormEventHandler;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface AdditionalOptions {
  [key: string]: any[];
}

export interface OptionType {
  value: string | number;
  label: string;
  additionalOptions?: AdditionalOptions;
  __isNew__?: boolean;
}

export interface DynamicObjectWithArrayOfNumbersOrStrings {
  [key: string]: string[] | number[];
}

export interface ListingFormData {
  brand?: any;
  model: string;
  title: string;
  description?: any;
  category: string;
  country?: string | undefined;
  state: string;
  currency: string;
  price: string;
  images?: File[];
  options?: AdditionalOptions;
}

export enum Currency {
  EUR = "EUR",
  eur = "eur",
  USD = "usd",
  RSD = "rsd",
}

export interface AddToFavoritesProps {
  listingId: number;
  likedByUser: boolean;
  updateFavorites: (isLiked: boolean) => void;
}

export interface ConversationFormData {
  conversationMessage?: any;
}

export interface ConversationProps {
  data: ConversationMessage[];
  alreadyRated: boolean;
}

export interface ConversationMessage {
  content: string;
  created_at?: string;
  id?: number;
  listing_id: number;
  recipient_id: number;
  sender_id?: number;
  updated_at?: string;
}

export interface Conversation extends ConversationMessage {
  listing: Listing;
  recipient: User;
  sender: User;
}

export interface AdminUserListFormData {
  statuses: string;
}

export interface ListingImageProps {
  id: number;
  path: string;
  listing_id: number;
  created_at: string;
  updated_at: string;
}

export interface LightGalleryProps {
  index: number;
  el: {
    children: Array<{
      click: () => void;
    }>;
  };
}
export interface ListingBrand {
  id: string;
  name: string;
}

export interface CountryFlags {
  [countryCode: string]: string;
}

export interface ListingCountry {
  id: string;
  name: string;
  alpha2: string;
}

export interface ListingCategory {
  id: string;
  name: string;
  options: {
    [key: string]: string[] | number[];
  };
}

export interface Rating {
  agreement: number;
  buyer: User;
  buyer_id: number;
  comment: null | string;
  communication: number;
  created_at: string;
  description: number;
  id: number;
  is_positive: number;
  listing_id: number;
  seller: User;
  seller_id: number;
  updated_at: string;
  listing: Listing;
  userId: number;
  payment?: number;
  rater_id: number;
}

export interface Creator extends User {
  email_verified_at: string;
  negativeRatings: number;
  positiveRatings: number;
  ratings: Rating[];
  status: "active" | "inactive";
}

export interface Like {
  created_at: string;
  id: number;
  listing_id: number;
  updated_at: string;
  user_id: number;
}

export interface Listing {
  id: number;
  user_id: number;
  title: string;
  description: string;
  state?: null | string;
  price: number;
  model: string;
  currency: string;
  created_at: string;
  images: ListingImageProps[];
  country?: null | ListingCountry;
  category?: null | ListingCategory;
  brand?: null | ListingBrand;
  likedByUser: boolean;
  updateFavorites: (isLiked: boolean) => void;
  likes: Like[];
  creator: Creator;
}

export interface ConversationRates {
  [key: string]: number;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export enum IsLikedType {
  Liked = "1",
  Unliked = "0",
}

export enum GradesType {
  Da = "0",
  "Moze bolje" = "1",
  Ne = "2",
}

export enum UserStatuses {
  Seller = "seller",
  Buyer = "buyer",
}

export interface ListingRatingsFormData {
  is_positive: string;
  description: string;
  communication: string;
  agreement: string;
  comment?: string | null;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  password: string;
  repeatPassword: string;
}

export interface UserProfileFormData {
  name: string;
  email: string;
  country: string;
  city: string;
  address?: string;
  telephone: string;
  preferredCurrency: string;
}

export interface NewListingFormProps {
  brands: OptionType[];
  categories: OptionType[];
  countries: OptionType[];
}

export interface ListingRatingsFormProps {
  listingId: number;
}

export enum FormFieldName {
  Email = "email",
  Password = "password",
  CurrentPassword = "currentPassword",
  RepeatPassword = "repeatPassword",
  Name = "name",
  Address = "address",
  Telephone = "telephone",
  HeaderSearch = "header-search",
  UserProfileCountry = "country",
  UserProfileCity = "city",
  UserPreferredCurency = "preferredCurrency",
  NewListingBrand = "brand",
  NewListingModel = "model",
  NewListingTitle = "title",
  NewListingOptions = "options",
  NewListingCategory = "category",
  NewListingCountry = "country",
  NewListingState = "state",
  NewListingCurrency = "currency",
  NewListingPrice = "price",
  NewListingDescription = "description",
  NewListingDescriptionCheckbox = "description-checkbox",
  NewListingImages = "images",
  UserStatuses = "statuses",
  ConversationMessage = "conversationMessage",
  isPositive = "is_positive",
  ListingRatingsDescription = "description",
  ListingRatingsCommunication = "communication",
  ListingRatingsAgreement = "agreement",
  ListingRatingsComment = "comment",
}

export enum FormInputType {
  Email = "email",
  Password = "password",
  Text = "text",
  File = "file",
  Checkbox = "checkbox",
  Radio = "radio",
  Number = "number",
}

export interface CategoryOptionsProps {
  selectedCategory: OptionType;
  updateOptions: (
    isChecked: boolean,
    value: number | string,
    key: string
  ) => void;
}

export interface FileUploaderProps {
  onChange: (files: any[]) => void;
  name: string;
  required: boolean;
  error: string | undefined;
  value: any;
}

export interface Toast {
  message: string;
  type: "error" | "success";
}

export enum ToastType {
  Success = "success",
  Error = "error",
}

export interface ToastProps {
  message: string;
  type: ToastType;
}

export interface LabelProps {
  label: string;
  name: string;
  required?: boolean;
}

export interface User {
  name: string;
  email: string;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface GradingFormDataProps {
  id: FormFieldName;
  label: string;
  alternativeLabel?: string;
  fields: {
    id: FormFieldName;
    type: FormInputType;
    value: GradesType;
    register: "description" | "communication" | "agreement";
    label: string;
  }[];
}

export interface Tab {
  is_positive: number;
  type: string;
  total: number;
  id: string;
}

export interface UserRatingTabsProps {
  onTabClick: (is_positive: number, type: string, id: string) => void;
  tabs: {
    [key: string]: Tab[];
  };
  activeTab: string;
}

export enum SortOptionsTypes {
  PriceAsc = "price-asc",
  PriceDesc = "price-desc",
  YearAsc = "year-asc",
  YearDesc = "year-desc",
}

export const SortOptionsLabels: { [key in SortOptionsTypes]: string } = {
  [SortOptionsTypes.PriceAsc]: "Price (Low to High)",
  [SortOptionsTypes.PriceDesc]: "Price (High to Low)",
  [SortOptionsTypes.YearAsc]: "Year (Old to New)",
  [SortOptionsTypes.YearDesc]: "Year (New to Old)",
};

export enum QueryParams {
  Sort = "sort",
  Search = "search",
}
