// app/admin/users/page.tsx
import { GetUsers, UpdateUser, DeleteUser } from '@/lib/data'
import UserManagementClient from '@/components/users/UserManagementClient'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function UserManagementPage() {
  const session = await auth()
  
  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  const users = await GetUsers()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateUser = async (userId: string, userData: any) => {
    'use server'
    const updatedUser = await UpdateUser(userId, userData)
    revalidatePath('/dashboard/users')
    return updatedUser
  }

  const handleDeleteUser = async (userId: string) => {
    'use server'
    const deletedUser = await DeleteUser(userId)
    revalidatePath('/dashboard/users')
    return deletedUser
  }

  return (
    <UserManagementClient 
      initialUsers={users || []} 
      updateUser={handleUpdateUser}
      deleteUser={handleDeleteUser}
    />
  )
}