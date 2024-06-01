import { FORM_FIELDS, TEXT } from "../_constants";
import {
  FormFieldName,
  FormInputType,
  GradesType,
  GradingFormDataProps,
} from "../_types/Index";

export const gradingFormData: GradingFormDataProps[] = [
  {
    id: FormFieldName.ListingRatingsDescription,
    label: TEXT.LISTING_DESCRIPTION_IS_CORRECT,
    alternativeLabel: TEXT.LISTING_PAYMENT_WAS_CORRECT,
    fields: [
      {
        id: FormFieldName.ListingRatingsDescription,
        type: FormInputType.Radio,
        value: GradesType.Da,
        register: "description",
        label: FORM_FIELDS.SATISFIES.LABEL,
      },
      {
        id: FormFieldName.ListingRatingsDescription,
        type: FormInputType.Radio,
        value: GradesType["Moze bolje"],
        register: "description",
        label: FORM_FIELDS.COULD_BE_BETTER.LABEL,
      },
      {
        id: FormFieldName.ListingRatingsDescription,
        type: FormInputType.Radio,
        value: GradesType.Ne,
        register: "description",
        label: FORM_FIELDS.UNSATISFIES.LABEL,
      },
    ],
  },
  {
    id: FormFieldName.ListingRatingsCommunication,
    label: TEXT.LISTING_COMMUNICATION_WAS_CORRECT,
    fields: [
      {
        id: FormFieldName.ListingRatingsCommunication,
        type: FormInputType.Radio,
        value: GradesType.Da,
        register: "communication",
        label: FORM_FIELDS.SATISFIES.LABEL,
      },
      {
        id: FormFieldName.ListingRatingsCommunication,
        type: FormInputType.Radio,
        value: GradesType["Moze bolje"],
        register: "communication",
        label: FORM_FIELDS.COULD_BE_BETTER.LABEL,
      },
      {
        id: FormFieldName.ListingRatingsCommunication,
        type: FormInputType.Radio,

        value: GradesType.Ne,
        register: "communication",
        label: FORM_FIELDS.UNSATISFIES.LABEL,
      },
    ],
  },
  {
    id: FormFieldName.ListingRatingsAgreement,
    label: TEXT.LISTING_DEAL_WAS_RESPECTED,
    fields: [
      {
        id: FormFieldName.ListingRatingsAgreement,
        type: FormInputType.Radio,
        value: GradesType.Da,
        label: FORM_FIELDS.SATISFIES.LABEL,
        register: "agreement",
      },
      {
        id: FormFieldName.ListingRatingsAgreement,
        type: FormInputType.Radio,
        value: GradesType["Moze bolje"],
        register: "agreement",
        label: FORM_FIELDS.COULD_BE_BETTER.LABEL,
      },
      {
        id: FormFieldName.ListingRatingsAgreement,
        type: FormInputType.Radio,
        value: GradesType.Ne,
        register: "agreement",
        label: FORM_FIELDS.UNSATISFIES.LABEL,
      },
    ],
  },
];
