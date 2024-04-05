import { useState, InputHTMLAttributes, forwardRef } from "react";
import styles from "./inputField.module.css";
import EyeOff from "@/images/ic_eye-off.svg";
import EyeOn from "@/images/ic_eye-on.svg";

type Props = {
  id: string;
  type: "text" | "email" | "password";
  label: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, Props>(
  ({ id, type, label, errorMessage, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const varientType =
      type !== "password" ? "email" : showPassword ? "text" : "password";

    return (
      <div className={styles.section}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>

        <div className={styles.wrapper}>
          <input
            id={id}
            type={varientType}
            ref={ref}
            aria-invalid={errorMessage ? "true" : "false"}
            className={styles.input}
            style={{ ...(errorMessage && { border: "1px solid var(--red-color)" }) }}
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

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
    );
  }
);

export default InputField;
