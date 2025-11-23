'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle2, Loader2, X, ExternalLink, BookOpen } from 'lucide-react'
import { checkBackendAvailable } from '@/lib/api'
import Link from 'next/link'

export default function BackendStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')
  const [isExpanded, setIsExpanded] = useState(true)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    checkBackendAvailable().then((available) => {
      setStatus(available ? 'connected' : 'disconnected')
    })
  }, [])

  // Check if dismissed in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('backend_status_dismissed')
      if (dismissed === 'true') {
        setIsDismissed(true)
      }
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem('backend_status_dismissed', 'true')
    }
  }

  if (status === 'checking') {
    return null
  }

  if (status === 'connected') {
    return null
  }

  if (isDismissed) {
    return null
  }

  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'

  return (
    <div className="bg-accent-50/80 border-2 border-accent-200 rounded-xl p-4 mb-6 animate-fade-in backdrop-blur-sm">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-accent-600 flex-shrink-0 mt-0.5 animate-pulse" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <p className="font-semibold text-neutral-900">Backend Not Connected</p>
            <button
              onClick={handleDismiss}
              className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 -mt-1 -mr-1"
              title="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-sm text-neutral-700 leading-relaxed mb-3">
            Some features require a backend server. To enable full functionality:
          </p>

          {isLocalhost ? (
            <div className="space-y-2 text-sm">
              <div className="bg-white/60 rounded-lg p-3 border border-accent-200">
                <p className="font-medium text-neutral-900 mb-2">For Local Development:</p>
                <ol className="list-decimal list-inside space-y-1 text-neutral-700 ml-2">
                  <li>Start backend services (see <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono">START_HERE.md</code>)</li>
                  <li>Backend should run on <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono">http://localhost:8000</code></li>
                  <li>No environment variable needed for localhost</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <div className="bg-white/60 rounded-lg p-3 border border-accent-200">
                <p className="font-medium text-neutral-900 mb-2">For Production:</p>
                <ol className="list-decimal list-inside space-y-1 text-neutral-700 ml-2">
                  <li>Deploy backend services (Railway, Render, etc.)</li>
                  <li>Set <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono">NEXT_PUBLIC_API_URL</code> environment variable</li>
                  <li>Redeploy frontend after setting the variable</li>
                </ol>
              </div>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="https://github.com/wifty-hub/StudyBuds/blob/main/START_HERE.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-xs text-primary hover:text-primary-600 font-medium"
            >
              <BookOpen className="h-3 w-3" />
              <span>View Setup Guide</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-neutral-400">•</span>
            <a
              href="https://github.com/wifty-hub/StudyBuds/blob/main/DEPLOYMENT.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-xs text-primary hover:text-primary-600 font-medium"
            >
              <span>Deployment Guide</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
