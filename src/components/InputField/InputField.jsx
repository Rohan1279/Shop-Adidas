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
}) => {
  return (
    <div
      className={`flex items-center border border-gray-300 rounded-md pl-2 bg-gray-300/60 ${
        error && "border-gray-300/50"
      }`}
    >
      {/* <FaVoicemail className=""></FaVoicemail> */}
      {fieldName && <span className="mr-3 min-w-max">{fieldName} </span>}
      <input
        type={type}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        {...register(`${inputName}`, {
          required: required,
          minLength: `${minLength}`,
          pattern: `${pattern ?? null}`,
          min: `${min}`,
        })}
        aria-invalid={aria_invalid}
        className="focus:outline-none w-full bg-secondary-color p-3 border-l border-l-gray-300 text-sm  focus:shadow-nm-inset rounded-md text-center disabled:placeholder:text-gray-300"
        disabled={error}
      />
    </div>
  );
};

export default InputField;
