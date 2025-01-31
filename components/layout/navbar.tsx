"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, LogOut } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Quiz', href: '/quiz' },
    ...(session?.user.role === 'admin' ? [
      { name: 'Dashboard', href: '/dashboard' }
    ] : [])
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                QuizApp
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    isActive(item.href)
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth buttons / User menu */}
          <div className="hidden md:ml-6 md:flex md:items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Hi, {session.user?.name || 'User'}
                </span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block pl-3 pr-4 py-2 text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                    : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!session ? (
              <>
                <Link
                  href="/login"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  signOut()
                  setIsOpen(false)
                }}
                className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-red-600 hover:bg-gray-50 hover:text-red-700"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar