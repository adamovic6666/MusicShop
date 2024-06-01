"use client";
import {
  ACTION,
  API_ENDPOINTS,
  FORM_FIELDS,
  FORM_MESSAGE,
} from "@/app/_constants";
import {
  FormFieldName,
  FormInputType,
  GradingFormDataProps,
  IsLikedType,
  Listing,
  ListingRatingsFormData,
  ListingRatingsFormProps,
  ToastType,
  User,
} from "@/app/_types/Index";
import { listingRatingsValidationSchema } from "@/app/_utils/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// import useSWR from "swr";
import { gradingFormData } from "@/app/_utils/formData";
// import { useRouter } from "next/router";
import { modifiedGradingData } from "@/app/_utils";
import httpClient from "@/httpClient";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import Button from "../UI/Button";
import CkEditor from "../UI/CkEditor/CkEditor";
import Form from "../UI/Form";
import Input from "../UI/Input";
import { createToast } from "../UI/Toast";

const UserRatingsForm = ({ listingId }: ListingRatingsFormProps) => {
  const params = useSearchParams();
  const userIdFromParams = params.get("user_id");
  // listing data
  const { data: listingData } = useSWR(API_ENDPOINTS.SINGLE_LISTING(listingId));
  const { data: listing }: { data: Listing } = listingData ?? {};
  // user(buyer data)
  const { data: buyerData } = useSWR(
    userIdFromParams ? API_ENDPOINTS.GET_USER(userIdFromParams) : null
  );
  const { data: buyer }: { data: User } = buyerData || {};

  const { data: session } = useSession();
  const { refresh, back } = useRouter();

  const { handleSubmit, formState, register, control } =
    useForm<ListingRatingsFormData>({
      resolver: yupResolver(listingRatingsValidationSchema),
      defaultValues: {
        comment: null,
      },
    });

  const onSubmit = async (formData: ListingRatingsFormData) => {
    const modifiedData = modifiedGradingData(
      formData,
      session?.user.id!,
      listing,
      userIdFromParams,
      buyer
    );

    httpClient
      .post(API_ENDPOINTS.RATINGS, modifiedData)
      .then(({ data }) => {
        createToast({
          message: data?.message ?? FORM_MESSAGE.LOGIN_SUCCESS,
          type: ToastType.Success,
        });
        back();
      })
      .catch(({ response }) => {
        createToast({
          message: response.data?.message ?? FORM_MESSAGE.LOGIN_SUCCESS,
          type: ToastType.Error,
        });
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <p>{listing?.title}</p>
      <p>{!userIdFromParams ? listing?.creator.name : buyer?.name}</p>
      <div className="form-flex">
        <Input
          id={FORM_FIELDS.LISTING_GRADER_IS_LIKED.LABEL}
          type={FormInputType.Radio}
          {...register(FormFieldName.isPositive)}
          label={FORM_FIELDS.LISTING_GRADER_IS_LIKED.LABEL}
          value={IsLikedType.Liked}
        />
        <Input
          id={FORM_FIELDS.LISTING_GRADER_IS_DISLIKED.LABEL}
          type={FormInputType.Radio}
          {...register(FormFieldName.isPositive)}
          label={FORM_FIELDS.LISTING_GRADER_IS_DISLIKED.LABEL}
          value={IsLikedType.Unliked}
        />
      </div>

      {gradingFormData.map((data: GradingFormDataProps) => {
        return (
          <div className="form-flex" key={data.id}>
            <span>
              {userIdFromParams &&
              FormFieldName.ListingRatingsDescription === data?.id
                ? data?.alternativeLabel
                : data?.label}
            </span>
            {data?.fields?.map(({ value, register: reg, id, label }) => {
              return (
                <Input
                  key={value}
                  id={id + value}
                  type={FormInputType.Radio}
                  {...register(reg)}
                  label={label}
                  value={value}
                />
              );
            })}
          </div>
        );
      })}

      <CkEditor
        {...register(FormFieldName.ListingRatingsComment)}
        control={control}
      />
      <Button onClick={() => refresh()} isDisabled={!formState.isValid}>
        {ACTION.GIVE_GRADE}
      </Button>
      <Button onClick={() => back()}>{ACTION.CANCEL}</Button>
    </Form>
  );
};

export default UserRatingsForm;
