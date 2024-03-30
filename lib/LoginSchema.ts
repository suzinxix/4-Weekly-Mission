import { z } from "zod";

export type LoginSchema = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해 주세요." })
    .email({ message: "올바른 이메일 주소가 아닙니다." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});
