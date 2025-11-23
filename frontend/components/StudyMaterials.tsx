'use client'

import { useState, useEffect } from 'react'
import { BookOpen, FileText, Sparkles, Brain, Trash2, Loader2 } from 'lucide-react'
import {
  getDocuments,
  deleteDocument,
  generateSummary,
  generateFlashcards,
  generateQuiz,
  Document,
  Summary,
  Flashcard,
  Quiz,
} from '@/lib/api'

export default function StudyMaterials() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [summaries, setSummaries] = useState<Summary[]>([])
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [generating, setGenerating] = useState<string | null>(null)

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const docs = await getDocuments()
      setDocuments(docs)
      // Cache documents for offline access
      if (typeof window !== 'undefined') {
        const { cacheDocuments } = await import('@/lib/storage')
        cacheDocuments(docs)
      }
    } catch (error: any) {
      console.error('Failed to load documents:', error)
      // Try to load from cache if backend fails
      if (typeof window !== 'undefined') {
        const { getCachedDocuments } = await import('@/lib/storage')
        const cached = getCachedDocuments()
        if (cached) {
          setDocuments(cached)
        }
      }
      // Don't show error if backend isn't configured - this is expected
      if (!error?.message?.includes('not configured')) {
        // Could show a toast notification here if needed
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return
    try {
      await deleteDocument(id)
      setDocuments(docs => docs.filter(d => d.id !== id))
      if (selectedDoc === id) {
        setSelectedDoc(null)
        setSummaries([])
        setFlashcards([])
        setQuizzes([])
      }
    } catch (error) {
      console.error('Failed to delete document:', error)
    }
  }

  const handleGenerateSummary = async (docId: string) => {
    setGenerating('summary')
    try {
      const summary = await generateSummary(docId, 'lecture')
      setSummaries(prev => [...prev, summary])
    } catch (error) {
      console.error('Failed to generate summary:', error)
      alert('Failed to generate summary. Please try again.')
    } finally {
      setGenerating(null)
    }
  }

  const handleGenerateFlashcards = async (docId: string) => {
    setGenerating('flashcards')
    try {
      const cards = await generateFlashcards(docId)
      setFlashcards(prev => [...prev, ...cards])
    } catch (error) {
      console.error('Failed to generate flashcards:', error)
      alert('Failed to generate flashcards. Please try again.')
    } finally {
      setGenerating(null)
    }
  }

  const handleGenerateQuiz = async (docId: string) => {
    setGenerating('quiz')
    try {
      const quiz = await generateQuiz(docId, 10)
      setQuizzes(prev => [...prev, quiz])
    } catch (error) {
      console.error('Failed to generate quiz:', error)
      alert('Failed to generate quiz. Please try again.')
    } finally {
      setGenerating(null)
    }
  }

  const selectedDocument = documents.find(d => d.id === selectedDoc)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Documents List */}
      <div className="lg:col-span-1">
        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-neutral-900">Your Documents</h2>
          {documents.length === 0 ? (
            <p className="text-neutral-500 text-center py-8">No documents uploaded yet</p>
          ) : (
            <div className="space-y-2">
              {documents.map(doc => (
                <div
                  key={doc.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedDoc === doc.id
                      ? 'border-primary bg-primary-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                  onClick={() => setSelectedDoc(doc.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <FileText className="h-5 w-5 text-neutral-400 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-900 truncate">{doc.filename}</p>
                        <p className="text-sm text-neutral-500">
                          {doc.file_type} • {new Date(doc.upload_date).toLocaleDateString()}
                        </p>
                        <span
                          className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${
                            doc.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : doc.status === 'processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {doc.status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(doc.id)
                      }}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Generation */}
      <div className="lg:col-span-2">
        {selectedDocument ? (
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 text-neutral-900">
                Generate Study Materials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => selectedDoc && handleGenerateSummary(selectedDoc)}
                  disabled={generating !== null || !selectedDoc}
                  className="flex flex-col items-center p-4 border border-neutral-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="h-8 w-8 text-primary mb-2" />
                  <span className="font-medium">Summary</span>
                </button>
                <button
                  onClick={() => selectedDoc && handleGenerateFlashcards(selectedDoc)}
                  disabled={generating !== null || !selectedDoc}
                  className="flex flex-col items-center p-4 border border-neutral-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-colors disabled:opacity-50"
                >
                  <Brain className="h-8 w-8 text-primary mb-2" />
                  <span className="font-medium">Flashcards</span>
                </button>
                <button
                  onClick={() => selectedDoc && handleGenerateQuiz(selectedDoc)}
                  disabled={generating !== null || !selectedDoc}
                  className="flex flex-col items-center p-4 border border-neutral-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-colors disabled:opacity-50"
                >
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <span className="font-medium">Quiz</span>
                </button>
              </div>
              {generating && (
                <div className="mt-4 flex items-center justify-center text-primary">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span>Generating {generating}...</span>
                </div>
              )}
            </div>

            {/* Summaries */}
            {summaries.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold mb-4 text-neutral-900">Summaries</h3>
                <div className="space-y-4">
                  {summaries
                    .filter(s => s.document_id === selectedDoc)
                    .map(summary => (
                      <div key={summary.id} className="p-4 bg-primary-50 rounded-lg">
                        <div className="prose max-w-none">
                          <p className="whitespace-pre-wrap">{summary.content}</p>
                        </div>
                        <p className="text-xs text-neutral-500 mt-2">
                          {new Date(summary.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Flashcards */}
            {flashcards.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold mb-4 text-neutral-900">Flashcards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {flashcards
                    .filter(f => f.document_id === selectedDoc)
                    .map(card => (
                      <div
                        key={card.id}
                        className="p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="font-medium mb-2 text-neutral-900">{card.front}</div>
                        <div className="text-neutral-600 text-sm">{card.back}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Quizzes */}
            {quizzes.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold mb-4 text-neutral-900">Quizzes</h3>
                <div className="space-y-6">
                  {quizzes
                    .filter(q => q.document_id === selectedDoc)
                    .map(quiz => (
                      <div key={quiz.id} className="space-y-4">
                        {quiz.questions.map((q, idx) => (
                          <div key={q.id} className="p-4 bg-primary-50 rounded-lg">
                            <p className="font-medium mb-2">
                              {idx + 1}. {q.question}
                            </p>
                            {q.type === 'mcq' && q.options && (
                              <ul className="list-disc list-inside ml-4 space-y-1">
                                {q.options.map((opt, optIdx) => (
                                  <li key={optIdx} className="text-neutral-700">{opt}</li>
                                ))}
                              </ul>
                            )}
                            <p className="text-sm text-neutral-600 mt-2">
                              Answer: {q.correct_answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="card text-center py-12">
            <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-500">Select a document to generate study materials</p>
          </div>
        )}
      </div>
    </div>
  )
}

