"use client";

import { ComponentPropsWithoutRef } from "react";
import { IconType } from "react-icons";

type ButtonProps = {
  label: string;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
} & ComponentPropsWithoutRef<"button">;

const Button = ({
  label,
  outline,
  small,
  icon: Icon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
      ${outline ? "bg-white" : "bg-theme-color"}
      ${outline ? "border-black" : "border-theme-color"}
      ${outline ? "text-black" : "text-white"}
      ${small ? "py-1" : "py-3"}
      ${small ? "text-sm" : "text-md"}
      ${small ? "font-light" : "font-semibold"}
      ${small ? "border-[1px]" : "border-2"}
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};
export default Button;
