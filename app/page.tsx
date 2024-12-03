import ProductGrid from "@/components/productCard";
import { Header } from "@/components/ui/Header";



export default function Home() { 
  return (
    <main className="container mx-auto px-4">
    <Header />
    <ProductGrid />
  </main>

  );
}
