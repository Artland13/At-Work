import { CSSProperties, useState } from "react";
import styles from "./FormField.module.scss";
import cross from "@img/cross.svg";
import { UserFormData } from "../../../types";
import { UseFormRegister, FieldError, UseFormTrigger } from "react-hook-form";

interface FormFieldProps {
  label: string;
  name: keyof UserFormData;
  register: UseFormRegister<UserFormData>;
  error?: FieldError;
  type: "text" | "email" | "tel" | "password" | "number" | "textarea";
  placeholder: string;
  style?: CSSProperties;
  value: string;
  onClear: () => void;
  trigger: UseFormTrigger<UserFormData>;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  style,
  value = "",
  onClear,
  trigger,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    if (onClear) {
      onClear();
    }

    if (trigger) {
      trigger(name);
    }
  };

  const { ref, onChange, ...registerRest } = register(name);
  const showClearButton = isFocused && value && value.length > 0;

  return (
    <div className={styles.formGroup} style={style}>
      <label htmlFor={name} className={styles.title}>
        {label}
      </label>
      <div className={styles.inputContainer}>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          ref={ref}
          {...registerRest}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            onChange(e);
            if (trigger) {
              trigger(name);
            }
          }}
          className={`${styles.input} ${error ? styles.error : ""}`}
        />
        {showClearButton && (
          <button
            type="button"
            className={styles.crossButton}
            onClick={handleClear}
            onMouseDown={(e) => e.preventDefault()}
          >
            <img src={cross} alt="cross" />
          </button>
        )}
      </div>
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
};
