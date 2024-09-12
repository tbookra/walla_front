import { PropsWithChildren } from "react";

interface Props {
  errorMessage: FieldError | undefined;
  label: string;
}

const CustomInputWrapper = ({
  children,
  label,
  errorMessage,
}: PropsWithChildren<Props>) => {
  return (
    <>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
      >
        {label}
      </label>
      {children}
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMessage.message}
        </p>
      )}
    </>
  );
};

export default CustomInputWrapper;
