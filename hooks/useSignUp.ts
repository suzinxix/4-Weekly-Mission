import { useMutation } from "@tanstack/react-query";
import instance from "lib/axios";

import { API_ENDPOINTS } from "constants/endPoint";
import { User } from "types";

const useSignUp = () => {
  const checkEmailMutation = useMutation({
    mutationFn: (email: string) => {
      return instance.post(API_ENDPOINTS.CHECK_EMAIL, { email });
    },
    onError: (error) => {
      throw error;
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (data: User) => {
      return instance.post(API_ENDPOINTS.SIGN_UP, data);
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
