'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Loader2, MessageSquare, Bot, User } from 'lucide-react'
import { sendChatMessage, getChatHistory, ChatMessage } from '@/lib/api'
import BackendStatus from './BackendStatus'

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
      if (typeof window !== 'undefined') {
        const { cacheChatHistory } = await import('@/lib/storage')
        cacheChatHistory(history)
      }
    } catch (error: any) {
      console.error('Failed to load chat history:', error)
      if (typeof window !== 'undefined') {
        const { getCachedChatHistory } = await import('@/lib/storage')
        const cached = getCachedChatHistory()
        if (cached) {
          setMessages(cached)
        }
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
      const newMessages = [...messages, userMessage, response]
      setMessages(newMessages)
      if (typeof window !== 'undefined') {
        const { cacheChatHistory } = await import('@/lib/storage')
        cacheChatHistory(newMessages)
      }
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
    <div className="max-w-5xl mx-auto">
      <BackendStatus />
      <div className="card-elevated h-[calc(100vh-250px)] flex flex-col">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-neutral-200">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-lg">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">StudyBudds Chat</h2>
            <p className="text-sm text-neutral-500">Ask Lumio anything about your materials</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2">
          {messages.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Bot className="h-10 w-10 text-primary" />
              </div>
              <p className="text-lg font-semibold text-neutral-900 mb-2">Start a conversation</p>
              <p className="text-neutral-500">Ask questions and get answers with citations</p>
            </div>
          ) : (
            messages.map(message => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-primary to-primary-600'
                    : 'bg-gradient-to-br from-accent to-accent-600'
                } shadow-md`}>
                  {message.role === 'user' ? (
                    <User className="h-5 w-5 text-white" />
                  ) : (
                    <Bot className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className={`flex-1 rounded-2xl p-4 shadow-md ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-primary to-primary-600 text-white'
                    : 'bg-white border-2 border-primary-100 text-neutral-900'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  {message.citations && message.citations.length > 0 && (
                    <div className={`mt-3 pt-3 border-t ${message.role === 'user' ? 'border-white/30' : 'border-neutral-200'}`}>
                      <p className={`text-xs font-semibold mb-2 ${message.role === 'user' ? 'text-white/90' : 'text-neutral-700'}`}>Sources:</p>
                      <ul className="text-xs space-y-1">
                        {message.citations.map((citation, idx) => (
                          <li key={idx} className={message.role === 'user' ? 'text-white/80' : 'text-neutral-600'}>
                            • {citation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p className={`text-xs mt-3 ${message.role === 'user' ? 'text-white/70' : 'text-neutral-400'}`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-600 flex items-center justify-center shadow-md">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-white border-2 border-primary-100 rounded-2xl p-4 shadow-md">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex space-x-3 pt-4 border-t border-neutral-200">
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
            className="btn-primary px-6"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  )
}
