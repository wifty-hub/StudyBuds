'use client'

import { useState, useEffect } from 'react'
import DocumentUpload from '@/components/DocumentUpload'
import StudyMaterials from '@/components/StudyMaterials'
import StudyChat from '@/components/StudyChat'
import StudyPlan from '@/components/StudyPlan'
import IntroPage from '@/components/IntroPage'
import Lumio from '@/components/Lumio'
import { BookOpen, MessageSquare, FileText, Calendar } from 'lucide-react'
import { getIntroDismissed, setIntroDismissed, getActiveTab, setActiveTab as saveActiveTab } from '@/lib/storage'

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeTab, setActiveTabState] = useState<'upload' | 'materials' | 'chat' | 'plan'>('upload')
  const [refreshKey, setRefreshKey] = useState(0)

  // Load saved state on mount
  useEffect(() => {
    const savedIntroDismissed = getIntroDismissed()
    const savedActiveTab = getActiveTab()
    setShowIntro(!savedIntroDismissed)
    setActiveTabState(savedActiveTab)
  }, [])

  const setActiveTab = (tab: 'upload' | 'materials' | 'chat' | 'plan') => {
    setActiveTabState(tab)
    saveActiveTab(tab)
  }

  const handleUploadSuccess = () => {
    setRefreshKey(prev => prev + 1)
    setActiveTab('materials')
  }

  const handleGetStarted = () => {
    setShowIntro(false)
    setIntroDismissed(true)
  }

  // Show intro page first
  if (showIntro) {
    return <IntroPage onGetStarted={handleGetStarted} />
  }

  const navItems = [
    { id: 'upload', icon: FileText, label: 'Upload' },
    { id: 'materials', icon: BookOpen, label: 'Materials' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'plan', icon: Calendar, label: 'Plan' },
  ] as const

  return (
    <div className="min-h-screen flex flex-col">
      {/* Modern Header */}
      <header className="glass sticky top-0 z-50 border-b border-primary-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Lumio size={48} animated variant="image" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">StudyBudds</h1>
                <p className="text-xs text-neutral-500">Your AI Study Companion</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-2xl p-1.5 border border-primary-100/50">
              {navItems.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`nav-item ${
                    activeTab === id ? 'nav-item-active' : 'nav-item-inactive'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-in fade-in duration-500">
          {activeTab === 'upload' && <DocumentUpload onSuccess={handleUploadSuccess} />}
          {activeTab === 'materials' && <StudyMaterials key={refreshKey} />}
          {activeTab === 'chat' && <StudyChat />}
          {activeTab === 'plan' && <StudyPlan />}
        </div>
      </main>
    </div>
  )
}
