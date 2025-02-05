import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({
  label,
  showPassword,
  handleOnChange,
  value,
  setShowPassword,
  placeValue,
  nameValue,
}) => {
  return (
    <label className="relative">
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
        {label} <sup className="text-pink-200">*</sup>
      </p>
      <input
        required
        value={value}
        onChange={handleOnChange}
        placeholder={placeValue}
        name={nameValue}
        type={showPassword ? "text" : "password"}
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
      />
      <span
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
      >
        {showPassword ? (
          <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
        ) : (
          <AiOutlineEye fontSize={24} fill="#AFB2BF" />
        )}
      </span>
    </label>
  );
};

export default PasswordInput;
