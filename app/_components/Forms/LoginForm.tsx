"use client";

// Components
import Link from "next/link";
import Button from "../UI/Button";
import Form from "../UI/Form";
import Input from "../UI/Input";

// Third party libraries
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

// Other
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
  LoginFormData,
  ToastType,
} from "@/app/_types/Index";
import { signInHandler, withQuery } from "@/app/_utils";
import { loginValidationSchema } from "@/app/_utils/validationSchemas";
import httpClient from "../../../httpClient";
import { createToast } from "../UI/Toast";

const LoginForm = () => {
  const { handleSubmit, formState, register } = useForm<LoginFormData>({
    resolver: yupResolver(loginValidationSchema),
  });
  const { push, refresh } = useRouter();
  const { get, toString: redirectQuery } = useSearchParams();
  const redirectToConversationId = get(QUERY.REDIRECT_CONVERSATION_ID);

  const onSubmit = async (formData: LoginFormData) => {
    httpClient
      .post(API_ENDPOINTS.LOGIN, formData)
      .then(async ({ data }) => {
        signInHandler(data);
        !redirectToConversationId
          ? push(PAGES.HOME_PAGE.PATH)
          : push(
              `${PAGES.USER_MESSAGES.PATH}${withQuery(
                QUERY.CONVERSATION_ID,
                redirectToConversationId
              )}`
            );

        createToast({
          message: data?.message ?? FORM_MESSAGE.LOGIN_SUCCESS,
          type: ToastType.Success,
        });
      })
      .catch(({ response }) => {
        createToast({
          message: response?.data?.message ?? FORM_MESSAGE.LOGIN_ERROR,
          type: ToastType.Error,
        });
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register(FormFieldName.Email)}
        label={FORM_FIELDS.EMAIL.LABEL}
        error={formState.errors[FormFieldName.Email]?.message}
      />
      <Input
        type={FormInputType.Password}
        {...register(FormFieldName.Password)}
        label={FORM_FIELDS.PASSWORD.LABEL}
        error={formState.errors[FormFieldName.Password]?.message}
      />
      <Button>{ACTION.LOGIN}</Button>
      <div className="form-text-bottom">
        <span>{TEXT.NO_ACCOUNT_YET}</span>
        <Link
          onClick={() => refresh()}
          href={
            redirectToConversationId
              ? `${PAGES.REGISTER.PATH}?${redirectQuery()}`
              : PAGES.REGISTER.PATH
          }
        >
          {ACTION.REGISTER}
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
