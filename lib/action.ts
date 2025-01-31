"use server";
import { registerSchema, SignInSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const signUpCredensial = async (prevState: unknown, formData: FormData) => {
  const validationFild = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validationFild.success) {
    return {
      error: validationFild.error.flatten().fieldErrors,
    };
  }
  const { name, email, password } = validationFild.data;
  const heshedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: heshedPassword,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { message: "Pendaftaran gagal" };
  }

  redirect("/login");
};

// sign in credensial action
export const SignInCredensial = async(prevState: unknown, formData: FormData) => {
  const validationFild = SignInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validationFild.success) {
    return {
      error: validationFild.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validationFild.data;

  try {
    await signIn("credentials", {email, password, redirectTo: "/"})
  } catch (error) {
    if(error instanceof AuthError){
      switch (error.type){
        case "CredentialsSignin":
          return {message: "invalid credensial"}
        default:
          return {message: "maaf silakan cobak lagi"}
      }
    }
    throw error 
  }
}