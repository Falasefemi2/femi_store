import { Skeleton } from "@/components/ui/skeleton"

export default function ProductGridSkeleton() {
  return (
    <div className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-3 mt-8">
      {/* Large product skeleton */}
      <div className="md:col-span-2">
        <Skeleton className="h-[600px] w-full rounded-lg" />
      </div>

      {/* Right column with two smaller product skeletons */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-[290px] w-full rounded-lg" />
        <Skeleton className="h-[290px] w-full rounded-lg" />
      </div>
    </div>
  )
}

