import React from "react";

type SelectProps = {
  options: { label: string; value?: string }[];
  onChange: (value: string) => void;
  label: string;
  defaultValue?: string;
};
function Select({ onChange, options, label, defaultValue }: SelectProps) {
  return (
    <section className="my-2">
      <label
        htmlFor={label}
        className="block mb-0 text-xs font-medium text-gray-900 dark:text-white"
      >
        {label}:
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-0.5"
        id={label}
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue ? defaultValue : ""}
      >
        <option value="" disabled hidden>
          Choose Option
        </option>
        {React.Children.toArray(
          options.map((columnItem) => {
            return (
              <option value={columnItem.value ?? columnItem.label}>
                {columnItem.label}
              </option>
            );
          })
        )}
      </select>
    </section>
  );
}

export default Select;
