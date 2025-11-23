'use client'

import { useState } from 'react'
import Lumio from './Lumio'
import { Sparkles, BookOpen, MessageSquare, Calendar } from 'lucide-react'

interface OnboardingProps {
  onComplete: () => void
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: 'Welcome to AI Study Assistant!',
      description: 'Meet Lumio, your intelligent study companion. Lumio helps you learn smarter, not harder.',
      icon: <Lumio size={120} animated variant="with-book" />,
    },
    {
      title: 'Upload Your Materials',
      description: 'Upload PDFs, DOCX files, or images. Lumio will extract and understand everything automatically.',
      icon: <BookOpen className="h-16 w-16 text-primary" />,
    },
    {
      title: 'Generate Study Tools',
      description: 'Get instant summaries, flashcards, and quizzes tailored to your materials.',
      icon: <Sparkles className="h-16 w-16 text-accent" />,
    },
    {
      title: 'Chat with Lumio',
      description: 'Ask questions and get answers with citations from your uploaded documents.',
      icon: <MessageSquare className="h-16 w-16 text-primary" />,
    },
    {
      title: 'Personalized Study Plans',
      description: 'Get custom study schedules based on your materials and learning goals.',
      icon: <Calendar className="h-16 w-16 text-accent" />,
    },
  ]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="card text-center">
          <div className="flex justify-center mb-6">
            {typeof steps[step].icon === 'object' && 'type' in steps[step].icon
              ? steps[step].icon
              : <div className="flex items-center justify-center">{steps[step].icon}</div>}
          </div>

          <h2 className="text-3xl font-bold text-primary mb-4">{steps[step].title}</h2>
          <p className="text-lg text-neutral-600 mb-8">{steps[step].description}</p>

          {/* Progress dots */}
          <div className="flex justify-center space-x-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === step
                    ? 'w-8 bg-primary'
                    : index < step
                    ? 'w-2 bg-primary-300'
                    : 'w-2 bg-neutral-200'
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="btn-secondary"
              >
                Back
              </button>
            )}
            <button
              onClick={handleSkip}
              className="text-neutral-500 hover:text-neutral-700 px-4 py-2"
            >
              Skip
            </button>
            <button onClick={handleNext} className="btn-primary">
              {step === steps.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

