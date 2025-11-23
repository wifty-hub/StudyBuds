'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, Loader2, Cloud } from 'lucide-react'
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
    } catch (error: any) {
      console.error('Upload error:', error)
      const errorMessage = error?.message?.includes('not configured') 
        ? 'Backend API not configured. Please set up your backend server.'
        : 'Upload failed. Please try again.'
      setUploadStatus(errorMessage)
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
    <div className="max-w-3xl mx-auto">
      <div className="card-elevated">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-lg">
            <Cloud className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-neutral-900">Upload Study Materials</h2>
            <p className="text-neutral-500">Drag and drop or click to upload</p>
          </div>
        </div>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-primary bg-gradient-to-br from-primary-50 to-primary-100 scale-105 shadow-xl'
              : 'border-neutral-300 hover:border-primary-400 hover:bg-primary-50/50'
          } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
              <p className="text-lg font-semibold text-neutral-700">{uploadStatus}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-6 shadow-lg">
                <Upload className="h-10 w-10 text-primary" />
              </div>
              <p className="text-xl font-bold text-neutral-900 mb-2">
                {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
              </p>
              <p className="text-base text-neutral-600 mb-6">or click to browse</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['PDF', 'DOCX', 'PNG', 'JPG'].map((format) => (
                  <span key={format} className="badge badge-primary">
                    {format}
                  </span>
                ))}
              </div>
              <p className="text-sm text-neutral-500 mt-4">Max file size: 50MB</p>
            </div>
          )}
        </div>

        {uploadStatus && !uploading && (
          <div className="mt-6 p-4 bg-accent-50 border-2 border-accent-200 rounded-xl text-neutral-800 flex items-center space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <p className="font-medium">{uploadStatus}</p>
          </div>
        )}
      </div>
    </div>
  )
}
