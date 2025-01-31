// lib/data.ts
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { UpdateUserSchema, UpdateQuizSchema } from "@/lib/zod";

// Skema validasi untuk update user

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


export const GetQuizzes = async () => {
  try {
    const session = await auth();
    if (session?.user.role !== "admin") {
      redirect("/");
    }
    
    const quizzes = await prisma.quiz.findMany({
      include: {
        _count: {
          select: {
            questions: true,
            quizResults: true
          }
        }
      }
    });
    
    return quizzes;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UpdateQuiz = async (quizId: string, quizData: any) => {
  try {
    const session = await auth();
    if (session?.user.role !== "admin") {
      redirect("/");
    }

    // Validate input data
    const validatedData = UpdateQuizSchema.parse({
      title: quizData.title,
      description: quizData.description,
      category: quizData.category,
      difficulty: quizData.difficulty,
      timeLimit: quizData.timeLimit,
      isActive: quizData.isActive
    });

    // Check if quiz exists
    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: quizId }
    });

    if (!existingQuiz) {
      throw new Error("Quiz not found");
    }

    // Update quiz
    const updatedQuiz = await prisma.quiz.update({
      where: { id: quizId },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        difficulty: validatedData.difficulty,
        timeLimit: validatedData.timeLimit,
        isActive: validatedData.isActive
      },
      include: {
        _count: {
          select: {
            questions: true,
            quizResults: true
          }
        }
      }
    });

    return updatedQuiz;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CreateQuiz = async (quizData: any) => {
  try {
    const session = await auth();
    if (session?.user.role !== "admin") {
      redirect("/");
    }

    // Validate input data
    const validatedData = UpdateQuizSchema.parse({
      title: quizData.title,
      description: quizData.description,
      category: quizData.category,
      difficulty: quizData.difficulty,
      timeLimit: quizData.timeLimit,
      isActive: quizData.isActive
    });

    // Create new quiz
    const newQuiz = await prisma.quiz.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        difficulty: validatedData.difficulty,
        timeLimit: validatedData.timeLimit,
        isActive: validatedData.isActive
      }
    });

    return newQuiz;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

export const DeleteQuiz = async (quizId: string) => {
  try {
    const session = await auth();
    if (session?.user.role !== "admin") {
      redirect("/");
    }

    // Check if quiz exists
    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        _count: {
          select: {
            quizResults: true
          }
        }
      }
    });

    if (!existingQuiz) {
      throw new Error("Quiz not found");
    }

    // Optional: Add check for quiz results
    if (existingQuiz._count.quizResults > 0) {
      throw new Error("Cannot delete quiz with existing results");
    }

    // Delete quiz and all related questions and options (cascade)
    const deletedQuiz = await prisma.quiz.delete({
      where: { id: quizId }
    });

    return deletedQuiz;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};

// Get single quiz with all related data
export const GetQuizWithQuestions = async (quizId: string) => {
  try {
    const session = await auth();
    if (session?.user.role !== "admin") {
      redirect("/");
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            options: true
          }
        },
        _count: {
          select: {
            quizResults: true
          }
        }
      }
    });

    if (!quiz) {
      throw new Error("Quiz not found");
    }

    return quiz;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
};

export const GetQuesion = async () => {
  try {
    const session = await auth();
    if (session?.user.role !== "admin") {
      redirect("/");
    }
    
    const quesion = await prisma.question.findMany({
      include: {
        _count: {
          select: {
            options: true
          }
        }
      }
    })
    
    return quesion;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};
