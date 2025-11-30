/**
 * LocalStorage utilities for frontend state persistence
 */

const STORAGE_KEYS = {
  INTRO_DISMISSED: 'studybudds_intro_dismissed',
  ACTIVE_TAB: 'studybudds_active_tab',
  USER_PREFERENCES: 'studybudds_preferences',
  DOCUMENTS_CACHE: 'studybudds_documents_cache',
  CHAT_HISTORY_CACHE: 'studybudds_chat_history_cache',
} as const

export interface UserPreferences {
  theme?: 'light' | 'dark'
  defaultSummaryType?: 'exam' | 'lecture' | 'quick_review'
  autoSave?: boolean
}

class StorageManager {
  /**
   * Check if localStorage is available
   */
  private isAvailable(): boolean {
    if (typeof window === 'undefined') return false
    try {
      const test = '__storage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  /**
   * Get item from localStorage
   */
  get<T>(key: string, defaultValue: T): T {
    if (!this.isAvailable()) return defaultValue
    
    try {
      const item = localStorage.getItem(key)
      if (item === null) return defaultValue
      return JSON.parse(item) as T
    } catch {
      return defaultValue
    }
  }

  /**
   * Set item in localStorage
   */
  set<T>(key: string, value: T): boolean {
    if (!this.isAvailable()) return false
    
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  }

  /**
   * Remove item from localStorage
   */
  remove(key: string): boolean {
    if (!this.isAvailable()) return false
    
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  }

  /**
   * Clear all StudyBudds data
   */
  clearAll(): boolean {
    if (!this.isAvailable()) return false
    
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
      })
      return true
    } catch {
      return false
    }
  }
}

const storage = new StorageManager()

// Intro page state
export const getIntroDismissed = (): boolean => {
  return storage.get(STORAGE_KEYS.INTRO_DISMISSED, false)
}

export const setIntroDismissed = (dismissed: boolean): void => {
  storage.set(STORAGE_KEYS.INTRO_DISMISSED, dismissed)
}

// Active tab state
export const getActiveTab = (): 'upload' | 'materials' | 'chat' | 'plan' => {
  return storage.get(STORAGE_KEYS.ACTIVE_TAB, 'upload')
}

export const setActiveTab = (tab: 'upload' | 'materials' | 'chat' | 'plan'): void => {
  storage.set(STORAGE_KEYS.ACTIVE_TAB, tab)
}

// User preferences
export const getUserPreferences = (): UserPreferences => {
  return storage.get(STORAGE_KEYS.USER_PREFERENCES, {})
}

export const setUserPreferences = (prefs: UserPreferences): void => {
  storage.set(STORAGE_KEYS.USER_PREFERENCES, prefs)
}

// Cache management (for offline support)
export const cacheDocuments = (documents: any[]): void => {
  storage.set(STORAGE_KEYS.DOCUMENTS_CACHE, {
    data: documents,
    timestamp: Date.now(),
  })
}

export const getCachedDocuments = (): any[] | null => {
  const cached = storage.get<{ data: any[]; timestamp: number } | null>(
    STORAGE_KEYS.DOCUMENTS_CACHE,
    null
  )
  
  if (!cached) return null
  
  // Cache expires after 1 hour
  const CACHE_TTL = 60 * 60 * 1000
  if (Date.now() - cached.timestamp > CACHE_TTL) {
    storage.remove(STORAGE_KEYS.DOCUMENTS_CACHE)
    return null
  }
  
  return cached.data
}

export const cacheChatHistory = (history: any[]): void => {
  storage.set(STORAGE_KEYS.CHAT_HISTORY_CACHE, {
    data: history,
    timestamp: Date.now(),
  })
}

export const getCachedChatHistory = (): any[] | null => {
  const cached = storage.get<{ data: any[]; timestamp: number } | null>(
    STORAGE_KEYS.CHAT_HISTORY_CACHE,
    null
  )
  
  if (!cached) return null
  
  // Chat history cache doesn't expire
  return cached.data
}

export default storage



