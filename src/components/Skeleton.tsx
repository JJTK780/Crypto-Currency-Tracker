interface SkeletonProps {
  className: string
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div className="animate-pulse">
      <div className={`rounded-md bg-gray-200 dark:bg-gray-800 ${className}`} />
    </div>
  )
}
