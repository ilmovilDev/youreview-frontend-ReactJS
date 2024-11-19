import React from "react";

type CustomButtonProps = {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  ariaLabel: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  loading = false,
  disabled = false,
  children,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md w-full md:w-auto whitespace-nowrap focus:outline-none focus:ring-2 ${
        loading
          ? "bg-sky-700 text-white cursor-wait"
          : "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500"
      }`}
      aria-label={ariaLabel}
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default CustomButton;
