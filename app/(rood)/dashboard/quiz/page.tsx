// app/admin/quiz/page.tsx
import { GetQuizzes, UpdateQuiz, DeleteQuiz } from '@/lib/data'
import QuizManagementClient from '@/components/quiz/QuizManagementClient'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function QuizManagementPage() {
  const session = await auth()
  
  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  const quizzes = await GetQuizzes()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateQuiz = async (quizId: string, quizData: any) => {
    'use server'
    const updatedQuiz = await UpdateQuiz(quizId, quizData)
    revalidatePath('/admin/quiz')
    return updatedQuiz
  }

  const handleDeleteQuiz = async (quizId: string) => {
    'use server'
    const deletedQuiz = await DeleteQuiz(quizId)
    revalidatePath('/admin/quiz')
    return deletedQuiz
  }

  return (
    <QuizManagementClient 
      initialQuizzes={quizzes || []} 
      updateQuiz={handleUpdateQuiz}
      deleteQuiz={handleDeleteQuiz}
    />
  )
}