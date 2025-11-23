'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, BookOpen, Loader2, Sparkles } from 'lucide-react'
import { generateStudyPlan, getStudyPlans, getDocuments, StudyPlan, Document } from '@/lib/api'

export default function StudyPlan() {
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])
  const [generating, setGenerating] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [plans, docs] = await Promise.all([getStudyPlans(), getDocuments()])
      setStudyPlans(plans)
      setDocuments(docs.filter(d => d.status === 'completed'))
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGeneratePlan = async () => {
    if (selectedDocs.length === 0) {
      alert('Please select at least one document')
      return
    }

    setGenerating(true)
    try {
      const plan = await generateStudyPlan(selectedDocs)
      setStudyPlans(prev => [plan, ...prev])
      setSelectedDocs([])
    } catch (error) {
      console.error('Failed to generate study plan:', error)
      alert('Failed to generate study plan. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const toggleDocument = (docId: string) => {
    setSelectedDocs(prev =>
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-neutral-100 text-neutral-800'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Generate New Plan */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-neutral-900">Create Study Plan</h2>
        
        {documents.length === 0 ? (
          <p className="text-neutral-500 text-center py-8">
            Upload and process documents first to create a study plan
          </p>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-neutral-900">
                Select Documents ({selectedDocs.length} selected)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {documents.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => toggleDocument(doc.id)}
                    className={`p-3 border-2 rounded-lg text-left transition-colors ${
                      selectedDocs.includes(doc.id)
                        ? 'border-primary bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <p className="font-medium text-sm">{doc.filename}</p>
                    <p className="text-xs text-neutral-500 mt-1">{doc.file_type}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGeneratePlan}
              disabled={selectedDocs.length === 0 || generating}
              className="btn-primary flex items-center space-x-2"
            >
              {generating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Generate Study Plan</span>
                </>
              )}
            </button>
          </>
        )}
      </div>

      {/* Study Plans List */}
      {studyPlans.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-neutral-900">Your Study Plans</h2>
          {studyPlans.map(plan => (
            <div key={plan.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-neutral-900">Study Plan</h3>
                <p className="text-sm text-neutral-500">
                  {new Date(plan.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-4">
                {plan.topics
                  .sort((a, b) => b.priority - a.priority)
                  .map((topic, idx) => (
                    <div
                      key={topic.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary font-semibold">
                            {idx + 1}
                          </div>
                          <h4 className="font-semibold text-neutral-900">{topic.name}</h4>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(
                            topic.difficulty
                          )}`}
                        >
                          {topic.difficulty}
                        </span>
                      </div>

                      <div className="ml-11 flex items-center space-x-4 text-sm text-neutral-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{topic.estimated_time} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="h-4 w-4" />
                          <span>Priority: {topic.priority}/10</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200">
                <p className="text-sm text-neutral-600">
                  Total estimated time:{' '}
                  <span className="font-semibold">
                    {Math.round(
                      plan.topics.reduce((sum, t) => sum + t.estimated_time, 0) / 60
                    )}{' '}
                    hours
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {studyPlans.length === 0 && (
        <div className="card text-center py-12">
          <Calendar className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-500">No study plans yet. Create one to get started!</p>
        </div>
      )}
    </div>
  )
}

