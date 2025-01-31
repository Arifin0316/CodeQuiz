// components/quiz/QuizTable.tsx
import React from 'react'
import { Edit2, Trash2, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export interface Quiz {
  id?: string
  title: string
  description?: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit: number
  isActive: boolean
  createdAt?: Date
}

interface QuizTableProps {
  quizzes: Quiz[]
  onEdit: (quiz: Quiz) => void
  onDelete: (quizId: string) => void
  onView: (quiz: Quiz) => void
}

export const QuizTable: React.FC<QuizTableProps> = ({ 
  quizzes, 
  onEdit, 
  onDelete,
  onView 
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Difficulty</th>
            <th className="p-4 text-left">Time Limit</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map(quiz => (
            <tr key={quiz.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{quiz.title}</td>
              <td className="p-4">{quiz.category}</td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded text-xs uppercase
                  ${quiz.difficulty === 'hard' 
                    ? 'bg-red-100 text-red-800'
                    : quiz.difficulty === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                  }
                `}>
                  {quiz.difficulty}
                </span>
              </td>
              <td className="p-4">{Math.floor(quiz.timeLimit / 60)} minutes</td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded text-xs
                  ${quiz.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                  }
                `}>
                  {quiz.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="p-4">
                {quiz.createdAt ? formatDate(quiz.createdAt.toISOString()) : 'N/A'}
              </td>
              <td className="p-4 flex space-x-2">
                <button
                  onClick={() => onView(quiz)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onEdit(quiz)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => quiz.id && onDelete(quiz.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {quizzes.length === 0 && (
        <div className="text-center p-6 text-gray-500">
          No quizzes found
        </div>
      )}
    </div>
  )
}