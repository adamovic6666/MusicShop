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
import { ACTION, FORM_FIELDS } from "@/app/_constants";
import {
  ChangePasswordFormData,
  FormFieldName,
  FormInputType,
} from "@/app/_types/Index";
import { newPasswordValidationSchema } from "@/app/_utils/validationSchemas";

const ChangePasswordForm = () => {
  const { handleSubmit, formState, register } = useForm<ChangePasswordFormData>(
    {
      resolver: yupResolver(newPasswordValidationSchema),
    }
  );
  const { push } = useRouter();

  const onSubmit = async (formData: ChangePasswordFormData) => {
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type={FormInputType.Password}
        {...register(FormFieldName.CurrentPassword)}
        label={FORM_FIELDS.CURRENT_PASSWORD.LABEL}
        error={formState.errors[FormFieldName.CurrentPassword]?.message}
        required
      />
      <Input
        type={FormInputType.Password}
        {...register(FormFieldName.Password)}
        label={FORM_FIELDS.NEW_PASSWORD.LABEL}
        error={formState.errors[FormFieldName.Password]?.message}
        required
      />
      <Input
        type={FormInputType.Password}
        {...register(FormFieldName.RepeatPassword)}
        label={FORM_FIELDS.REPEAT_PASSWORD.LABEL}
        error={formState.errors[FormFieldName.RepeatPassword]?.message}
        required
      />
      <Button>{ACTION.SAVE}</Button>
    </Form>
  );
};

export default ChangePasswordForm;
