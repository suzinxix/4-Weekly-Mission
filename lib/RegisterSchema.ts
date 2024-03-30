import { z } from "zod";

export type RegisterSchema = z.infer<typeof RegisterSchema>;

export const RegisterSchema = z.object({
    email: z.string().min(1, { message: "이메일을 입력해 주세요." }).email({ message: "올바른 이메일 주소가 아닙니다." }),
    password: z.string().min(1, { message: "비밀번호를 입력해주세요." }).regex(/(?=.*\d)(?=.*[a-z]).{8,}/, "영문, 숫자를 조합해 8자 이상 입력해 주세요."),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"], // path of error
  });
