import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./signup.module.css";
import { RegisterSchema } from "lib/RegisterSchema";
import InputField from "@/components/InputField/InputField";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
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

        <InputField
          id="passwordConfirm"
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요."
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <button type="submit" disabled={isSubmitting} className={styles.button}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
