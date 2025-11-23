import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Check if API URL is a placeholder or invalid
const isValidApiUrl = API_URL && 
  !API_URL.includes('your-backend-url.com') && 
  API_URL !== 'http://localhost:8000' || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost')

const api = axios.create({
  baseURL: isValidApiUrl ? API_URL : '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
})

// Add request interceptor to handle missing backend gracefully
api.interceptors.request.use(
  (config) => {
    if (!isValidApiUrl) {
      return Promise.reject(new Error('Backend API not configured'))
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      return Promise.reject(new Error('Unable to connect to backend server. Please ensure the backend is running.'))
    }
    return Promise.reject(error)
  }
)

export interface Document {
  id: string
  filename: string
  file_type: string
  upload_date: string
  status: 'processing' | 'completed' | 'failed'
  text_content?: string
  page_count?: number
}

export interface Summary {
  id: string
  document_id: string
  content: string
  created_at: string
  type: 'exam' | 'lecture' | 'quick_review'
}

export interface Flashcard {
  id: string
  document_id: string
  front: string
  back: string
  created_at: string
}

export interface Quiz {
  id: string
  document_id: string
  questions: QuizQuestion[]
  created_at: string
}

export interface QuizQuestion {
  id: string
  question: string
  type: 'mcq' | 'true_false' | 'short_answer'
  options?: string[]
  correct_answer: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  citations?: string[]
  timestamp: string
}

export interface StudyPlan {
  id: string
  topics: StudyTopic[]
  created_at: string
}

export interface StudyTopic {
  id: string
  name: string
  difficulty: 'easy' | 'medium' | 'hard'
  priority: number
  estimated_time: number
  document_ids: string[]
}

// Helper function to check backend availability
export const checkBackendAvailable = async (): Promise<boolean> => {
  // For localhost, always allow (backend might not be running yet)
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    // Try to check if backend is available, but don't fail if it's not
    try {
      const response = await axios.get(`${API_URL}/`, { timeout: 2000 })
      return response.status === 200
    } catch {
      // Backend not running, but that's okay for localhost
      return false
    }
  }
  
  // For production, check if API URL is configured
  if (!isValidApiUrl) return false
  
  try {
    const response = await axios.get(`${API_URL}/`, { timeout: 5000 })
    return response.status === 200
  } catch {
    return false
  }
}

// Document APIs
export const uploadDocument = async (file: File): Promise<Document> => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await api.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const getDocuments = async (): Promise<Document[]> => {
  const response = await api.get('/documents')
  return response.data
}

export const getDocument = async (id: string): Promise<Document> => {
  const response = await api.get(`/documents/${id}`)
  return response.data
}

export const deleteDocument = async (id: string): Promise<void> => {
  await api.delete(`/documents/${id}`)
}

// Summary APIs
export const generateSummary = async (
  documentId: string,
  type: 'exam' | 'lecture' | 'quick_review' = 'lecture'
): Promise<Summary> => {
  const response = await api.post('/ai/summaries', {
    document_id: documentId,
    type,
  })
  return response.data
}

export const getSummaries = async (documentId?: string): Promise<Summary[]> => {
  const params = documentId ? { document_id: documentId } : {}
  const response = await api.get('/ai/summaries', { params })
  return response.data
}

// Flashcard APIs
export const generateFlashcards = async (documentId: string): Promise<Flashcard[]> => {
  const response = await api.post('/ai/flashcards', {
    document_id: documentId,
  })
  return response.data
}

export const getFlashcards = async (documentId?: string): Promise<Flashcard[]> => {
  const params = documentId ? { document_id: documentId } : {}
  const response = await api.get('/ai/flashcards', { params })
  return response.data
}

export const exportFlashcardsAnki = async (documentId?: string): Promise<Blob> => {
  const params = documentId ? { document_id: documentId } : {}
  const response = await api.get('/ai/flashcards/export/anki', {
    params,
    responseType: 'blob',
  })
  return response.data
}

// Quiz APIs
export const generateQuiz = async (
  documentId: string,
  questionCount: number = 10
): Promise<Quiz> => {
  const response = await api.post('/ai/quizzes', {
    document_id: documentId,
    question_count: questionCount,
  })
  return response.data
}

export const getQuizzes = async (documentId?: string): Promise<Quiz[]> => {
  const params = documentId ? { document_id: documentId } : {}
  const response = await api.get('/ai/quizzes', { params })
  return response.data
}

// Chat APIs
export const sendChatMessage = async (
  message: string,
  documentIds?: string[]
): Promise<ChatMessage> => {
  const response = await api.post('/ai/chat', {
    message,
    document_ids: documentIds,
  })
  return response.data
}

export const getChatHistory = async (): Promise<ChatMessage[]> => {
  const response = await api.get('/ai/chat/history')
  return response.data
}

// Study Plan APIs
export const generateStudyPlan = async (documentIds: string[]): Promise<StudyPlan> => {
  const response = await api.post('/ai/study-plans', {
    document_ids: documentIds,
  })
  return response.data
}

export const getStudyPlans = async (): Promise<StudyPlan[]> => {
  const response = await api.get('/ai/study-plans')
  return response.data
}

export default api
