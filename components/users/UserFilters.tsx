import React from 'react'
import { Search, Plus } from 'lucide-react'

interface UserFiltersProps {
  searchTerm: string
  filterRole: string
  onSearchChange: (term: string) => void
  onRoleChange: (role: string) => void
  onAddUser: () => void
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  searchTerm,
  filterRole,
  onSearchChange,
  onRoleChange,
  onAddUser
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded w-64"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <select
          value={filterRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>
      </div>

      <button
        onClick={onAddUser}
        className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600"
      >
        <Plus className="mr-2" /> Add User
      </button>
    </div>
  )
}