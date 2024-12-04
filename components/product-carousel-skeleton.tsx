import { Skeleton } from "@/components/ui/skeleton"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function ProductCarouselSkeleton() {
  const skeletonItems = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-8 px-4">
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {skeletonItems.map((item) => (
            <CarouselItem key={item} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
              <div className="p-2 border rounded-lg shadow-sm">
                <div className="aspect-square relative overflow-hidden rounded-md">
                  <Skeleton className="absolute inset-0" />
                </div>
                <Skeleton className="mt-2 h-4 w-3/4 mx-auto" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  )
}

