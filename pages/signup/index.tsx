import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./signup.module.css";

type AuthForm = {
  email: string;
  password: string;
  passwordConfirm: string;
};

function SignUp() {
  // formState: 양식이 현재 어떤 상태인지를 담고 있는 객체
  //  isSubmitting: 속성을 읽어서 양식이 현재 제출 중인 상태인지 아닌지
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthForm>({ mode: "onBlur" }); //onBlur 이벤트가 발생할때마다 validation이 실행된다.

  const onSubmit: SubmitHandler<AuthForm> = async (data) => {
    // validation
    if (data.password !== data.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }
    // async request which may result error
    try {
      // await fetch()
    } catch (e) {
      // handle your error
    }

    console.log(data);
  };

  return (
    <div className={styles.container}>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.section}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>

          <input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            className={styles.input}
            aria-invalid={errors.email ? "true" : "false"}
            style={errors.email && { border: "1px solid var(--red-color)" }}
            {...register("email", {
              required: "이메일을 입력해 주세요.",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/i,
                message: "올바른 이메일 주소가 아닙니다.",
              },
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.section}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className={styles.input}
            aria-invalid={errors.password ? "true" : "false"}
            style={errors.password && { border: "1px solid var(--red-color)" }}
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              pattern: {
                value: /(?=.*\d)(?=.*[a-z]).{8,}/,
                message: "영문, 숫자를 조합해 8자 이상 입력해 주세요.",
              },
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <div className={styles.section}>
          <label htmlFor="email" className={styles.label}>
            비밀번호 확인
          </label>

          <input
            id="passwordConfirm"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className={styles.input}
            aria-invalid={errors.passwordConfirm ? "true" : "false"}
            style={
              errors.passwordConfirm && { border: "1px solid var(--red-color)" }
            }
            {...register("passwordConfirm", {
              required: "비밀번호를 입력해주세요.",
            })}
          />
          {errors.passwordConfirm && (
            <p className={styles.error}>{errors.passwordConfirm.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className={styles.button}>
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignUp;
