'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Loader2, MessageSquare } from 'lucide-react'
import { sendChatMessage, getChatHistory, ChatMessage } from '@/lib/api'

export default function StudyChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadHistory()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadHistory = async () => {
    try {
      const history = await getChatHistory()
      setMessages(history)
    } catch (error: any) {
      console.error('Failed to load chat history:', error)
      // Don't show error if backend isn't configured - this is expected
      if (!error?.message?.includes('not configured')) {
        // Could show a toast notification here if needed
      }
    } finally {
      setLoadingHistory(false)
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await sendChatMessage(input)
      setMessages(prev => [...prev, response])
    } catch (error: any) {
      console.error('Failed to send message:', error)
      const errorContent = error?.message?.includes('not configured')
        ? 'Backend API not configured. Please set up your backend server to use chat features.'
        : 'Sorry, I encountered an error. Please try again.'
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: errorContent,
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  if (loadingHistory) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="card max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      <div className="flex items-center space-x-2 mb-6 pb-4 border-b">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-neutral-900">StudyBudds Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-neutral-400" />
            <p>Start a conversation about your study materials</p>
            <p className="text-sm mt-2">Ask questions and get answers with citations</p>
          </div>
        ) : (
          messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-primary-50 text-neutral-900'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                {message.citations && message.citations.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-300">
                    <p className="text-xs font-medium mb-1">Sources:</p>
                    <ul className="text-xs space-y-1">
                      {message.citations.map((citation, idx) => (
                        <li key={idx}>• {citation}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="text-xs opacity-70 mt-2">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-primary-50 rounded-lg p-4">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your study materials..."
          className="input-field flex-1"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="btn-primary flex items-center space-x-2"
        >
          <Send className="h-5 w-5" />
          <span>Send</span>
        </button>
      </form>
    </div>
  )
}

