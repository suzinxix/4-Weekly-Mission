import { useMutation } from "@tanstack/react-query";

import instance from "lib/axios";

interface User {
  email: string;
  password: string;
}

const useSignUp = () => {
  const checkEmailMutation = useMutation({
    mutationFn: (email: string) => {
      return instance.post("/users/check-email", { email });
    },
    onError: (error) => {
      throw error;
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (data: User) => {
      return instance.post("/auth/sign-up", data);
    },
    onSuccess: (data) => {
      // 페이지 이동
    },
    onError: (error) => {
      throw error;
    },
  });

  const signUp = async (email: string, password: string) => {
    try {
      await checkEmailMutation.mutateAsync(email);
      await signUpMutation.mutateAsync({ email, password });
    } catch (error) {
      throw error;
    }
  };

  return {
    signUp,
    isPending: checkEmailMutation.isPending || signUpMutation.isPending,
  };
};

export default useSignUp;
