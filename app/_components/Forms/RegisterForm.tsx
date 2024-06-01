"use client";

// Third-party libraries
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

// Components
import Link from "next/link";
import Button from "../UI/Button";
import Form from "../UI/Form";
import Input from "../UI/Input";

// Others
import {
  ACTION,
  API_ENDPOINTS,
  FORM_FIELDS,
  FORM_MESSAGE,
  PAGES,
  QUERY,
  TEXT,
} from "@/app/_constants";
import {
  FormFieldName,
  FormInputType,
  RegisterFormData,
  ToastType,
} from "@/app/_types/Index";
import { signInHandler, withQuery } from "@/app/_utils";
import { registerValidationSchema } from "@/app/_utils/validationSchemas";
import httpClient from "../../../httpClient";
import { createToast } from "../UI/Toast";

const RegisterForm = () => {
  const { handleSubmit, formState, register } = useForm<RegisterFormData>({
    resolver: yupResolver(registerValidationSchema),
  });
  const { push } = useRouter();
  const { get, toString: redirectQuery } = useSearchParams();
  const redirectToConversationId = get(QUERY.REDIRECT_CONVERSATION_ID);

  const onSubmit = async (formData: RegisterFormData) => {
    httpClient
      .post(API_ENDPOINTS.REGISTER, formData)
      .then(async ({ data }) => {
        signInHandler(data);
        push(PAGES.HOME_PAGE.PATH);
        !redirectToConversationId
          ? push(PAGES.HOME_PAGE.PATH)
          : push(
              `${PAGES.USER_MESSAGES.PATH}${withQuery(
                QUERY.CONVERSATION_ID,
                redirectToConversationId
              )}`
            );

        createToast({
          message: data.message ?? FORM_MESSAGE.REGISTER_SUCCESS,
          type: ToastType.Success,
        });
      })
      .catch(({ response }) => {
        createToast({
          message: response.data.message ?? FORM_MESSAGE.REGISTER_ERROR,
          type: ToastType.Error,
        });
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register(FormFieldName.Name)}
        label={FORM_FIELDS.FIRST_NAME.LABEL}
        error={formState.errors[FormFieldName.Name]?.message}
      />
      <Input
        type={FormInputType.Password}
        {...register(FormFieldName.Password)}
        label={FORM_FIELDS.PASSWORD.LABEL}
        error={formState.errors[FormFieldName.Password]?.message}
      />
      <Input
        {...register(FormFieldName.Email)}
        label={FORM_FIELDS.EMAIL.LABEL}
        error={formState.errors[FormFieldName.Email]?.message}
      />
      <Button>{ACTION.REGISTER}</Button>
      <div className="form-text-bottom">
        <span>{TEXT.ALREADY_REGISTERED}</span>
        <Link
          href={
            redirectToConversationId
              ? `${PAGES.LOGIN.PATH}?${redirectQuery()}`
              : PAGES.LOGIN.PATH
          }
        >
          {ACTION.LOGIN}
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;
