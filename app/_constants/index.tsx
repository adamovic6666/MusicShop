import { OptionType } from "../_types/Index";
import { getFormatedDate, getRelativeTime } from "../_utils";

export const FORM_FIELDS = {
  EMAIL: { LABEL: "Email adresa" },
  PASSWORD: { LABEL: "Lozinka" },
  CURRENT_PASSWORD: { LABEL: "Trenutna lozinka" },
  NEW_PASSWORD: { LABEL: "Nova lozinka" },
  REPEAT_PASSWORD: { LABEL: "Ponovi lozinku" },
  FIRST_NAME: { LABEL: "Korisnicko ime" },
  ADDRESS: { LABEL: "Adresa" },
  TELEPHONE: { LABEL: "Telefon" },
  USER_PROFILE_COUNTRY: { LABEL: "Drzava" },
  USER_PROFILE_CITY: { LABEL: "Grad" },
  USER_PREFERRED_CURRENCY: { LABEL: "Odaberi valutu" },
  NEW_ADVERTISEMENT_BRAND: { LABEL: "Brend" },
  NEW_ADVERTISEMENT_MODEL: { LABEL: "Model" },
  NEW_ADVERTISEMENT_TITLE: { LABEL: "Naslov" },
  NEW_ADVERTISEMENT_DESCRIPTION: { LABEL: "Opis oglasa" },
  NEW_ADVERTISEMENT_DESCRIPTION_GENERATOR: { LABEL: "Generisi opis oglasa" },
  NEW_ADVERTISEMENT_STATE: { LABEL: "Stanje proizvoda" },
  NEW_ADVERTISEMENT_CATEGORY: { LABEL: "Kategorija" },
  NEW_ADVERTISEMENT_COUNTRY: { LABEL: "Drzava" },
  NEW_ADVERTISEMENT_CURRENCY: { LABEL: "Valuta" },
  NEW_ADVERTISEMENT_PRICE: { LABEL: "Cena" },
  NEW_ADVERTISEMENT_ATTACHMENTS: { LABEL: "Fotografije oglasa" },
  NEW_CONVERSATION_MESSAGE: { LABEL: "Nova poruka" },
  LISTING_GRADER_IS_LIKED: { LABEL: "Like" },
  LISTING_GRADER_IS_DISLIKED: { LABEL: "Dislike" },
  LISTING_GRADER_DESCRIPTION_IS_CORRECT: { LABEL: "Opis je tacan?" },
  SATISFIES: { LABEL: "Da" },
  UNSATISFIES: { LABEL: "Ne" },
  COULD_BE_BETTER: { LABEL: "Moze bolje" },
};

export const ACTION = {
  SAVE: "Sacuvaj",
  REGISTER: "Registruj se",
  LOGIN: "Ulogujte se",
  LOGOUT: "Izlogujte se",
  SUBMIT_NEW_LISTING: "Postavi novi oglas",
  SEND_MESSAGE: "Posalji poruku",
  CONTACT_SELLER: "Kontaktiraj prodavca",
  GIVE_GRADE: "Oceni korisnika",
  CANCEL: "Otkazi",
};

export const TEXT = {
  ALREADY_REGISTERED: "Već ste registrovani?",
  NO_ACCOUNT_YET: "Nemate nalog na Music app-u?",
  NO_LISTINGS: "Nema dostupnih oglasa",
  REQUIRED_FIELD: "Obavezno polje",
  CREATED_AT: "Kreirano",
  CHANGE_PASSWORD: "Izmeni lozinku",
  LOADING: "Ucitavanje...",
  LISTING_DESCRIPTION_IS_CORRECT: "Opis iz oglasa tacan?",
  LISTING_PAYMENT_WAS_CORRECT: "Placanje izvrseno kako je dogovoreno?",
  LISTING_COMMUNICATION_WAS_CORRECT: "Korektna komunikacija?",
  LISTING_DEAL_WAS_RESPECTED: "Postovanje dogovora?",
  LISTING_CREATOR_POSITIVE_RATINGS: `Pozitivnih ocena:`,
  LISTING_CREATOR_NEGATIVE_RATINGS: ` Negativnih ocena:`,
  LISTING_CREATOR_STATUS: (status: string) => `${status}`,
  LISTING_CREATOR_ACCOUNT_SINCE: (date: string) =>
    `Korisnik na Music app-u od: ${date}`,
  LISTING_CREATOR_NAME: (name: string) => `Korisnik: ${name}`,
  LISTING_PRICE: (price: string) => `Cena: ${price}`,
  LISTING_CREATED_AT: (created_at: string) =>
    `Oglas postavljen: ${getRelativeTime(created_at)}`,
  LISTING_MODEL: (model: string) => `Model: ${model}`,
  LISTING_DESCRIPTION: (description: string) => `Opis oglasa: ${description}`,
  LISTING_STATE: (state: string) => `Stanje proizvoda: ${state}`,
  LISTING_BRAND: (brandName: string) => `Brend: ${brandName}`,
  LISTING_COUNTRY: (countryName: string) => `Drzava: ${countryName}`,
  LISTING_ID: (id: number) => `ID Oglasa: #${id}`,
  LISTING_LIKES: (likes: number) => `Broj lajkova: ${likes}`,
  LISTING_HOLDER_ALL_LISTINGS: "Svi oglasi korisnika",
  LISTING_HOLDER_ACCOUNT_SINCE: (date: string) =>
    `Clan Music app-a od: ${getFormatedDate(date)}`,
  GIVE_GRADES_TO_USER: (user: string) => `Ocenite korisnika ${user}`,
  LISTING_EDIT: "Izmeni oglas",
};

