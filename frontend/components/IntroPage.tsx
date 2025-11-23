'use client'

import { useState } from 'react'
import Lumio from './Lumio'
import { BookOpen, Sparkles, MessageSquare, Calendar, FileText, ArrowRight, Check } from 'lucide-react'

interface IntroPageProps {
  onGetStarted: () => void
}

export default function IntroPage({ onGetStarted }: IntroPageProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Upload Documents',
      description: 'PDFs, DOCX, images - we handle them all with smart OCR',
      color: 'text-primary',
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'AI Summaries',
      description: 'Get instant, structured summaries tailored to your needs',
      color: 'text-accent',
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Flashcards & Quizzes',
      description: 'Generate study materials automatically from your content',
      color: 'text-primary',
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: 'AI Study Chat',
      description: 'Ask questions and get answers with citations',
      color: 'text-accent',
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: 'Study Plans',
      description: 'Personalized schedules based on your materials',
      color: 'text-primary',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full text-center">
          {/* Lumio Mascot */}
          <div className="flex justify-center mb-8">
            <Lumio size={180} animated variant="image" />
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold text-primary mb-4">
            StudyBudds
          </h1>
          <p className="text-2xl md:text-3xl text-neutral-600 mb-2">
            Your Intelligent Study Companion
          </p>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto mb-8">
            Powered by Google Gemini AI. Transform your study materials into summaries, flashcards, quizzes, and personalized study plans.
          </p>

          {/* CTA Button */}
          <button
            onClick={onGetStarted}
            className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto mb-12 group shadow-lg hover:shadow-xl"
          >
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-16">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`bg-[#F1F1F6] rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                  hoveredFeature === index
                    ? 'transform scale-105 shadow-lg border-2 border-primary'
                    : 'hover:shadow-md'
                }`}
              >
                <div className={`${feature.color} mb-4 flex justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Key Benefits */}
          <div className="mt-16 bg-[#F1F1F6] rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Why StudyBudds?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start space-x-3">
                <Check className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-900">Save Time</p>
                  <p className="text-sm text-neutral-600">Automate note-taking and study material creation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-900">Study Smarter</p>
                  <p className="text-sm text-neutral-600">AI-powered insights and personalized plans</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-900">Stay Organized</p>
                  <p className="text-sm text-neutral-600">All your materials in one place</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-900">Ask Anything</p>
                  <p className="text-sm text-neutral-600">Chat with Lumio about your study materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-neutral-500 text-sm">
        <p>Powered by Google Gemini AI • Built with Next.js & FastAPI</p>
      </footer>
    </div>
  )
}

