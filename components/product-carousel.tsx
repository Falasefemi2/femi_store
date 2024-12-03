"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import ProductGridSkeleton from "./product-grid-skeleton";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

export default function ProductCarousel() {
    const products = useQuery(api.products.readEightProduct);

    if (!products) return <ProductGridSkeleton />;

    return (
        <div className="relative w-full max-w-lg mx-auto  mt-8">
            <Carousel className="w-full max-w-lg"       plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}>
                <CarouselContent className="flex gap-4">
                    {products.map((product) => (
                        <CarouselItem
                            key={product.id}
                            className="w-40 flex-shrink-0 flex-grow-0"
                        >
                            <div className="p-2 border rounded-lg shadow-sm bg-white">
                                <Image
                                    src={product.image || "/placeholder-image.jpg"}
                                    alt={product.title || "Product Image"}
                                    width={150}
                                    height={150}
                                    className="object-contain w-full h-40"
                                />
                                <h3 className="mt-2 text-sm font-medium text-center">
                                    {product.title || "Untitled"}
                                </h3>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
