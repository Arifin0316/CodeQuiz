/* eslint-disable @typescript-eslint/no-explicit-any */
// components/quiz/QuizManagementClient.tsx
"use client"

import React, { useState, useEffect } from 'react'
import { QuizForm } from '@/components/quiz/QuizForm'
import { QuizTable, Quiz } from '@/components/quiz/QuizTable'
import { QuizFilters } from '@/components/quiz/QuizFilters'
import { toast } from 'react-hot-toast'

interface QuizManagementClientProps {
  initialQuizzes: any[]
  updateQuiz: (quizId: string, quizData: any) => Promise<any>
  deleteQuiz: (quizId: string) => Promise<any>
}

export default function QuizManagementClient({ 
  initialQuizzes, 
  updateQuiz, 
  deleteQuiz 
}: QuizManagementClientProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>(
    initialQuizzes.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description || '',
      category: quiz.category,
      difficulty: quiz.difficulty as Quiz['difficulty'],
      timeLimit: quiz.timeLimit,
      isActive: quiz.isActive ?? true,
      createdAt: new Date(quiz.createdAt)
    }))
  )
  
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>(quizzes)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | undefined>(undefined)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  // Get unique categories from quizzes
  const categories = [...new Set(quizzes.map(quiz => quiz.category))]

  // Filter quizzes based on search and filters
  useEffect(() => {
    let result = quizzes

    if (searchTerm) {
      result = result.filter(quiz => 
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterDifficulty) {
      result = result.filter(quiz => quiz.difficulty === filterDifficulty)
    }

    if (filterCategory) {
      result = result.filter(quiz => quiz.category === filterCategory)
    }

    setFilteredQuizzes(result)
  }, [searchTerm, filterDifficulty, filterCategory, quizzes])

  const handleEditQuiz = async (quizData: Quiz) => {
    if (!quizData.id) {
      toast.error('Quiz ID is required')
      return
    }

    // Optimistic update
    const originalQuizzes = [...quizzes]
    
    // Update local state immediately
    const newQuizzes = quizzes.map(quiz => 
      quiz.id === quizData.id 
        ? { ...quizData, createdAt: quiz.createdAt } 
        : quiz
    )
    setQuizzes(newQuizzes)
    setFilteredQuizzes(newQuizzes)
    setIsFormOpen(false)
    setSelectedQuiz(undefined)

    try {
      // Attempt to update on server
      const serverUpdatedQuiz = await updateQuiz(quizData.id, quizData)
      
      // Update with server response if needed
      const finalQuizzes = quizzes.map(quiz => 
        quiz.id === serverUpdatedQuiz.id 
          ? {
              ...serverUpdatedQuiz,
              createdAt: new Date(serverUpdatedQuiz.createdAt)
            } 
          : quiz
      )
      setQuizzes(finalQuizzes)
      setFilteredQuizzes(finalQuizzes)
      
      toast.success('Quiz updated successfully')
    } catch (error) {
      // Rollback if server update fails
      console.error('Error updating quiz:', error)
      toast.error('Failed to update quiz')
      
      // Revert to original state
      setQuizzes(originalQuizzes)
      setFilteredQuizzes(originalQuizzes)
    }
  }

  const handleDeleteQuiz = async (quizId: string) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      // Optimistic deletion
      const originalQuizzes = [...quizzes]
      const newQuizzes = quizzes.filter(quiz => quiz.id !== quizId)
      
      // Update local state immediately
      setQuizzes(newQuizzes)
      setFilteredQuizzes(newQuizzes)

      try {
        // Attempt to delete on server
        await deleteQuiz(quizId)
        toast.success('Quiz deleted successfully')
      } catch (error) {
        // Rollback if server deletion fails
        console.error('Error deleting quiz:', error)
        toast.error('Failed to delete quiz')
        
        // Restore original quizzes
        setQuizzes(originalQuizzes)
        setFilteredQuizzes(originalQuizzes)
      }
    }
  }

  const handleViewQuiz = (quiz: Quiz) => {
    // Implement view quiz functionality
    console.log('View quiz:', quiz)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Quiz Management
      </h1>

      <QuizFilters
        searchTerm={searchTerm}
        filterDifficulty={filterDifficulty}
        filterCategory={filterCategory}
        onSearchChange={setSearchTerm}
        onDifficultyChange={setFilterDifficulty}
        onCategoryChange={setFilterCategory}
        categories={categories}
      />

      <QuizTable
        quizzes={filteredQuizzes}
        onEdit={(quiz) => {
          setSelectedQuiz(quiz)
          setIsFormOpen(true)
        }}
        onDelete={handleDeleteQuiz}
        onView={handleViewQuiz}
      />

      {isFormOpen && (
        <QuizForm
          quiz={selectedQuiz}
          onSubmit={handleEditQuiz}
          onCancel={() => {
            setIsFormOpen(false)
            setSelectedQuiz(undefined)
          }}
        />
      )}
    </div>
  )
}