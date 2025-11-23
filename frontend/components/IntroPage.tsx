'use client'

import { useState, useEffect } from 'react'
import Lumio from './Lumio'
import { ArrowRight, Sparkles, FileText, MessageSquare, BookOpen, Calendar, Check, Zap, Brain, Target, TrendingUp } from 'lucide-react'

interface IntroPageProps {
  onGetStarted: () => void
}

export default function IntroPage({ onGetStarted }: IntroPageProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    { icon: FileText, text: 'Upload documents' },
    { icon: Sparkles, text: 'AI summaries' },
    { icon: BookOpen, text: 'Flashcards & quizzes' },
    { icon: MessageSquare, text: 'Study chat' },
    { icon: Calendar, text: 'Study plans' },
  ]

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden w-full bg-white">
      {/* Minimal Background - subtle gradients with parallax effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary-50/30 to-transparent rounded-full blur-3xl transition-transform duration-300"
          style={{ transform: `translate(-50%, ${scrollY * 0.3}px)` }}
        ></div>
        <div 
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-t from-accent-50/20 to-transparent rounded-full blur-3xl transition-transform duration-300"
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Main Hero Section - NotebookLM style */}
        <div className="flex-1 flex items-center justify-center px-6 py-20 min-h-[90vh]">
          <div className="max-w-4xl w-full text-center">
            {/* Lumio Mascot - with subtle animation */}
            <div className="flex justify-center mb-8 animate-fade-in">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary-200 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="relative transform group-hover:scale-105 transition-transform duration-500">
                  <Lumio size={120} animated variant="image" className="drop-shadow-lg" />
                </div>
              </div>
            </div>

            {/* Main Headline - Large, bold, clean */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-neutral-900 leading-tight animate-fade-in">
              <span className="gradient-text">StudyBudds</span>
            </h1>

            {/* Subheadline - Clear value proposition */}
            <p className="text-2xl md:text-3xl text-neutral-700 mb-6 font-medium leading-relaxed animate-fade-in" style={{ animationDelay: '100ms' }}>
              Your AI study companion
            </p>

            {/* Description - Concise and clear */}
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
              Transform your study materials into summaries, flashcards, quizzes, and personalized study plans with the power of AI.
            </p>

            {/* CTA Button - Prominent and clean */}
            <div className="flex flex-col items-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <button
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={onGetStarted}
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-3 group shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <span>Get Started</span>
                <ArrowRight className={`h-5 w-5 transition-transform duration-300 ${isHovering ? 'translate-x-2' : ''}`} />
              </button>
              
              {/* Quick Features - Minimal, clean list */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-sm text-neutral-500">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div 
                      key={index} 
                      className="flex items-center space-x-2 opacity-0 animate-fade-in"
                      style={{ animationDelay: `${400 + index * 50}ms` }}
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{feature.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Preview/Demo Section - Subtle showcase */}
        <div className="px-6 py-20 bg-gradient-to-b from-white to-neutral-50/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Everything you need to study smarter
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                See how StudyBudds transforms your learning experience
              </p>
            </div>

            {/* Preview Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  title: 'Smart Summaries',
                  desc: 'AI extracts key points and creates structured summaries',
                  icon: Sparkles,
                  color: 'from-primary-400 to-primary-600',
                  preview: '📄 → ✨ Summary'
                },
                {
                  title: 'Interactive Chat',
                  desc: 'Ask questions and get instant answers with citations',
                  icon: MessageSquare,
                  color: 'from-accent-400 to-accent-600',
                  preview: '💬 → 🎯 Answers'
                },
                {
                  title: 'Study Plans',
                  desc: 'Personalized schedules tailored to your materials',
                  icon: Calendar,
                  color: 'from-primary-400 to-primary-600',
                  preview: '📚 → 📅 Plan'
                },
              ].map((preview, index) => {
                const Icon = preview.icon
                return (
                  <div
                    key={index}
                    className="group relative bg-white border-2 border-neutral-200 rounded-2xl p-8 hover:border-primary-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${preview.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">{preview.title}</h3>
                    <p className="text-neutral-600 mb-4 leading-relaxed">{preview.desc}</p>
                    <div className="flex items-center space-x-2 text-sm font-medium text-primary">
                      <span>{preview.preview}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                )
              })}
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
                  icon: '⚡',
                  stat: '10x faster'
                },
                { 
                  title: 'Study Smarter', 
                  desc: 'AI-powered insights and plans',
                  icon: '🧠',
                  stat: 'Smarter learning'
                },
                { 
                  title: 'Stay Organized', 
                  desc: 'All materials in one place',
                  icon: '📚',
                  stat: 'One platform'
                },
                { 
                  title: 'Ask Anything', 
                  desc: 'Chat with your documents',
                  icon: '💬',
                  stat: 'Instant answers'
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-neutral-200 rounded-xl hover:shadow-lg hover:border-primary-200 transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{benefit.icon}</div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-2">{benefit.desc}</p>
                  <p className="text-xs font-medium text-primary">{benefit.stat}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Proof / Stats Section */}
        <div className="px-6 py-16 bg-gradient-to-b from-neutral-50/50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: 'AI-Powered', label: 'Powered by Google Gemini' },
                { number: '100%', label: 'Free to use' },
                { number: 'Instant', label: 'Real-time processing' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Ready to transform your studying?
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Join students who are already studying smarter with StudyBudds
            </p>
            <button
              onClick={onGetStarted}
              className="btn-primary text-lg px-10 py-4 flex items-center space-x-3 mx-auto group shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Footer - Minimal */}
        <footer className="text-center py-8 text-neutral-400 text-sm border-t border-neutral-100">
          <p>Powered by Google Gemini AI • Built with Next.js & FastAPI</p>
        </footer>
      </div>
    </div>
  )
}
