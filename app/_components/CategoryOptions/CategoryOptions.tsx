"use client";

import {
  CategoryOptionsProps,
  FormInputType,
  ReactEventType,
} from "@/app/_types/Index";
import Input from "../UI/Input";

const CategoryOptions = ({
  selectedCategory,
  updateOptions,
}: CategoryOptionsProps) => {
  return (
    <>
      {selectedCategory?.additionalOptions &&
        Object.entries(selectedCategory?.additionalOptions).map(
          ([key, option]) => {
            return (
              <div key={key} className="additional-options-wrapper">
                <span>{key}</span>
                <div>
                  {Object.entries(option).map(
                    ([optionKey, { value, isChecked }], i) => {
                      return (
                        <div key={i}>
                          <Input
                            type={FormInputType.Checkbox}
                            key={i}
                            name={`${optionKey}-${value}`}
                            onChange={(ev: ReactEventType) =>
                              updateOptions(ev.target.checked, value, key)
                            }
                            label={value}
                            checked={isChecked}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          }
        )}
    </>
  );
};

export default CategoryOptions;
