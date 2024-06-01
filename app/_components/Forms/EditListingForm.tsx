"use client";

import {
  ACTION,
  API_ENDPOINTS,
  FORM_FIELDS,
  PAGES,
  currencies,
  state,
} from "@/app/_constants";
import {
  FormFieldName,
  FormInputType,
  Listing,
  ListingFormData,
  OptionType,
  ToastType,
} from "@/app/_types/Index";
import {
  formatedListingFormData,
  getBrandName,
  getSelectedOptions,
  onUncheckHandler,
  selectCategoryHandler,
} from "@/app/_utils";
import { newAdvertisementValidationSchema } from "@/app/_utils/validationSchemas";
import { getNewListingDescription } from "@/app/services";
import httpClient from "@/httpClient";
import { yupResolver } from "@hookform/resolvers/yup";
import { isNumber } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CategoryOptions from "../CategoryOptions/CategoryOptions";
import Button from "../UI/Button";
import CkEditor from "../UI/CkEditor/CkEditor";
import CreatableSelect from "../UI/CreatableSelect";
import FileUploader from "../UI/FileUploader";
import Form from "../UI/Form";
import Input from "../UI/Input";
import Select from "../UI/Select";
import { createToast } from "../UI/Toast";

const EditListingForm = ({
  listing,
  brands,
  categories,
  countries,
}: {
  listing: Listing;
  brands: OptionType[];
  categories: OptionType[];
  countries: OptionType[];
}) => {
  const { push, refresh } = useRouter();
  const [initialCategories, _] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [isGeneratedListingDescription, setIsGeneratedListingDescription] =
    useState(false);
  const {
    handleSubmit,
    formState,
    register,
    control,
    watch,
    setValue,
    clearErrors,
    reset,
  } = useForm<ListingFormData>({
    resolver: yupResolver(newAdvertisementValidationSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (listing) {
      const getPageFiles = async () => {
        const files = [];
        for (const image of listing.images || []) {
          const response = await fetch(
            `/api/get-photos?imageUrl=${
              process.env.NEXT_PUBLIC_API_URL + image.path
            }`
          );
          const blob = await response.blob();
          const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
          files.push(file);
        }
        setValue(FormFieldName.NewListingImages, files);
      };

      getPageFiles();
      reset({
        brand: listing.brand?.id,
        model: listing?.model,
        category: listing.category?.id,
        title: listing?.title,
        state: listing.state!,
        description: listing?.description,
        price: (listing?.price / 100).toString(),
        currency: listing?.currency,
        country: listing?.country?.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const watchedBrandId = watch(FormFieldName.NewListingBrand);
  const watchedModel = watch(FormFieldName.NewListingModel);
  const watchedCategoryId = watch(FormFieldName.NewListingCategory);

  useEffect(() => {
    if (!watchedCategoryId && !isNumber(watchedCategoryId)) return;
    const selectedCategory = initialCategories.find(
      (category: OptionType) => category.value === watchedCategoryId
    );
    const uncheckedCategories =
      selectedCategory && onUncheckHandler(selectedCategory);
    setSelectedCategory(uncheckedCategories);
  }, [watchedCategoryId, initialCategories]);

  const generateNewListingDescription = async (
    brandId: string | number,
    model: string
  ) => {
    let brendId = isNumber(brandId) ? getBrandName(brands, brandId) : brandId;
    if (isGeneratedListingDescription || !brendId) return;
    setIsGeneratedListingDescription(true);
    const { description } = await getNewListingDescription(brendId, model);
    setValue(FormFieldName.NewListingDescription, `<p>${description}</p>`);
    clearErrors(FormFieldName.NewListingDescription);
  };

  const updateOptions = (
    isChecked: boolean,
    optionValue: string | number,
    key: string
  ) => {
    const category = selectCategoryHandler(
      selectedCategory,
      isChecked,
      optionValue,
      key
    );
    setSelectedCategory(category);
    const selectedOptions = getSelectedOptions(category);
    setValue(FormFieldName.NewListingOptions, selectedOptions);
  };

  const onSubmit = async (listingFormData: ListingFormData) => {
    const formData = formatedListingFormData(listingFormData, brands);
    httpClient
      .post(API_ENDPOINTS.EDIT_LISTING(listing.id), formData)
      .then(async ({ data }) => {
        createToast({
          message: data.message,
          type: ToastType.Success,
        });
        push(PAGES.HOME_PAGE.PATH);
      })
      .catch(({ message }) => {
        createToast({
          message: message,
          type: ToastType.Error,
        });
      });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <CreatableSelect
        options={brands}
        control={control}
        required
        isClearable
        {...register(FormFieldName.NewListingBrand)}
        label={FORM_FIELDS.NEW_ADVERTISEMENT_BRAND.LABEL}
        error={formState.errors[
          FormFieldName.NewListingBrand
        ]?.message?.toString()}
        defaultValue={brands.filter(
          (brand: OptionType) => brand.label === listing.brand?.name
        )}
      />
      <Input
        required
        {...register(FormFieldName.NewListingModel)}
        label={FORM_FIELDS.NEW_ADVERTISEMENT_MODEL.LABEL}
        error={formState.errors[FormFieldName.NewListingModel]?.message}
      />
      <Select
        options={categories}
        control={control}
        required
        {...register(FormFieldName.NewListingCategory)}
        label={FORM_FIELDS.NEW_ADVERTISEMENT_CATEGORY.LABEL}
        error={formState.errors[FormFieldName.NewListingCategory]?.message}
        defaultValue={categories.filter(
          (category: OptionType) => category.label === listing.category?.name
        )}
      />

      {watchedCategoryId && isNumber(watchedCategoryId) && (
        <CategoryOptions
          selectedCategory={selectedCategory}
          updateOptions={updateOptions}
        />
      )}
      <div className="flex">
        <Input
          required
          {...register(FormFieldName.NewListingTitle)}
          label={FORM_FIELDS.NEW_ADVERTISEMENT_TITLE.LABEL}
          error={formState.errors[FormFieldName.NewListingTitle]?.message}
        />

        <Select
          options={state}
          control={control}
          required
          {...register(FormFieldName.NewListingState)}
          label={FORM_FIELDS.NEW_ADVERTISEMENT_STATE.LABEL}
          error={formState.errors[FormFieldName.NewListingState]?.message}
          defaultValue={state.filter((state) => state.value === listing?.state)}
        />
      </div>

      <CkEditor
        label={FORM_FIELDS.NEW_ADVERTISEMENT_DESCRIPTION.LABEL}
        {...register(FormFieldName.NewListingDescription)}
        error={formState.errors[
          FormFieldName.NewListingDescription
        ]?.message?.toString()}
        required
        control={control}
        isGeneratedListingDescription={isGeneratedListingDescription}
        onResetDescriptionGeneration={() =>
          setIsGeneratedListingDescription(false)
        }
      />

      <div className="flex-reverse">
        <Input
          type={FormInputType.Checkbox}
          checked={isGeneratedListingDescription}
          name={FormFieldName.NewListingDescriptionCheckbox}
          onChange={() =>
            generateNewListingDescription(watchedBrandId, watchedModel)
          }
          label={FORM_FIELDS.NEW_ADVERTISEMENT_DESCRIPTION_GENERATOR.LABEL}
          disabled={
            !watchedBrandId || !watchedModel || !isNumber(watchedBrandId)
          }
        />
      </div>
      <div className="flex">
        <Input
          type={FormInputType.Number}
          required
          {...register(FormFieldName.NewListingPrice)}
          label={FORM_FIELDS.NEW_ADVERTISEMENT_PRICE.LABEL}
          error={formState.errors[FormFieldName.NewListingPrice]?.message}
        />
        <Select
          options={currencies}
          control={control}
          required
          {...register(FormFieldName.NewListingCurrency)}
          label={FORM_FIELDS.NEW_ADVERTISEMENT_CURRENCY.LABEL}
          error={formState.errors[FormFieldName.NewListingCurrency]?.message}
          defaultValue={currencies.filter(
            (currency: OptionType) => currency.label === listing.currency
          )}
        />
        <Select
          options={countries}
          control={control}
          {...register(FormFieldName.NewListingCountry)}
          label={FORM_FIELDS.NEW_ADVERTISEMENT_COUNTRY.LABEL}
          defaultValue={countries.filter(
            (country: OptionType) => country.label === listing.country?.name
          )}
        />
      </div>
      <Controller
        name={FormFieldName.NewListingImages}
        control={control}
        render={({ field }) => {
          return (
            <FileUploader
              {...field}
              error={formState.errors[FormFieldName.NewListingImages]?.message}
              required
            />
          );
        }}
      />

      <Button isDisabled={!formState.isValid} onClick={() => refresh()}>
        {ACTION.SAVE}
      </Button>
    </Form>
  );
};

export default EditListingForm;
