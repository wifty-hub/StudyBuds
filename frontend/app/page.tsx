'use client'

import { useState, useEffect } from 'react'
import IntroPage from '@/components/IntroPage'
import Navigation from '@/components/Navigation'
import { getIntroDismissed, setIntroDismissed } from '@/lib/storage'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedIntroDismissed = getIntroDismissed()
    setShowIntro(!savedIntroDismissed)
  }, [])

  const handleGetStarted = () => {
    setShowIntro(false)
    setIntroDismissed(true)
    router.push('/upload')
  }

  // Show intro page without navigation
  if (showIntro) {
    return <IntroPage onGetStarted={handleGetStarted} />
  }

  // Show home page with navigation
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold gradient-text mb-4">Welcome to StudyBudds</h1>
          <p className="text-xl text-neutral-600 mb-8">
            Your intelligent study companion powered by Google Gemini AI
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <a
              href="/upload"
              className="card hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Upload Documents</h3>
              <p className="text-neutral-600">Start by uploading your study materials</p>
            </a>
            <a
              href="/materials"
              className="card hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Study Materials</h3>
              <p className="text-neutral-600">View and generate summaries, flashcards, and quizzes</p>
            </a>
            <a
              href="/chat"
              className="card hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-xl font-bold text-neutral-900 mb-2">AI Chat</h3>
              <p className="text-neutral-600">Ask questions about your materials</p>
            </a>
            <a
              href="/plan"
              className="card hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Study Plan</h3>
              <p className="text-neutral-600">Get personalized study schedules</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
