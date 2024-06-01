"use client";
import { TEXT } from "@/app/_constants";
import { CreatableSelectProps, OptionType } from "@/app/_types/Index";
import { Ref, forwardRef, useId } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select/creatable";

const CreatableSelect = (
  {
    options,
    name,
    required,
    label,
    error,
    control,
    isClearable,
    defaultValue,
  }: CreatableSelectProps,
  ref: Ref<HTMLTextAreaElement>
) => {
  const id = useId();

  return (
    <div>
      <label htmlFor={name}>
        {label} {required && <span>({TEXT.REQUIRED_FIELD})</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }: any) => {
          const { ref: fieldRef, ...rest } = field;
          const fieldValue = fieldRef.value;
          return (
            <Select
              {...rest}
              onChange={(element: OptionType) => {
                element
                  ? field.onChange(
                      element?.__isNew__ ? element.value : element.value
                    )
                  : field.onChange("");
              }}
              value={fieldValue}
              defaultValue={defaultValue}
              instanceId={id}
              ref={ref}
              options={options}
              isClearable={isClearable}
              formatCreateLabel={(val) => `Kreiraj novu kategoriju: ${val}`}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: error && "red",
                  height: 31,
                  minHeight: 25,
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  paddingTop: 0,
                  paddingBottom: 0,
                }),
                clearIndicator: (base) => ({
                  ...base,
                  paddingTop: 0,
                  paddingBottom: 0,
                }),
                valueContainer: (base) => ({
                  ...base,
                  marginTop: "-2px",
                }),
                option: (provided, { isSelected }) => ({
                  ...provided,
                  color: isSelected ? "black" : "gray",
                  background: isSelected ? "#f1f1f1" : "#fff",
                  cursor: "pointer",
                }),
              }}
            />
          );
        }}
      ></Controller>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default forwardRef(CreatableSelect);
