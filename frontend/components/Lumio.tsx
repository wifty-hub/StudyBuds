'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface LumioProps {
  size?: number
  animated?: boolean
  variant?: 'default' | 'with-book' | 'with-tablet' | 'image'
  className?: string
}

export default function Lumio({
  size = 120,
  animated = false,
  variant = 'image',
  className = '',
}: LumioProps) {
  const [isBlinking, setIsBlinking] = useState(false)

  // Trigger blink animation periodically
  useEffect(() => {
    if (!animated) return

    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 200)
    }, 3000)

    return () => clearInterval(blinkInterval)
  }, [animated])

  const scale = size / 120

  // Use image variant if specified
  if (variant === 'image') {
    return (
      <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
        <Image
          src="/lumio.png"
          alt="Lumio the Owl"
          width={size}
          height={size}
          className="object-contain"
          priority
        />
      </div>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lightbulb plume */}
      <g transform={`translate(${60 * scale}, ${20 * scale})`}>
        <ellipse
          cx="0"
          cy="0"
          rx={15 * scale}
          ry={20 * scale}
          fill="#FFC857"
          opacity="0.9"
        />
        <ellipse
          cx="0"
          cy={5 * scale}
          rx={10 * scale}
          ry={12 * scale}
          fill="#FFF9E6"
        />
        {/* Light rays */}
        <g opacity="0.6">
          <line
            x1={-12 * scale}
            y1={-8 * scale}
            x2={-18 * scale}
            y2={-15 * scale}
            stroke="#FFC857"
            strokeWidth={1.5 * scale}
          />
          <line
            x1={12 * scale}
            y1={-8 * scale}
            x2={18 * scale}
            y2={-15 * scale}
            stroke="#FFC857"
            strokeWidth={1.5 * scale}
          />
          <line
            x1="0"
            y1={-18 * scale}
            x2="0"
            y2={-25 * scale}
            stroke="#FFC857"
            strokeWidth={1.5 * scale}
          />
        </g>
      </g>

      {/* Owl body */}
      <ellipse
        cx={60 * scale}
        cy={70 * scale}
        rx={35 * scale}
        ry={40 * scale}
        fill="#5966FF"
        className="transition-all duration-300"
      />

      {/* Belly */}
      <ellipse
        cx={60 * scale}
        cy={75 * scale}
        rx={25 * scale}
        ry={30 * scale}
        fill="#C9CFFF"
      />

      {/* Wings */}
      <ellipse
        cx={45 * scale}
        cy={70 * scale}
        rx={15 * scale}
        ry={25 * scale}
        fill="#7A84FF"
      />
      <ellipse
        cx={75 * scale}
        cy={70 * scale}
        rx={15 * scale}
        ry={25 * scale}
        fill="#7A84FF"
      />

      {/* Eyes */}
      <g>
        {/* Left eye */}
        <circle
          cx={50 * scale}
          cy={60 * scale}
          r={8 * scale}
          fill="#FAFAFF"
        />
        <circle
          cx={50 * scale}
          cy={60 * scale}
          r={5 * scale}
          fill="#1A1A1F"
          className={isBlinking ? 'opacity-0' : 'opacity-100 transition-opacity duration-150'}
        />
        <circle
          cx={52 * scale}
          cy={58 * scale}
          r={2 * scale}
          fill="#FAFAFF"
          className={isBlinking ? 'opacity-0' : 'opacity-100'}
        />

        {/* Right eye */}
        <circle
          cx={70 * scale}
          cy={60 * scale}
          r={8 * scale}
          fill="#FAFAFF"
        />
        <circle
          cx={70 * scale}
          cy={60 * scale}
          r={5 * scale}
          fill="#1A1A1F"
          className={isBlinking ? 'opacity-0' : 'opacity-100 transition-opacity duration-150'}
        />
        <circle
          cx={72 * scale}
          cy={58 * scale}
          r={2 * scale}
          fill="#FAFAFF"
          className={isBlinking ? 'opacity-0' : 'opacity-100'}
        />
      </g>

      {/* Beak */}
      <polygon
        points={`${60 * scale},${68 * scale} ${55 * scale},${75 * scale} ${65 * scale},${75 * scale}`}
        fill="#FFC857"
      />

      {/* Book or Tablet under wing */}
      {variant === 'with-book' && (
        <g transform={`translate(${75 * scale}, ${85 * scale}) rotate(15)`}>
          <rect
            x={-8 * scale}
            y={-5 * scale}
            width={16 * scale}
            height={10 * scale}
            rx={1 * scale}
            fill="#8C8C9E"
          />
          <line
            x1={-6 * scale}
            y1={-2 * scale}
            x2={6 * scale}
            y2={-2 * scale}
            stroke="#FAFAFF"
            strokeWidth={0.5 * scale}
          />
          <line
            x1={-6 * scale}
            y1={1 * scale}
            x2={6 * scale}
            y2={1 * scale}
            stroke="#FAFAFF"
            strokeWidth={0.5 * scale}
          />
        </g>
      )}

      {variant === 'with-tablet' && (
        <g transform={`translate(${75 * scale}, ${85 * scale}) rotate(15)`}>
          <rect
            x={-8 * scale}
            y={-5 * scale}
            width={16 * scale}
            height={10 * scale}
            rx={1 * scale}
            fill="#1A1A1F"
          />
          <rect
            x={-6 * scale}
            y={-3 * scale}
            width={12 * scale}
            height={6 * scale}
            rx={0.5 * scale}
            fill="#5966FF"
            opacity="0.3"
          />
          <circle
            cx={-5 * scale}
            cy={-1 * scale}
            r={1 * scale}
            fill="#FFC857"
          />
        </g>
      )}

      {/* Feet */}
      <ellipse
        cx={55 * scale}
        cy={105 * scale}
        rx={4 * scale}
        ry={3 * scale}
        fill="#FFC857"
      />
      <ellipse
        cx={65 * scale}
        cy={105 * scale}
        rx={4 * scale}
        ry={3 * scale}
        fill="#FFC857"
      />
    </svg>
  )
}

