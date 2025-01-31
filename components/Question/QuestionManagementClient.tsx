// components/question/QuestionManagementClient.tsx
"use client"

import React, { useState } from 'react'
import { QuestionTable, Question } from './QuestionTable'
import { QuestionForm } from './QuestionForm'

interface QuestionManagementClientProps {
  initialQuestions: Question[]
  updateQuestion: (questionId: string, questionData: Question) => Promise<void>
  deleteQuestion: (questionId: string) => Promise<void>
}

export default function QuestionManagementClient({ initialQuestions, updateQuestion, deleteQuestion }: QuestionManagementClientProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | undefined>(undefined)

  const handleEdit = (question: Question) => {
    setSelectedQuestion(question)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      await deleteQuestion(id)
      setQuestions(questions.filter(q => q.id !== id))
    }
  }

  const handleSave = async (data: Question) => {
    await updateQuestion(data.id, data)
    setQuestions(questions.map(q => (q.id === data.id ? data : q)))
    setIsFormOpen(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Questions</h1>

      <button onClick={() => setIsFormOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded">
        Add Question
      </button>

      <QuestionTable questions={questions} onEdit={handleEdit} onDelete={handleDelete} />

      {isFormOpen && (
        <QuestionForm initialData={selectedQuestion} onSubmit={handleSave} onCancel={() => setIsFormOpen(false)} />
      )}
    </div>
  )
}
