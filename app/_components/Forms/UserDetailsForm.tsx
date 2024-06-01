"use client";

// Components
import Button from "../UI/Button";
import Form from "../UI/Form";
import Input from "../UI/Input";

// Third party libraries
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// Other
import { ACTION, FORM_FIELDS, PAGES } from "@/app/_constants";
import {
  FormFieldName,
  OptionType,
  UserProfileFormData,
} from "@/app/_types/Index";
import { userProfileValidationSchema } from "@/app/_utils/validationSchemas";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Select from "../UI/Select";

const UserDeatilsForm = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(PAGES.LOGIN.PATH);
    },
  });

  const { handleSubmit, formState, reset, register, control } =
    useForm<UserProfileFormData>({
      resolver: yupResolver(userProfileValidationSchema),
    });
  const { push } = useRouter();

  useEffect(() => {
    if (session) {
      reset({ name: session.user.name, email: session.user.email });
    }
  }, [session, reset]);

  const onSubmit = async (formData: UserProfileFormData) => {
    // console.log(formData);
    // httpClient
    //   .post(API_ENDPOINTS.LOGIN, formData)
    //   .then(async ({ data }) => {
    //     signInHandler(data);
    //     push(PAGES.HOME_PAGE.PATH);
    //     createToast({
    //       message: data.message ?? FORM_MESSAGE.LOGIN_SUCCESS,
    //       type: ToastType.Success,
    //     });
    //   })
    //   .catch(({ response }) => {
    //     createToast({
    //       message: response.data.message ?? FORM_MESSAGE.LOGIN_ERROR,
    //       type: ToastType.Error,
    //     });
    //   });
  };

  const countries: OptionType[] = [
    { value: "srbija", label: "Srbija" },
    { value: "bosna", label: "Bosna" },
    { value: "australija", label: "Australija" },
  ];

  const cities: OptionType[] = [
    { value: "beograd", label: "Beograd" },
    { value: "novi sad", label: "Novi Sad" },
    { value: "subotica", label: "Subotica" },
  ];

  const currencies: OptionType[] = [
    { value: "rsd", label: "rsd" },
    { value: "eur", label: "eur" },
    { value: "usd", label: "usd" },
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register(FormFieldName.Name)}
        label={FORM_FIELDS.FIRST_NAME.LABEL}
        error={formState.errors[FormFieldName.Name]?.message}
      />
      <Input
        {...register(FormFieldName.Email)}
        label={FORM_FIELDS.EMAIL.LABEL}
        error={formState.errors[FormFieldName.Email]?.message}
        disabled
      />
      <Select
        options={countries}
        control={control}
        required
        {...register(FormFieldName.UserProfileCountry)}
        label={FORM_FIELDS.USER_PROFILE_COUNTRY.LABEL}
        error={formState.errors[FormFieldName.UserProfileCountry]?.message}
      />
      <Select
        options={cities}
        control={control}
        required
        {...register(FormFieldName.UserProfileCity)}
        label={FORM_FIELDS.USER_PROFILE_CITY.LABEL}
        error={formState.errors[FormFieldName.UserProfileCity]?.message}
        allowCreate
      />
      <Input
        {...register(FormFieldName.Address)}
        label={FORM_FIELDS.ADDRESS.LABEL}
        error={formState.errors[FormFieldName.Address]?.message}
      />
      <Input
        {...register(FormFieldName.Telephone)}
        label={FORM_FIELDS.TELEPHONE.LABEL}
        error={formState.errors[FormFieldName.Telephone]?.message}
        required
      />
      <Select
        options={currencies}
        control={control}
        required
        {...register(FormFieldName.UserPreferredCurency)}
        label={FORM_FIELDS.USER_PREFERRED_CURRENCY.LABEL}
        error={formState.errors[FormFieldName.UserPreferredCurency]?.message}
        allowCreate
      />

      <div className="form-text">
        <Link href={PAGES.USER_CHANGE_PASSWORD.PATH}>
          {PAGES.USER_CHANGE_PASSWORD.LABEL}
        </Link>
      </div>
      <Button>{ACTION.SAVE}</Button>
    </Form>
  );
};

export default UserDeatilsForm;
