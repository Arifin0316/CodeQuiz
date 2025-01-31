/* eslint-disable @typescript-eslint/no-explicit-any */
// components/users/UserManagementClient.tsx
"use client"

import React, { useState, useEffect } from 'react'
import { UserForm, User } from '@/components/users/UserForm'
import { UserTable } from '@/components/users/UserTable'
import { UserFilters } from '@/components/users/UserFilters'
import { toast } from 'react-hot-toast'


interface UserManagementClientProps {
  initialUsers: any[]
  updateUser: (userId: string, userData: any) => Promise<any>
  deleteUser: (userId: string) => Promise<any>
}

export default function UserManagementClient({ 
  initialUsers, 
  updateUser, 
  deleteUser 
}: UserManagementClientProps) {
  const [users, setUsers] = useState<User[]>(
    initialUsers.map(user => ({
      id: user.id,
      name: user.name || '',
      email: user.email || '',
      role: user.role as User['role'],
      isActive: user.isActive ?? true,
      createdAt: new Date(user.createdAt)
    }))
  )
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('')

  // Filter users based on search and role
  useEffect(() => {
    let result = users

    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterRole) {
      result = result.filter(user => user.role === filterRole)
    }

    setFilteredUsers(result)
  }, [searchTerm, filterRole, users])

  const handleEditUser = async (userData: User) => {
    if (!userData.id) {
      toast.error('User ID is required')
      return
    }

    // Optimistic update
    const originalUsers = [...users]
   
    
    // Update local state immediately
    const newUsers = users.map(user => 
      user.id === userData.id 
        ? { ...userData, createdAt: user.createdAt } 
        : user
    )
    setUsers(newUsers)
    setFilteredUsers(newUsers)
    setIsFormOpen(false)
    setSelectedUser(undefined)

    try {
      // Attempt to update on server
      const serverUpdatedUser = await updateUser(userData.id, userData)
      
      // Update with server response if needed
      const finalUsers = users.map(user => 
        user.id === serverUpdatedUser.id 
          ? {
              ...serverUpdatedUser,
              createdAt: new Date(serverUpdatedUser.createdAt)
            } 
          : user
      )
      setUsers(finalUsers)
      setFilteredUsers(finalUsers)
      
      toast.success('User updated successfully')
    } catch (error) {
      // Rollback if server update fails
      console.error('Error updating user:', error)
      toast.error('Failed to update user')
      
      // Revert to original state
      setUsers(originalUsers)
      setFilteredUsers(originalUsers)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // Optimistic deletion
      const originalUsers = [...users]
      const newUsers = users.filter(user => user.id !== userId)
      
      // Update local state immediately
      setUsers(newUsers)
      setFilteredUsers(newUsers)

      try {
        // Attempt to delete on server
        await deleteUser(userId)
        toast.success('User deleted successfully')
      } catch (error) {
        // Rollback if server deletion fails
        console.error('Error deleting user:', error)
        toast.error('Failed to delete user')
        
        // Restore original users
        setUsers(originalUsers)
        setFilteredUsers(originalUsers)
      }
    }
  }

  // ... rest of the component remains the same

  return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          User Management
        </h1>

        <UserFilters
          searchTerm={searchTerm}
          filterRole={filterRole}
          onSearchChange={setSearchTerm}
          onRoleChange={setFilterRole}
          onAddUser={() => {
            setSelectedUser(undefined)
            setIsFormOpen(true)
          }}
        />

        <UserTable
          users={filteredUsers}
          onEdit={(user) => {
            setSelectedUser(user)
            setIsFormOpen(true)
          }}
          onDelete={handleDeleteUser}
        />

        {isFormOpen && (
          <UserForm
            user={selectedUser}
            onSubmit={handleEditUser}
            onCancel={() => {
              setIsFormOpen(false)
              setSelectedUser(undefined)
            }}
          />
        )}
      </div>
  )
}