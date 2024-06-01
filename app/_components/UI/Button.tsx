"use client";
import { ButtonProps } from "@/app/_types/Index";

const Button = ({ children, onClick, isDisabled }: ButtonProps) => {
  return (
    <button disabled={isDisabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
