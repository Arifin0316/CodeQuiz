// app/admin/quiz/add/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { CreateQuiz } from '@/lib/data'
import AddQuizForm from '@/components/quiz/AddQuizForm'
import { revalidatePath } from 'next/cache'

export default async function AddQuizPage() {
  const session = await auth()
  
  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreateQuiz = async (quizData: any) => {
    'use server'
    const newQuiz = await CreateQuiz(quizData)
    revalidatePath('/dashboard/quiz')
    return newQuiz
  }

  return (
    <div className="container mx-auto py-8">
      <AddQuizForm createQuiz={handleCreateQuiz} />
    </div>
  )
}