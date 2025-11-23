'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { checkBackendAvailable } from '@/lib/api'

export default function BackendStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')

  useEffect(() => {
    checkBackendAvailable().then((available) => {
      setStatus(available ? 'connected' : 'disconnected')
    })
  }, [])

  if (status === 'checking') {
    return null // Don't show anything while checking
  }

  if (status === 'connected') {
    return null // Don't show anything if connected
  }

  return (
    <div className="bg-accent-50 border-2 border-accent-200 rounded-xl p-4 mb-6 flex items-start space-x-3">
      <AlertCircle className="h-5 w-5 text-accent-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-semibold text-neutral-900 mb-1">Backend Not Connected</p>
        <p className="text-sm text-neutral-700">
          Some features require a backend server. To enable full functionality, set up your backend and configure the <code className="bg-white px-1.5 py-0.5 rounded text-xs">NEXT_PUBLIC_API_URL</code> environment variable.
        </p>
      </div>
    </div>
  )
}

