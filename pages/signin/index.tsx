
import { useRouter } from 'next/router'
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, Login } from "lib/zod/schema/LoginSchema";
import InputField from "@/components/common/InputField/InputField";
import SocialAuth from "@/components/auth/SocialAuth/SocialAuth";
import Navigation from "@/components/auth/Navigation/Navigation";
import instance from "lib/axios";
import useLocalStorage from "hooks/useLocalStorage";
import styles from "./signin.module.css";
import Logo from "@/images/logo.svg";

const SignIn = () => {
  const router = useRouter();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Login>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });

  const postData = async (email: string, password: string) => {
    try {
      const response = await instance.post("/sign-in", { email, password });
      const result = response.data;
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error();
      }
    }
  };

  const onSubmit: SubmitHandler<Login> = async (data) => {
    const { email, password } = data;
    postData(email, password)
      .then((res) => {
        useLocalStorage('token', res.data.accessToken);
        router.push('/folder')
      })
      .catch(() => {
        setError("email", {
          type: "400",
          message: "이메일을 확인해 주세요.",
        });
        setError("password", {
          type: "400",
          message: "비밀번호를 확인해 주세요.",
        });
      });
  };

  return (
    <div className={styles.container}>
      <Logo width="210" height="38" />

      <Navigation
        question="회원이 아니신가요?"
        navigation="회원 가입하기"
        link="/signup"
      />

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <InputField
          id="email"
          type="email"
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

        <button type="submit" disabled={isSubmitting} className={styles.button}>
          로그인
        </button>
      </form>
      <SocialAuth>소셜 로그인</SocialAuth>
    </div>
  );
};

export default SignIn;
