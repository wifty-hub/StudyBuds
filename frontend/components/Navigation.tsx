'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Lumio from './Lumio'
import { BookOpen, MessageSquare, FileText, Calendar, Home } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/upload', icon: FileText, label: 'Upload' },
    { href: '/materials', icon: BookOpen, label: 'Materials' },
    { href: '/chat', icon: MessageSquare, label: 'Chat' },
    { href: '/plan', icon: Calendar, label: 'Plan' },
  ] as const

  return (
    <header className="glass sticky top-0 z-50 border-b border-primary-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
            <div className="relative">
              <Lumio size={48} animated variant="image" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">StudyBudds</h1>
              <p className="text-xs text-neutral-500">Your AI Study Companion</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-2xl p-1.5 border border-primary-100/50">
            {navItems.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`nav-item ${
                    isActive ? 'nav-item-active' : 'nav-item-inactive'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}

