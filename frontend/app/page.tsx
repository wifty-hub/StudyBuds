'use client'

import { useState } from 'react'
import DocumentUpload from '@/components/DocumentUpload'
import StudyMaterials from '@/components/StudyMaterials'
import StudyChat from '@/components/StudyChat'
import StudyPlan from '@/components/StudyPlan'
import Lumio from '@/components/Lumio'
import { BookOpen, MessageSquare, FileText, Calendar } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'upload' | 'materials' | 'chat' | 'plan'>('upload')
  const [refreshKey, setRefreshKey] = useState(0)

  const handleUploadSuccess = () => {
    setRefreshKey(prev => prev + 1)
    setActiveTab('materials')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-[#FAFAFF] to-primary-100">
      <header className="bg-white shadow-sm border-b border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lumio size={40} animated variant="image" />
              <div>
                <h1 className="text-2xl font-bold text-primary">StudyBudds</h1>
                <p className="text-xs text-neutral-400">Powered by Lumio</p>
              </div>
            </div>
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'upload'
                    ? 'bg-primary text-white'
                    : 'text-neutral-600 hover:bg-primary-50'
                }`}
              >
                <FileText className="h-5 w-5" />
                <span>Upload</span>
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'materials'
                    ? 'bg-primary text-white'
                    : 'text-neutral-600 hover:bg-primary-50'
                }`}
              >
                <BookOpen className="h-5 w-5" />
                <span>Materials</span>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'chat'
                    ? 'bg-primary text-white'
                    : 'text-neutral-600 hover:bg-primary-50'
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('plan')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'plan'
                    ? 'bg-primary text-white'
                    : 'text-neutral-600 hover:bg-primary-50'
                }`}
              >
                <Calendar className="h-5 w-5" />
                <span>Study Plan</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'upload' && <DocumentUpload onSuccess={handleUploadSuccess} />}
        {activeTab === 'materials' && <StudyMaterials key={refreshKey} />}
        {activeTab === 'chat' && <StudyChat />}
        {activeTab === 'plan' && <StudyPlan />}
      </main>
    </div>
  )
}

