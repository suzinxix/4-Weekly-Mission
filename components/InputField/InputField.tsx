import React, {
  InputHTMLAttributes,
  forwardRef,
} from "react";
import styles from "./inputField.module.css";

type Props = {
  id: "email" | "password" | "passwordConfirm";
  type: "text" | "email" | "password";
  label: "이메일" | "비밀번호" | "비밀번호 확인"
  placeholder?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, Props>(({ id, type, label, placeholder, error, ...rest }, ref) => {
  return (
    <div className={styles.section}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <input
        id={id}
        type={type}
        ref={ref}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        className={styles.input}
        style={{ ...(error && { border: "1px solid var(--red-color)" }) }}
        {...rest}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
});

export default InputField;
