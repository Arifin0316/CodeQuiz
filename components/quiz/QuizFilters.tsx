// components/quiz/QuizFilters.tsx
import React from 'react'
import { Search, Plus } from 'lucide-react'
import Link from 'next/link'

interface QuizFiltersProps {
  searchTerm: string
  filterDifficulty: string
  filterCategory: string
  onSearchChange: (term: string) => void
  onDifficultyChange: (difficulty: string) => void
  onCategoryChange: (category: string) => void
  categories: string[]
}

export const QuizFilters: React.FC<QuizFiltersProps> = ({
  searchTerm,
  filterDifficulty,
  filterCategory,
  onSearchChange,
  onDifficultyChange,
  onCategoryChange,
  categories
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded w-64"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <select
          value={filterDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <Link
        href="/dashboard/quiz/addQuiz"
        className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600"
      >
        <Plus className="mr-2" /> Add Quiz
      </Link>
    </div>
  )
}