import React from "react"

interface SkeletonProps {
  width?: string | number
  height?: string | number
  circle?: boolean
  className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = 20, circle = false, className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${circle ? 'rounded-full' : 'rounded-md'} ${className}`}
      style={{ width, height }}
      aria-busy="true"
      aria-label="جاري التحميل"
    />
  )
}
