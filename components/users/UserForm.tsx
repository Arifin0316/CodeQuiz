import React, { useState } from 'react'

// User Interface
export interface User {
  id?: string
  name: string
  email: string
  role: 'user' | 'admin' | 'moderator'
  isActive: boolean
  createdAt?: Date
}

interface UserFormProps {
  user?: User
  onSubmit: (userData: User) => void
  onCancel: () => void
}

export const UserForm: React.FC<UserFormProps> = ({ 
  user, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<User>({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'user',
    isActive: user?.isActive ?? true
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      id: user?.id,
      createdAt: user?.createdAt || new Date()
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {user ? 'Edit User' : 'Add New User'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Active User</label>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {user ? 'Update User' : 'Add User'}
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