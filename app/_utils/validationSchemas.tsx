import * as Yup from "yup";
import { isEnteredText } from ".";
import { FORM_ERRORS } from "../_constants";

const MAX_FILE_SIZE = 5242880; // 5MB
const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const numberRegex = /^(-?\d+(\.\d+)?|)$/;

const sharedValidationSchema = {
  email: Yup.string()
    .required(FORM_ERRORS.REQUIRED)
    .email(FORM_ERRORS.EMAIL_ERROR),
  password: Yup.string().required(FORM_ERRORS.REQUIRED),
};

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required(FORM_ERRORS.REQUIRED),
  ...sharedValidationSchema,
});

export const loginValidationSchema = Yup.object().shape({
  ...sharedValidationSchema,
});

export const userProfileValidationSchema = Yup.object().shape({
  name: Yup.string().required(FORM_ERRORS.REQUIRED),
  email: Yup.string()
    .required(FORM_ERRORS.REQUIRED)
    .email(FORM_ERRORS.EMAIL_ERROR),
  country: Yup.string().required(FORM_ERRORS.REQUIRED),
  city: Yup.string().required(FORM_ERRORS.REQUIRED),
  // address: Yup.string().required(FORM_ERRORS.REQUIRED),
  telephone: Yup.string()
    .required(FORM_ERRORS.REQUIRED)
    .matches(phoneRegExp, FORM_ERRORS.PHONE_ERROR),
  preferredCurrency: Yup.string().required(FORM_ERRORS.REQUIRED),
});

export const newPasswordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required(FORM_ERRORS.REQUIRED),
  password: Yup.string().required(FORM_ERRORS.REQUIRED),
  repeatPassword: Yup.string()
    .required(FORM_ERRORS.REQUIRED)
    .oneOf([Yup.ref("password")], "Lozinke se ne podudaraju"),
});

export const newConversationMessageValidationSchema = Yup.object().shape({
  conversationMessage: Yup.mixed().test(
    "conversation-message",
    FORM_ERRORS.REQUIRED,
    (value) => {
      return isEnteredText(value as string);
    }
  ),
});

export const listingRatingsValidationSchema = Yup.object().shape({
  is_positive: Yup.string()
    .required(FORM_ERRORS.REQUIRED)
    .oneOf(["0", "1"], "Invalid value for isLiked"), // Check if isLiked is "0" or "1"
  description: Yup.string().required(FORM_ERRORS.REQUIRED),
  communication: Yup.string()
    .required(FORM_ERRORS.REQUIRED)
    .oneOf(["0", "1", "2"], "Invalid value for isLiked"),
  agreement: Yup.string()
    .required(FORM_ERRORS.REQUIRED)
    .oneOf(["0", "1", "2"], "Invalid value for isLiked"),
});

export const newAdvertisementValidationSchema = Yup.object().shape({
  brand: Yup.mixed().test("should first", FORM_ERRORS.REQUIRED, (val) => !!val),
  model: Yup.string().required(FORM_ERRORS.REQUIRED),
  category: Yup.string().required(FORM_ERRORS.OPTION_IS_REQUIRED),
  title: Yup.string().required(FORM_ERRORS.REQUIRED),
  state: Yup.string().required(FORM_ERRORS.REQUIRED),
  description: Yup.mixed().test(
    "listing-description",
    FORM_ERRORS.REQUIRED,
    (value) => {
      return !!value && value !== "<p></p>";
    }
  ),
  currency: Yup.string().required(FORM_ERRORS.OPTION_IS_REQUIRED),
  price: Yup.string().required(FORM_ERRORS.REQUIRED),
  images: Yup.mixed<File[]>()
    .test(
      "file",
      FORM_ERRORS.NO_FILES_ERROR,
      (FileList: File[] | undefined) => {
        return FileList && FileList?.length > 0;
      }
    )
    .test(
      "fileSize",
      FORM_ERRORS.FILE_SIZE_ERROR,
      (value: File[] | undefined) => {
        if (value && value?.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (value[i].size > MAX_FILE_SIZE) {
              return false;
            }
          }
        }
        return true;
      }
    )
    .test(
      "fileFormat",
      FORM_ERRORS.FILE_FORMAT,
      (value: File[] | undefined) => {
        if (value && value?.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (
              value[i].type === "image/jpeg" ||
              value[i].type === "image/png" ||
              value[i].type === "image/webp"
            ) {
              return true;
            }
            return false;
          }
        }
        return true;
      }
    ),
});
