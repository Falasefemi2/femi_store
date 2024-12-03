"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { Header } from "@/components/ui/Header";

export default function Home() {
  const {userId} = useAuth()
  const userInfo = useQuery(api.users.readUser, {
    userId: userId!
  });
  const allProducts = useQuery(api.products.readAllProducts);
  console.log({allProducts})

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   {JSON.stringify(userInfo, null, 2)}
    //   <div className="flex min-h-screen flex-col items-center justify-between p-24">
    //   {!allProducts && <p>Loading products...</p>}
    //   {allProducts && allProducts.length > 0 ? (
    //     <div>
    //       {allProducts.map((product, index) => (
    //         <div key={`${product.id}-${index}`}>
    //           <h2>{product.title}</h2>
    //           <p>{product.price}</p>
    //         </div>
    //       ))}
    //     </div>
    //   ) : (
    //     <p>No products available.</p>
    //   )}
    // </div>

    // </main>
    <main>
      <Header />
    </main>
  );
}
