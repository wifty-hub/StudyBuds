'use client'

import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import DocumentUpload from '@/components/DocumentUpload'

export default function UploadPage() {
  const router = useRouter()

  const handleUploadSuccess = () => {
    router.push('/materials')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DocumentUpload onSuccess={handleUploadSuccess} />
      </main>
    </div>
  )
}

