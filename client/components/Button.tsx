import React from "react";

type Props = {
  label: string;
  textColor?: string;
  width?: string;
  height?: string;
  bgColor?: string;
};

const Button = ({ textColor, width, height, bgColor, label }: Props) => {
  return (
    <button
      className={`${textColor ? textColor : "text-white"} ${
        width ? width : "w-[150px]"
      } ${
        height ? height : "h-[35px]"
      } rounded-lg border-b-2 border-green-800 ${
        bgColor ? bgColor : "bg-green-500"
      } font-bold`}
    >
      {label}
    </button>
  );
};

export default Button;
