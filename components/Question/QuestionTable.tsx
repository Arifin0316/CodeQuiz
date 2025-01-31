// components/question/QuestionTable.tsx
import React from 'react'

export interface Question {
  id: string
  question: string
  explanation: string
  score: number
  isActive: boolean
  createdAt: Date
}

interface QuestionTableProps {
  questions: Question[]
  onEdit: (question: Question) => void
  onDelete: (id: string) => void
}

export const QuestionTable: React.FC<QuestionTableProps> = ({ questions, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Question</th>
          <th className="border p-2">Score</th>
          <th className="border p-2">Active</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question) => (
          <tr key={question.id} className="border">
            <td className="border p-2">{question.question}</td>
            <td className="border p-2 text-center">{question.score}</td>
            <td className="border p-2 text-center">{question.isActive ? '✅' : '❌'}</td>
            <td className="border p-2 space-x-2">
              <button onClick={() => onEdit(question)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
              <button onClick={() => onDelete(question.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
