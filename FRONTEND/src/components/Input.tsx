import React from "react";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  return (
    <input
      {...props}
      className="color-[#32343E] w-[350px] rounded-md bg-white px-2 py-2 text-sm placeholder-[#32343E] outline-none"
    />
  );
};

export default Input;
