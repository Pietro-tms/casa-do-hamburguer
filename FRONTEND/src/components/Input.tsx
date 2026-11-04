import React from "react";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  return (
    <input
      {...props}
      className="w-[350px] rounded-md bg-surface px-2 py-2 text-sm placeholder-content outline-none"
    />
  );
};

export default Input;
