import { InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  error?: FieldError | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, error, ...rest }, ref) => {
    return (
      <label className="flex flex-col flex-1">
        {label}
        <input
          type={type}
          {...rest}
          ref={ref}
          className={`input input-bordered ${error && "border-error"}`}
        />
        {error && (
          <span className="text-xs text-error font-bold">{error.message}</span>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
