"use client";

// Components
import Button from "../UI/Button";
import Form from "../UI/Form";
import Input from "../UI/Input";

// Third party libraries
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

// Other
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
  ListingFormData,
  NewListingFormProps,
  OptionType,
  ToastType,
} from "@/app/_types/Index";
import { newAdvertisementValidationSchema } from "@/app/_utils/validationSchemas";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  formatedListingFormData,
  getBrandName,
  getSelectedOptions,
  onUncheckHandler,
  selectCategoryHandler,
} from "@/app/_utils";
import { getNewListingDescription } from "@/app/services";

import httpClient from "@/httpClient";
import { isNumber } from "@tiptap/react";
import CategoryOptions from "../CategoryOptions/CategoryOptions";
import CkEditor from "../UI/CkEditor/CkEditor";
import CreatableSelect from "../UI/CreatableSelect";
import FileUploader from "../UI/FileUploader";
import Select from "../UI/Select";
import { createToast } from "../UI/Toast";

const NewListingForm = ({
  brands,
  categories,
  countries,
}: NewListingFormProps) => {
  const [initialCategories, _] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [isGeneratedListingDescription, setIsGeneratedListingDescription] =
    useState(false);

  const DEFAULT_CURRENCY = "rsd";
  const DEFAULT_COUNTRY = "Serbia";

  const {
    handleSubmit,
    formState,
    register,
    control,
    watch,
    setValue,
    clearErrors,
  } = useForm<ListingFormData>({
    resolver: yupResolver(newAdvertisementValidationSchema),
    defaultValues: {
      options: {},
      currency: DEFAULT_CURRENCY,
    },
  });

  const { push, refresh } = useRouter();

  const watchedBrandId = watch(FormFieldName.NewListingBrand);
  const watchedModel = watch(FormFieldName.NewListingModel);
  const watchedCategoryId = watch(FormFieldName.NewListingCategory);
  const watchedImages = watch(FormFieldName.NewListingImages);
  console.log(watchedImages, "watchedImages");

  useEffect(() => {
    if (!watchedBrandId && isGeneratedListingDescription) {
      setValue(FormFieldName.NewListingDescription, "");
      setIsGeneratedListingDescription(false);
    }
  }, [watchedBrandId, isGeneratedListingDescription, setValue]);

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
      .post(API_ENDPOINTS.LISTINGS, formData)
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
            (currency: OptionType) => currency.label === DEFAULT_CURRENCY
          )}
        />
        <Select
          options={countries}
          control={control}
          {...register(FormFieldName.NewListingCountry)}
          label={FORM_FIELDS.NEW_ADVERTISEMENT_COUNTRY.LABEL}
          defaultValue={countries.filter(
            (country: OptionType) => country.label === DEFAULT_COUNTRY
          )}
        />
      </div>
      <Controller
        name={FormFieldName.NewListingImages}
        control={control}
        render={({ field }) => {
          // const { ref, ...rest } = field;
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
        {ACTION.SUBMIT_NEW_LISTING}
      </Button>
    </Form>
  );
};

export default NewListingForm;
