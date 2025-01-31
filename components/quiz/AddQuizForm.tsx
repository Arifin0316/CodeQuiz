// components/quiz/AddQuizForm.tsx
"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface QuizFormData {
  title: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit: number
  isActive: boolean
}

interface AddQuizFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createQuiz: (data: QuizFormData) => Promise<any>
}

export default function AddQuizForm({ createQuiz }: AddQuizFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState<QuizFormData>({
    title: '',
    description: '',
    category: '',
    difficulty: 'easy',
    timeLimit: 1800, // 30 minutes default
    isActive: true
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await createQuiz(formData)
      toast.success('Quiz created successfully')
      router.push('/dashboard/quiz')
      router.refresh()
    } catch (error) {
      console.error('Error creating quiz:', error)
      toast.error('Failed to create quiz')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Create New Quiz</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Limit (minutes)
          </label>
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
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Active Quiz
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Quiz'}
          </button>
        </div>
      </form>
    </div>
  )
}