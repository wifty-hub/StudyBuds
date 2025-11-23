'use client'

import Navigation from '@/components/Navigation'
import StudyMaterials from '@/components/StudyMaterials'

export default function MaterialsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StudyMaterials />
      </main>
    </div>
  )
}

