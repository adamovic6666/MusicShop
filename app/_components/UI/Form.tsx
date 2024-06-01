"use client";
import { FormProps } from "@/app/_types/Index";

const Form = ({ children, onSubmit }: FormProps) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default Form;
