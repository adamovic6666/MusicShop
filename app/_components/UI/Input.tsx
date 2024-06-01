"use client";
import { TEXT } from "@/app/_constants";
import { FormInputType, InputProps } from "@/app/_types/Index";
import { Ref, forwardRef } from "react";

const Input = (
  {
    name,
    type = FormInputType.Text,
    error,
    onChange,
    onBlur,
    label,
    required,
    value,
    disabled,
    checked,
    id,
  }: InputProps,
  ref: Ref<HTMLInputElement>
) => {
  const preventNegativeValues = (e: React.KeyboardEvent<HTMLInputElement>) =>
    ["-"].includes(e.key) && e.preventDefault();

  return (
    <div
      className={
        type === FormInputType.Checkbox || type === FormInputType.Radio
          ? "checkboxes-wrapper"
          : ""
      }
    >
      <label htmlFor={id ? id : name}>
        {label} {required && <span>({TEXT.REQUIRED_FIELD})</span>}
      </label>
      <input
        disabled={disabled}
        name={name}
        value={value}
        checked={checked}
        id={id ? id : name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        type={type}
        onKeyDown={(e) => FormInputType.Number && preventNegativeValues(e)}
        min={FormInputType.Number && "0"}
        multiple={type === FormInputType.File}
        style={{
          border:
            error && type !== FormInputType.File
              ? "1px solid rgb(255, 86, 86)"
              : "",
        }}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default forwardRef(Input);
