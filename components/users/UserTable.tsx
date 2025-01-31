import React from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import { User } from './UserForm'
import { formatDate } from '@/lib/utils'

interface UserTableProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (userId: string) => void
}

export const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded text-xs uppercase
                  ${user.role === 'admin' 
                    ? 'bg-red-100 text-red-800'
                    : user.role === 'moderator'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                  }
                `}>
                  {user.role}
                </span>
              </td>
              <td className="p-4">
                <span className={`
                  px-2 py-1 rounded text-xs
                  ${user.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                  }
                `}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="p-4">
                {user.createdAt ? formatDate(user.createdAt.toISOString()) : 'N/A'}
              </td>
              <td className="p-4 flex space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => user.id && onDelete(user.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* No users found message */}
      {users.length === 0 && (
        <div className="text-center p-6 text-gray-500">
          No users found
        </div>
      )}
    </div>
  )
}