import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Nama harus lebih dari 1 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string()
    .min(8, "Password harus lebih dari 8 karakter")
    .max(30, "Password harus kurang dari 20 karakter"),
  confirmPassword: z.string()
    .min(8, "Password harus lebih dari 8 karakter")
    .max(30, "Password harus kurang dari 20 karakter"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export const SignInSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string()
    .min(8, "Password harus lebih dari 8 karakter")
    .max(30, "Password harus kurang dari 20 karakter"),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["user", "admin", "moderator"]),
  isActive: z.boolean()
});


export const UpdateQuizSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  category: z.string().min(2, "Category must be at least 2 characters"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  timeLimit: z.number().min(60, "Time limit must be at least 1 minute"),
  isActive: z.boolean()
});

export const QuestionSchema = z.object({
  quizId: z.string().min(1, "Quiz ID is required"),
  question: z.string().min(5, "Question must be at least 5 characters long"),
  options: z.array(
    z.object({
      text: z.string().min(1, "Option text is required"),
      isCorrect: z.boolean(),
    })
  ).min(2, "At least two options are required"),
  explanation: z.string().min(5, "Explanation must be at least 5 characters long"),
  score: z.number().min(1, "Score must be at least 1"),
  isActive: z.boolean().optional().default(true),
});