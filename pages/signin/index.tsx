import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./signin.module.css";

type Login = {
  email: string;
  password: string;
};

function SignIn() {
  // formState: 양식이 현재 어떤 상태인지를 담고 있는 객체
  //  isSubmitting: 속성을 읽어서 양식이 현재 제출 중인 상태인지 아닌지
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Login>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<Login> = (data) => console.log(data);

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
            {...register("password", { required: "비밀번호를 입력해주세요." })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className={styles.button}>
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignIn;
