import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "lib/LoginSchema";
import InputField from "@/components/common/InputField/InputField";
import styles from "./signin.module.css";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <InputField
          id="email"
          type="email"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          error={errors.email?.message}
          {...register("email")}
        />

        <InputField
          id="password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          error={errors.password?.message}
          {...register("password")}
        />

        <button type="submit" disabled={isSubmitting} className={styles.button}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default SignIn;
