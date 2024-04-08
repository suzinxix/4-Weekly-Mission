import { useRouter } from "next/router";
import instance from "lib/axios";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./signup.module.css";
import { Register, registerSchema } from "lib/zod/schema/RegisterSchema";
import InputField from "@/components/common/InputField/InputField";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Register>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const postData = async (email: string, password: string) => {
    try {
      const response = await instance.post("/sign-up", { email, password });
      const result = response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error();
      }
    }
  };

  const onSubmit: SubmitHandler<Register> = async (data) => {
    const { email, password } = data;
    postData(email, password)
      .then(() => {
        router.push("/folder");
        console.log("성공");
      })
      .catch(() => {
        setError("email", {
          type: "400",
          message: "이미 사용 중인 이메일입니다.",
        });
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <InputField
          id="email"
          type="text"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          errorMessage={errors.email?.message}
          {...register("email")}
        />

        <InputField
          id="password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          errorMessage={errors.password?.message}
          {...register("password")}
        />

        <InputField
          id="passwordConfirm"
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요."
          errorMessage={errors.confirmPassword?.message}
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
