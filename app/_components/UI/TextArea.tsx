"use client";
import { TEXT } from "@/app/_constants";
import { TextAreaProps } from "@/app/_types/Index";
import { Ref, forwardRef } from "react";

const Input = (
  { name, error, onChange, onBlur, label, required }: TextAreaProps,
  ref: Ref<HTMLTextAreaElement>
) => {
  return (
    <div>
      <label htmlFor={name}>
        {label} {required && <span>({TEXT.REQUIRED_FIELD})</span>}
      </label>
      <textarea
        name={name}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default forwardRef(Input);
