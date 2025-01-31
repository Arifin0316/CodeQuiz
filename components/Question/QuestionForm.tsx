// components/question/QuestionForm.tsx
import React, { useState } from 'react'
import { Question } from './QuestionTable'

interface QuestionFormProps {
  initialData?: Question
  onSubmit: (data: Question) => void
  onCancel: () => void
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [question, setQuestion] = useState(initialData?.question || '')
  const [explanation, setExplanation] = useState(initialData?.explanation || '')
  const [score, setScore] = useState(initialData?.score || 0)
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ id: initialData?.id || '', question, explanation, score, isActive, createdAt: new Date() })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Question</label>
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Explanation</label>
        <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Score</label>
        <input type="number" value={score} onChange={(e) => setScore(Number(e.target.value))} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
          <span>Active</span>
        </label>
      </div>
      <div className="flex space-x-4">
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
      </div>
    </form>
  )
}
