// lib/data.ts
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

// Skema validasi untuk update user
const UpdateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["user", "admin", "moderator"]),
  isActive: z.boolean()
});

export const GetUsers = async () => {
  try {
    const session = await auth();
    if (session?.user.role !== "admin") {
      redirect("/");
    }
    
    const users = await prisma.user.findMany()
    return users
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UpdateUser = async (userId: string, userData: any) => {
  try {
    const session = await auth();
    if (session?.user.role !== "admin") {
      redirect("/");
    }

    // Validasi data input
    const validatedData = UpdateUserSchema.parse({
      name: userData.name,
      email: userData.email,
      role: userData.role,
      isActive: userData.isActive
    });

    // Cek apakah user exist
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        role: validatedData.role,
        isActive: validatedData.isActive
      }
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const DeleteUser = async (userId: string) => {
  try {
    const session = await auth();
    if (session?.user.role !== "admin") {
      redirect("/");
    }

    // Cek apakah user exist
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    // Cegah penghapusan akun admin terakhir
    const adminCount = await prisma.user.count({
      where: { role: "admin" }
    });

    if (existingUser.role === "admin" && adminCount <= 1) {
      throw new Error("Cannot delete the last admin user");
    }

    // Hapus user
    const deletedUser = await prisma.user.delete({
      where: { id: userId }
    });

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};