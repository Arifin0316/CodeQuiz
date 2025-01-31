import { object, string } from "zod";

export const registerSchema = object({
  name: string().min(1, "Nama harus lebih dari 1 karakter"),
  email: string().email("Email tidak valid"),
  password: string()
    .min(8, "Password harus lebih dari 8 karakter")
    .max(30, "Password harus kurang dari 20 karakter"),
  confirmPassword: string()
    .min(8, "Password harus lebih dari 8 karakter")
    .max(30, "Password harus kurang dari 20 karakter"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export const SignInSchema = object({
  email: string().email("Email tidak valid"),
  password: string()
    .min(8, "Password harus lebih dari 8 karakter")
    .max(30, "Password harus kurang dari 20 karakter"),
});
