import React from "react";
import { IconType } from "react-icons";

interface FormInputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder: string;
  icon?: IconType;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
  rows?: number;
  className?: string;
}

const FormInput = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
  disabled = false,
  autoComplete,
  maxLength,
  rows,
  className = "",
}: FormInputProps) => {
  const baseInputClass =
    "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm";
  const inputClass = `${baseInputClass} ${className}`;

  const InputComponent = type === "textarea" ? "textarea" : "input";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && "*"}
      </label>
      <div className="mt-1 relative">
        <InputComponent
          id={id}
          name={name}
          type={type === "textarea" ? undefined : type}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={onChange}
          className={inputClass}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
        />
        {Icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
