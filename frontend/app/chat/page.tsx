'use client'

import Navigation from '@/components/Navigation'
import StudyChat from '@/components/StudyChat'

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full">
      <Navigation />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StudyChat />
      </main>
    </div>
  )
}

