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
import BackendStatus from './BackendStatus'

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
      if (typeof window !== 'undefined') {
        const { cacheDocuments } = await import('@/lib/storage')
        cacheDocuments(docs)
      }
    } catch (error: any) {
      console.error('Failed to load documents:', error)
      if (typeof window !== 'undefined') {
        const { getCachedDocuments } = await import('@/lib/storage')
        const cached = getCachedDocuments()
        if (cached) {
          setDocuments(cached)
        }
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
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <BackendStatus />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Documents List */}
        <div className="lg:col-span-1">
        <div className="card-elevated">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Documents</h2>
          </div>
          {documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map(doc => (
                <div
                  key={doc.id}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedDoc === doc.id
                      ? 'bg-gradient-to-r from-primary-50 to-primary-100 border-2 border-primary shadow-md'
                      : 'bg-white border-2 border-neutral-200 hover:border-primary-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedDoc(doc.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <FileText className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                        selectedDoc === doc.id ? 'text-primary' : 'text-neutral-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-neutral-900 truncate">{doc.filename}</p>
                        <p className="text-sm text-neutral-500 mt-1">
                          {doc.file_type} • {new Date(doc.upload_date).toLocaleDateString()}
                        </p>
                        <span className={`badge badge-${doc.status === 'completed' ? 'primary' : 'neutral'} mt-2`}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(doc.id)
                      }}
                      className="text-red-500 hover:text-red-700 ml-2 p-1 hover:bg-red-50 rounded-lg transition-colors"
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
            <div className="card-elevated">
              <h3 className="text-xl font-bold mb-6 text-neutral-900">Generate Study Materials</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Sparkles, label: 'Summary', action: () => selectedDoc && handleGenerateSummary(selectedDoc) },
                  { icon: Brain, label: 'Flashcards', action: () => selectedDoc && handleGenerateFlashcards(selectedDoc) },
                  { icon: BookOpen, label: 'Quiz', action: () => selectedDoc && handleGenerateQuiz(selectedDoc) },
                ].map(({ icon: Icon, label, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    disabled={generating !== null || !selectedDoc}
                    className="flex flex-col items-center p-6 rounded-xl border-2 border-neutral-200 hover:border-primary hover:bg-primary-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-primary-600 transition-all duration-200 shadow-md">
                      <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-200" />
                    </div>
                    <span className="font-semibold text-neutral-900">{label}</span>
                  </button>
                ))}
              </div>
              {generating && (
                <div className="mt-6 flex items-center justify-center space-x-3 text-primary">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="font-medium">Generating {generating}...</span>
                </div>
              )}
            </div>

            {/* Summaries */}
            {summaries.filter(s => s.document_id === selectedDoc).length > 0 && (
              <div className="card-elevated">
                <h3 className="text-xl font-bold mb-6 text-neutral-900 flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <span>Summaries</span>
                </h3>
                <div className="space-y-4">
                  {summaries
                    .filter(s => s.document_id === selectedDoc)
                    .map(summary => (
                      <div key={summary.id} className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200">
                        <p className="whitespace-pre-wrap text-neutral-900 leading-relaxed">{summary.content}</p>
                        <p className="text-xs text-neutral-500 mt-4">
                          {new Date(summary.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Flashcards */}
            {flashcards.filter(f => f.document_id === selectedDoc).length > 0 && (
              <div className="card-elevated">
                <h3 className="text-xl font-bold mb-6 text-neutral-900 flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-primary" />
                  <span>Flashcards</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {flashcards
                    .filter(f => f.document_id === selectedDoc)
                    .map(card => (
                      <div
                        key={card.id}
                        className="p-5 bg-white border-2 border-neutral-200 rounded-xl hover:border-primary hover:shadow-lg transition-all duration-200"
                      >
                        <div className="font-bold mb-3 text-neutral-900">{card.front}</div>
                        <div className="text-neutral-600 text-sm border-t border-neutral-200 pt-3">{card.back}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Quizzes */}
            {quizzes.filter(q => q.document_id === selectedDoc).length > 0 && (
              <div className="card-elevated">
                <h3 className="text-xl font-bold mb-6 text-neutral-900 flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span>Quizzes</span>
                </h3>
                <div className="space-y-6">
                  {quizzes
                    .filter(q => q.document_id === selectedDoc)
                    .map(quiz => (
                      <div key={quiz.id} className="space-y-4">
                        {quiz.questions.map((q, idx) => (
                          <div key={q.id} className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200">
                            <p className="font-bold text-neutral-900 mb-3">
                              {idx + 1}. {q.question}
                            </p>
                            {q.type === 'mcq' && q.options && (
                              <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                                {q.options.map((opt, optIdx) => (
                                  <li key={optIdx} className="text-neutral-700">{opt}</li>
                                ))}
                              </ul>
                            )}
                            <div className="pt-3 border-t border-primary-200">
                              <p className="text-sm font-semibold text-primary">
                                Answer: <span className="text-neutral-700">{q.correct_answer}</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="card-elevated text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <p className="text-lg font-semibold text-neutral-900 mb-2">Select a document</p>
            <p className="text-neutral-500">Choose a document to generate study materials</p>
          </div>
        )}
      </div>
    </div>
  )
}
