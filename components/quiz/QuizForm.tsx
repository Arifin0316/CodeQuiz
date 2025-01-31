// components/quiz/QuizForm.tsx
import React, { useState } from 'react'
import { Quiz } from './QuizTable'

interface QuizFormProps {
  quiz?: Quiz
  onSubmit: (quizData: Quiz) => void
  onCancel: () => void
}

export const QuizForm: React.FC<QuizFormProps> = ({ 
  quiz, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<Quiz>({
    title: quiz?.title || '',
    description: quiz?.description || '',
    category: quiz?.category || '',
    difficulty: quiz?.difficulty || 'easy',
    timeLimit: quiz?.timeLimit || 1800, // 30 minutes default
    isActive: quiz?.isActive ?? true
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number'
        ? parseInt(value)
        : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      id: quiz?.id,
      createdAt: quiz?.createdAt || new Date()
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {quiz ? 'Edit Quiz' : 'Add New Quiz'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div>
            <label className="block mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Time Limit (minutes)</label>
            <input
              type="number"
              name="timeLimit"
              value={Math.floor(formData.timeLimit / 60)}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  timeLimit: parseInt(e.target.value) * 60
                }))
              }}
              min="1"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Active Quiz</label>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {quiz ? 'Update Quiz' : 'Add Quiz'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}