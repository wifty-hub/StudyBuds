'use client'

import { useState } from 'react'
import Lumio from './Lumio'
import { ArrowRight, Sparkles, FileText, MessageSquare, BookOpen, Calendar, Check } from 'lucide-react'

interface IntroPageProps {
  onGetStarted: () => void
}

export default function IntroPage({ onGetStarted }: IntroPageProps) {
  const [isHovering, setIsHovering] = useState(false)

  const features = [
    { icon: FileText, text: 'Upload documents' },
    { icon: Sparkles, text: 'AI summaries' },
    { icon: BookOpen, text: 'Flashcards & quizzes' },
    { icon: MessageSquare, text: 'Study chat' },
    { icon: Calendar, text: 'Study plans' },
  ]

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden w-full bg-white">
      {/* Minimal Background - subtle gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary-50/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-t from-accent-50/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Main Hero Section - NotebookLM style */}
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl w-full text-center">
            {/* Lumio Mascot - smaller, more subtle */}
            <div className="flex justify-center mb-8 animate-fade-in">
              <div className="relative">
                <Lumio size={120} animated variant="image" className="relative z-10 drop-shadow-lg" />
              </div>
            </div>

            {/* Main Headline - Large, bold, clean */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-neutral-900 leading-tight animate-fade-in">
              <span className="gradient-text">StudyBudds</span>
            </h1>

            {/* Subheadline - Clear value proposition */}
            <p className="text-2xl md:text-3xl text-neutral-700 mb-6 font-medium leading-relaxed animate-fade-in">
              Your AI study companion
            </p>

            {/* Description - Concise and clear */}
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in">
              Transform your study materials into summaries, flashcards, quizzes, and personalized study plans with the power of AI.
            </p>

            {/* CTA Button - Prominent and clean */}
            <div className="flex flex-col items-center gap-4 animate-fade-in">
              <button
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={onGetStarted}
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-3 group shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Get Started</span>
                <ArrowRight className={`h-5 w-5 transition-transform duration-300 ${isHovering ? 'translate-x-2' : ''}`} />
              </button>
              
              {/* Quick Features - Minimal, clean list */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-sm text-neutral-500">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{feature.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section - Clean, minimal cards */}
        <div className="px-6 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: 'Save Time', 
                  desc: 'Automate study material creation',
                  icon: '⚡'
                },
                { 
                  title: 'Study Smarter', 
                  desc: 'AI-powered insights and plans',
                  icon: '🧠'
                },
                { 
                  title: 'Stay Organized', 
                  desc: 'All materials in one place',
                  icon: '📚'
                },
                { 
                  title: 'Ask Anything', 
                  desc: 'Chat with your documents',
                  icon: '💬'
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-neutral-200 rounded-xl hover:shadow-lg hover:border-primary-200 transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Minimal */}
        <footer className="text-center py-8 text-neutral-400 text-sm border-t border-neutral-100">
          <p>Powered by Google Gemini AI</p>
        </footer>
      </div>
    </div>
  )
}
