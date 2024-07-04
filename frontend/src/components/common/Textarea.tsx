import { TextareaHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: FieldError | undefined;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <label className="flex flex-col w-full">
        {label}
        <textarea
          {...rest}
          ref={ref}
          className={`textarea resize-none textarea-bordered ${
            error && "border-error"
          }`}
        />
        {error && (
          <span className="text-xs text-error font-bold">{error.message}</span>
        )}
      </label>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
