"use client";

// import { useQuery } from "convex/react";
// import { api } from "../convex/_generated/api";
// import { useAuth } from "@clerk/nextjs";
import { Header } from "@/components/ui/Header";

export default function Home() {
  // const {userId} = useAuth()
  // const userInfo = useQuery(api.users.readUser, {
  //   userId: userId!
  // });
  // const allProducts = useQuery(api.products.readAllProducts);
  // console.log({allProducts})

  return (
    <main>
      <Header />
    </main>
  );
}
