// app/admin/questions/page.tsx
import { GetQuesion, } from '@/lib/data'
import QuestionManagementClient from '@/components/Question/QuestionManagementClient'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function QuestionsPage() {
  const session = await auth()
  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  const questions = await GetQuesion()

  const handleUpdateQuestion = async () => {
    'use server'
    // await UpdateQuestion(id, data)
    revalidatePath('/admin/questions')
  }

  const handleDeleteQuestion = async () => {
    'use server'
    // await DeleteQuestion(id)
    revalidatePath('/admin/questions')
  }

  return (
    <QuestionManagementClient initialQuestions={questions || []} updateQuestion={handleUpdateQuestion} deleteQuestion={handleDeleteQuestion} />
  )
}
