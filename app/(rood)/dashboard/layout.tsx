/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  PlusCircle, 
  Settings, 
  Menu, 
  X,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'

// Define menu items for admin dashboard
const adminMenuItems = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin/dashboard'
  },
  {
    name: 'Manage Users',
    icon: Users,
    href: '/dashboard/users'
  },
  {
    name: 'Quizzes',
    icon: BookOpen,
    subMenu: [
      {
        name: 'Create Quiz',
        href: '/dashboard/quizzes/create'
      },
      {
        name: 'Quiz List',
        href: '/dashboard/quizzes'
      }
    ]
  },
  {
    name: 'Categories',
    icon: PlusCircle,
    subMenu: [
      {
        name: 'Add Category',
        href: '/dashboard/categories/create'
      },
      {
        name: 'Manage Categories',
        href: '/dashboard/categories'
      }
    ]
  },
  {
    name: 'Settings',
    icon: Settings,
    href: '/dashboard/settings'
  }
]

// Sidebar Component
const Sidebar = ({ 
  isOpen, 
  toggleSidebar, 
  isMobileMenuOpen, 
  toggleMobileSidebar 
}: { 
  isOpen: boolean, 
  toggleSidebar: () => void,
  isMobileMenuOpen: boolean,
  toggleMobileSidebar: () => void 
}) => {
  const pathname = usePathname()

  // Sidebar Menu Item Component
  const SidebarMenuItem = ({ 
    item, 
    isCollapsed 
  }: { 
    item: any, 
    isCollapsed: boolean 
  }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
    const hasSubMenu = item.subMenu && item.subMenu.length > 0

    if (isCollapsed) {
      return (
        <div className="relative group">
          <Link 
            href={item.href || '#'}
            className={`
              flex items-center justify-center p-3 rounded-lg transition-colors duration-200
              ${pathname === item.href 
                ? 'bg-primary text-white' 
                : 'hover:bg-gray-100 text-gray-700'
              }
            `}
          >
            {item.icon && <item.icon className="w-6 h-6" />}
          </Link>
          {/* Tooltip for collapsed sidebar */}
          <div className="
            absolute left-full top-1/2 transform -translate-y-1/2 ml-3
            bg-black text-white text-sm px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            pointer-events-none z-50
          ">
            {item.name}
          </div>
        </div>
      )
    }

    return (
      <div className="w-full">
        {/* Main Menu Item */}
        <Link 
          href={item.href || '#'}
          onClick={hasSubMenu ? () => setIsSubMenuOpen(!isSubMenuOpen) : undefined}
          className={`
            flex items-center p-2 rounded-lg transition-colors duration-200
            ${pathname === item.href 
              ? 'bg-primary text-white' 
              : 'hover:bg-gray-100 text-gray-700'
            }
          `}
        >
          {item.icon && <item.icon className="mr-3 w-5 h-5" />}
          <span className="flex-1">{item.name}</span>
          {hasSubMenu && (
            <span className="ml-auto">
              {isSubMenuOpen ? '▼' : '►'}
            </span>
          )}
        </Link>

        {/* Submenu */}
        {hasSubMenu && isSubMenuOpen && !isCollapsed && (
          <div className="pl-4 mt-1 space-y-1">
            {item.subMenu.map((subItem: any) => (
              <Link 
                key={subItem.name} 
                href={subItem.href}
                className={`
                  block p-2 rounded-lg transition-colors duration-200
                  ${pathname === subItem.href 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-gray-100 text-gray-700'
                  }
                `}
              >
                {subItem.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile Sidebar */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg 
          transform transition-transform duration-300 ease-in-out
          md:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile Close Button */}
        <button 
          onClick={toggleMobileSidebar} 
          className="absolute top-4 right-4"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo and Title */}
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-center">Admin Dashboard</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {adminMenuItems.map((item) => (
            <SidebarMenuItem 
              key={item.name} 
              item={item} 
              isCollapsed={false} 
            />
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div 
        className={`
          hidden md:block fixed inset-y-0 left-0 z-40 
          bg-white shadow-lg transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64' : 'w-20'}
        `}
      >
        {/* Collapse/Expand Button */}
        <button 
          onClick={toggleSidebar} 
          className="absolute top-4 right-4 z-50"
        >
          {isOpen ? <ChevronsLeft className="w-6 h-6" /> : <ChevronsRight className="w-6 h-6" />}
        </button>

        {/* Logo and Title */}
        <div className={`p-4 border-b ${isOpen ? '' : 'flex justify-center'}`}>
          {isOpen ? (
            <h1 className="text-xl font-bold text-center">Admin Dashboard</h1>
          ) : (
            <h1 className="text-xl font-bold text-center">AD</h1>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {adminMenuItems.map((item) => (
            <SidebarMenuItem 
              key={item.name} 
              item={item} 
              isCollapsed={!isOpen} 
            />
          ))}
        </nav>
      </div>
    </>
  )
}

// Main Admin Layout Component
export default function AdminDashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleDesktopSidebar = () => {
    setIsDesktopSidebarOpen(!isDesktopSidebarOpen)
  }

  const toggleMobileSidebar = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isDesktopSidebarOpen} 
        toggleSidebar={toggleDesktopSidebar}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />

      {/* Main Content Area */}
      <div 
        className={`
          flex-1 flex flex-col overflow-hidden ml-0 md:ml-20 
          transition-all duration-300 ease-in-out
          ${isDesktopSidebarOpen ? 'md:ml-64' : 'md:ml-20'}
        `}
      >
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-md p-4 flex items-center">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMobileSidebar} 
            className="mr-4 md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Top Bar Content */}
          <div className="flex-1 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            
            {/* User Profile / Logout */}
            <div className="flex items-center space-x-4">
              {/* Add user profile dropdown or logout button */}
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Scrollable Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  )
}