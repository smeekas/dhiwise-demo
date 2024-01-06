import React from "react";

type ButtonProps = {
  onClick: () => void;
  children: string | React.ReactNode;
};
function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-sm rounded-lg text-sm px-1 py-1 me-2 mb-2 m-1 dark:bg-gray-800"
    >
      {children}
    </button>
  );
}

export default Button;
