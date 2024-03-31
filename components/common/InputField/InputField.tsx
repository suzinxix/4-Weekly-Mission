import React, { useState, InputHTMLAttributes, forwardRef } from "react";
import styles from "./inputField.module.css";
import EyeOff from "@/images/ic_eye-off.svg";
import EyeOn from "@/images/ic_eye-on.svg";

type Props = {
  id: "email" | "password" | "passwordConfirm";
  type: "text" | "email" | "password";
  label: "이메일" | "비밀번호" | "비밀번호 확인";
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, Props>(
  ({ id, type, label, error, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={styles.section}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>

        <div className={styles.wrapper}>
          <input
            id={id}
            type={showPassword ? "text" : "password"}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            className={styles.input}
            style={{ ...(error && { border: "1px solid var(--red-color)" }) }}
            {...rest}
          />

          {type === "password" ? (
            <button
              type="button"
              aria-label={showPassword ? "비밀번호 보임" : "비밀번호 안보임"}
              className={styles.toggle}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? <EyeOn /> : <EyeOff />}
            </button>
          ) : (
            ""
          )}
        </div>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }
);

export default InputField;
