'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, Loader2 } from 'lucide-react'
import { uploadDocument, Document } from '@/lib/api'

interface DocumentUploadProps {
  onSuccess?: () => void
}

export default function DocumentUpload({ onSuccess }: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    setUploading(true)
    setUploadStatus(`Uploading ${file.name}...`)

    try {
      const document = await uploadDocument(file)
      setUploadStatus(`Successfully uploaded ${file.name}! Processing...`)
      setTimeout(() => {
        setUploadStatus(null)
        setUploading(false)
        onSuccess?.()
      }, 2000)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('Upload failed. Please try again.')
      setUploading(false)
    }
  }, [onSuccess])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
    disabled: uploading,
  })

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-neutral-900">Upload Study Materials</h2>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary bg-primary-50'
            : 'border-neutral-300 hover:border-primary-400 hover:bg-primary-50'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-neutral-600">{uploadStatus}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-neutral-400 mb-4" />
            <p className="text-lg font-medium text-neutral-700 mb-2">
              {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
            </p>
            <p className="text-sm text-neutral-500 mb-4">or click to browse</p>
            <p className="text-xs text-neutral-400">
              Supports: PDF, DOCX, PNG, JPG (Max 50MB)
            </p>
          </div>
        )}
      </div>

      {uploadStatus && !uploading && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {uploadStatus}
        </div>
      )}
    </div>
  )
}

