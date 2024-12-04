"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef } from "react";
import ProductCarouselSkeleton from "./product-carousel-skeleton";

export default function ProductCarousel() {
  const products = useQuery(api.products.readEightProduct);
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  useEffect(() => {
    // Reset autoplay on component mount
    plugin.current.reset();
  }, []);

  if (!products) return <ProductCarouselSkeleton />;

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-8 px-4">
      <Carousel
        className="w-full"
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
              <div className="p-2 border rounded-lg shadow-sm bg-white transition-all duration-300 hover:shadow-md">
                <div className="aspect-square relative overflow-hidden rounded-md">
                  <Image
                    src={product.image || "/placeholder-image.jpg"}
                    alt={product.title || "Product Image"}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="mt-2 text-sm font-medium text-center truncate">
                  {product.title || "Untitled"}
                </h3>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}

