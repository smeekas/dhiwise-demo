import React from "react";

type InputProps = {
  onChange: (value: string) => void;
  label: string;
};
function Input({ label, onChange }: InputProps) {
  return (
    <section className="my-2">
      <label
        htmlFor={label}
        className="block mb-0 text-xs font-medium text-gray-900 dark:text-white"
      >
        {label}:
      </label>
      <input
        type="text"
        id={label}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-0.5"
      />
    </section>
  );
}

export default Input;
