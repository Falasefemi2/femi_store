"use client"

import Image from "next/image"
import { useQuery } from "convex/react"
import { api } from "../convex/_generated/api"
import ProductGridSkeleton from "./product-grid-skeleton"


export default function ProductGrid() {
  const products = useQuery(api.products.readThreeProduct)

  if (!products) return <ProductGridSkeleton />
  if (products.length < 3) return null

  const [firstProduct, ...restProducts] = products

  return (
    <div className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-3 mt-8">
      {/* Large product tile */}
      <div className="md:col-span-2">
        <div className="group relative h-[600px] w-full overflow-hidden rounded-lg bg-black">
          <Image
            src={firstProduct.image}
            alt={firstProduct.title}
            fill
            className="object-contain transition duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="rounded-full bg-black/60 px-4 py-2 backdrop-blur-md">
              <h3 className="text-sm font-medium text-white">{firstProduct.title}</h3>
            </div>
            <div className="rounded-full bg-[#0066FF] px-4 py-2">
              <span className="text-sm font-medium text-white">
                ${firstProduct.price.toFixed(2)} USD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right column with two smaller products */}
      <div className="flex flex-col gap-4">
        {restProducts.map((product) => (
          <div
            key={product._id}
            className="group relative h-[290px] w-full overflow-hidden rounded-lg bg-black"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain transition duration-300 ease-in-out group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="rounded-full bg-black/60 px-4 py-2 backdrop-blur-md">
                <h3 className="text-sm font-medium text-white">{product.title}</h3>
              </div>
              <div className="rounded-full bg-[#0066FF] px-4 py-2">
                <span className="text-sm font-medium text-white">
                  ${product.price.toFixed(2)} USD
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