export const FORM_MESSAGE = {
  REGISTER_SUCCESS: "Uspesno ste se registrovali",
  REGISTER_ERROR: "Nesto nije u redu",
  LOGIN_SUCCESS: "Dobrodosli nazad",
  LOGIN_ERROR: "Pogresni kredencijali",
};

export const FORM_ERRORS = {
  REQUIRED: "Polje ne može biti prazno",
  OPTION_IS_REQUIRED: "Molimo Vas da odaberete opciju",
  TOO_LONG_ERROR: (max: number) =>
    `Predugačko! Sadržaj mora imati manje od ${max} karaktera.`,
  TOO_SHORT_ERROR: (min: number) =>
    `Prekratko! Sadržaj mora imati vise od ${min} karaktera.`,
  WEAK_PASSWORD:
    "Vaša lozinka mora sadržati bar jedno veliko slovo i jedan broj",
  EMAIL_ERROR: "Neispravan E-mail format",
  NO_FILES_ERROR: "Molimo vas da unesete fotografije",
  FILE_SIZE_ERROR: "Fajlovi moraju biti manji od 5mb",
  FILE_FORMAT: "Fajlovi moraju biti tipe jpeg, png",
  PHONE_ERROR: "Format broj telefona nije validan",
};

export const PAGES = {
  LOGIN: { PATH: "/user/login", LABEL: "Ulogujte se" },
  NEW_LISTING: {
    PATH: "/my/new-listing",
    LABEL: "kreiraj oglas",
  },
  USER_SELLING_LISTINGS: {
    PATH: (id: number) => `/user/${id}/listings`,
    LABEL: "Moji oglasi",
  },
  USER_SELLING_ORDERS: {
    PATH: "/my/orders",
    LABEL: "sve porudzbine",
  },
  USER_ACCOUNT: {
    PATH: "/my/account",
    LABEL: "profil",
  },
  USER_CHANGE_PASSWORD: {
    PATH: "/user/change-password",
    LABEL: "izmeni lozinku",
  },
  USER_BYING_ORDERS: {
    PATH: "/my/selling/orders",
    LABEL: "prodaja",
  },
  USER_FAVORITES: {
    PATH: "/my/favorites",
    LABEL: "omiljeno",
  },
  MY_GRADES: {
    PATH: (id: number) => `/user/${id}/ratings`,
    LABEL: "moje ocene",
  },
  USER_MESSAGES: {
    PATH: "/my/messages",
    LABEL: "poruke",
  },
  USER_GRADES_AND_COMMENTS: {
    PATH: "/grades-and-comments",
    LABEL: "ocene i komentari",
  },
  REGISTER: { PATH: "/user/register", LABEL: "Registrujte se" },
  HOME_PAGE: { PATH: "/", LABEL: null },
  SINGLE_LISTING_PAGE: { PATH: (id: number) => `/${id}`, LABEL: null },
  LISTING_EDIT_PAGE: {
    PATH: (id: number) => `/my/listing/${id}/edit`,
    LABEL: null,
  },
  USER_RATINGS: { PATH: (id: number) => `/user/${id}/ratings`, LABEL: null },
};

export const API_ENDPOINTS = {
  REGISTER: "/api/register",
  LOGIN: "/api/login",
  LOGOUT: "/api/logout",
  LISTINGS: "/api/listings",
  EDIT_LISTING: (id: string | number) => `/api/listings/${id}/edit`,
  SINGLE_LISTING: (id: string | number) => `/api/listings/${id}`,
  CATEGORIES: "/api/categories",
  COUNTRIES: "/api/countries",
  BRANDS: "/api/brands",
  NEW_LISTING_GENERATED_DESCRIPTION: "/api/new-listing-description",
  CONVERSATION_MESSAGES_FOR_LISTING_ID: (
    id: string | number,
    conversation_pair: string
  ) => `/api/messages?listingId=${id}&users=${conversation_pair}`,
  CONVERSATIONS: "/api/conversations",
  MESSAGES: "/api/messages",
  FAVORITES: "/api/favorites",
  TEST: "/be750a82-7302-4159-be06-b6325ffaf453",
  RATINGS: "/api/ratings",
  GET_USER_RATINS: (id: string) => `/api/users/${id}/ratings?seller_id=${id}`,
  GET_USER: (id: string) => `/api/users/${id}`,
  GET_USER_LISTINGS: (id: number) => `/api/user/${id}/listings`,
  GET_USER_FAVORITES: (id: number) => `/api/user/${id}/favorites`,
  GET_EXCHANGE_RATES: () =>
    `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}/latest/RSD`,
};

export const SWR_KEYS = {
  CONVERSATION_USERS_PAIR: "conversationUsersPair",
};

export const QUERY = {
  REDIRECT_CONVERSATION_ID: "redirectToConversationId",
  CONVERSATION_ID: "conversationId",
  CONVERSATION_PAIR: "conversationPair",
};

export const currencies: OptionType[] = [
  { value: "rsd", label: "rsd" },
  { value: "eur", label: "eur" },
  { value: "usd", label: "usd" },
];

export const state: OptionType[] = [
  { value: "new", label: "Nekorisceno" },
  { value: "used", label: "Korisceno" },
];
