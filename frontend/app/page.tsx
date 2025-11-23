'use client'

import { useState, useEffect } from 'react'
import IntroPage from '@/components/IntroPage'
import Navigation from '@/components/Navigation'
import { getIntroDismissed, setIntroDismissed } from '@/lib/storage'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Lumio from '@/components/Lumio'
import { BookOpen, Sparkles, MessageSquare, Calendar, FileText, ArrowRight, Check, Zap, Target, Brain } from 'lucide-react'

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
    // Show main page content without navigation
  }

  // Show intro page without navigation
  if (showIntro) {
    return <IntroPage onGetStarted={handleGetStarted} />
  }

  // Show home page similar to intro but with navigation
  const features = [
    {
      icon: FileText,
      title: 'Upload Documents',
      description: 'PDFs, DOCX, images - we handle them all with smart OCR',
      gradient: 'from-primary-400 to-primary-600',
      href: '/upload',
    },
    {
      icon: Sparkles,
      title: 'AI Summaries',
      description: 'Get instant, structured summaries tailored to your needs',
      gradient: 'from-accent-400 to-accent-600',
      href: '/materials',
    },
    {
      icon: BookOpen,
      title: 'Flashcards & Quizzes',
      description: 'Generate study materials automatically from your content',
      gradient: 'from-primary-400 to-primary-600',
      href: '/materials',
    },
    {
      icon: MessageSquare,
      title: 'AI Study Chat',
      description: 'Ask questions and get answers with citations',
      gradient: 'from-accent-400 to-accent-600',
      href: '/chat',
    },
    {
      icon: Calendar,
      title: 'Study Plans',
      description: 'Personalized schedules based on your materials',
      gradient: 'from-primary-400 to-primary-600',
      href: '/plan',
    },
  ]

  const benefits = [
    { icon: Zap, title: 'Save Time', desc: 'Automate note-taking and study material creation' },
    { icon: Brain, title: 'Study Smarter', desc: 'AI-powered insights and personalized plans' },
    { icon: Target, title: 'Stay Organized', desc: 'All your materials in one place' },
    { icon: MessageSquare, title: 'Ask Anything', desc: 'Chat with Lumio about your study materials' },
  ]

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full">
      {/* No Navigation - just the main page content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background via-60% to-primary-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(89,102,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,200,87,0.1),transparent_50%)]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-6xl w-full">
            {/* Hero Section */}
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {/* Lumio Mascot */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                  <Lumio size={200} animated variant="image" className="relative z-10" />
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-7xl md:text-8xl font-extrabold mb-6">
                <span className="gradient-text">StudyBudds</span>
              </h1>
              <p className="text-3xl md:text-4xl font-semibold text-neutral-700 mb-4">
                Your Intelligent Study Companion
              </p>
              <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-10">
                Powered by Google Gemini AI. Transform your study materials into summaries, flashcards, quizzes, and personalized study plans.
              </p>

              {/* CTA Button */}
              <Link
                href="/upload"
                className="btn-primary text-xl px-10 py-4 inline-flex items-center space-x-3 group"
              >
                <span>Get Started</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Link
                    key={index}
                    href={feature.href}
                    className="card-soft transition-all duration-500 cursor-pointer hover:scale-110 hover:shadow-2xl hover:border-primary-300 group"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-neutral-900 mb-2 text-center">{feature.title}</h3>
                    <p className="text-sm text-neutral-600 text-center">{feature.description}</p>
                  </Link>
                )
              })}
            </div>

            {/* Benefits Section */}
            <div className="card-elevated max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
                Why Choose StudyBudds?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-xl hover:bg-primary-50 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-md">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900 mb-1">{benefit.title}</p>
                        <p className="text-sm text-neutral-600">{benefit.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Minimal */}
      <footer className="text-center py-8 text-neutral-400 text-sm border-t border-neutral-100 bg-white">
        <p>Powered by Google Gemini AI • Built with Next.js & FastAPI</p>
      </footer>
    </div>
  )
}
