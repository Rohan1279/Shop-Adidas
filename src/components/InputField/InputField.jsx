import React from "react";

const InputField = ({
  fieldName,
  inputName,
  type,
  maxLength,
  minLength,
  min,
  placeholder,
  required,
  register,
  error,
  formErrors,
  classes,
  pattern,
  aria_invalid,
  defaultValue,
}) => {
  return (
    <div
      className={`flex items-center rounded-md border border-gray-300 bg-gray-300/60 pl-2 ${
        error && "border-gray-300/50"
      }`}
    >
      {/* <FaVoicemail className=""></FaVoicemail> */}
      {fieldName && (
        <span
          className={`mr-3 min-w-max ${
            !error &&
            " text-center text-xs font-medium uppercase tracking-wider text-gray-500 "
          }`}
        >
          {fieldName}{" "}
        </span>
      )}
      <input
        defaultValue={defaultValue}
        type={type}
        maxLength={maxLength}
        minLength={minLength}
        min={min}
        placeholder={placeholder}
        {...register(`${inputName}`, {
          required: required,
          minLength: `${minLength}`,
          // pattern: `${pattern ?? null}`,
          pattern: {
            value: pattern ?? null,
            message: "invalid pattern",
          },
          min: `${min}`,
        })}
        aria-invalid={aria_invalid}
        className="w-full rounded-r-md border-l border-l-gray-300 bg-secondary-color p-3 text-center  text-sm focus:shadow-nm-inset focus:outline-none disabled:placeholder:text-gray-300 "
        disabled={error}
      />
    </div>
  );
};

export default InputField;
