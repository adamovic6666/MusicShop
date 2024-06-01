// Other
import { TEXT } from "@/app/_constants";
import { LabelProps } from "@/app/_types/Index";

const Label = ({ name, required, label }: LabelProps) => {
  return (
    <label htmlFor={name}>
      {label} {required && <span>({TEXT.REQUIRED_FIELD})</span>}
    </label>
  );
};

export default Label;
