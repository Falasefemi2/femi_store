interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

import { query,action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// Fetch products from the Fake Store API
export const fetchProducts = action(
  async (ctx): Promise<{ success: boolean; result?: any; error?: string }> => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const fetchedProducts: FakeStoreProduct[] = await response.json();
      

      if (!Array.isArray(fetchedProducts) || fetchedProducts.length === 0) {
        throw new Error("No products found or invalid response");
      }

      const result = await ctx.runMutation(internal.products.insertProducts, {
        products: fetchedProducts
      });

      return { success: true, result };
    } catch (error) {
      console.error("Error in fetchProducts:", error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
);


export const insertProducts = internalMutation({
  args: {
    products: v.array(
      v.object({
        id: v.number(),
        title: v.string(),
        price: v.number(),
        description: v.string(),
        category: v.string(),
        image: v.string(),
        rating: v.object({
          rate: v.number(),
          count: v.number(),
        }),
      })
    ),
  },
  async handler(ctx, args) {
    try {
      console.log("Inserting products:", args.products);

      for (const product of args.products) {
        // Check if the product already exists in the database
        const existingProduct = await ctx.db
          .query("products")
          .filter((q) => q.eq(q.field("id"), product.id))
          .first();

        if (!existingProduct) {
          // Insert the product only if it does not already exist
          await ctx.db.insert("products", {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: product.rating,
          });
        }
      }
      return { success: true };
    } catch (error) {
      console.error("Error in insertProducts:", error);
      throw error;
    }
  },
});



export const readAllProducts = query({
  handler: async (ctx) => {
    try {
      const products = await ctx.db.query("products").collect();
      return products;
    } catch (error) {
      console.error("Error in readAllProducts:", error);
      throw error;
    }
  },
});

export const resetProducts = action({
  handler: async (ctx): Promise<{ success: boolean; error?: string }> => {
    try {
      // Use internal mutation to delete all products
      await ctx.runMutation(internal.products.deleteAllProducts);
      
      // Fetch new products from the Fake Store API
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const fetchedProducts: FakeStoreProduct[] = await response.json();

      if (!Array.isArray(fetchedProducts) || fetchedProducts.length === 0) {
        throw new Error("No products found or invalid response");
      }

      // Insert new products
      await ctx.runMutation(internal.products.insertProducts, {
        products: fetchedProducts
      });
      return { success: true };
    } catch (error) {
      console.error("Error in resetProducts:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : String(error) 
      };
    }
  }
});

// Add this to your products.ts file
export const deleteAllProducts = internalMutation({
  async handler(ctx) {
    const products = await ctx.db.query("products").collect();
    for (const product of products) {
      await ctx.db.delete(product._id);
    }
  }
});