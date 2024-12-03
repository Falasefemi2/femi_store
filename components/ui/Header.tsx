"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart } from 'lucide-react'
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const { user, isLoaded } = useUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-14 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-4">
                <Link
                  href="/"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  All
                </Link>
                <Link
                  href="/shirts"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Women's Clothing
                </Link>
                <Link
                  href="/stickers"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Men's Clothing
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex items-center space-x-4 md:space-x-6">
            <Link href="/" className="hidden md:flex">
              <span className="font-bold">FEMI STORE</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                All
              </Link>
              <Link
                href="/shirts"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Women Clothing
              </Link>
              <Link
                href="/stickers"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Men Clothing
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 md:w-[300px] lg:w-[500px]"
                />
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                0
              </Badge>
              <span className="sr-only">Shopping cart</span>
            </Button>

            {isLoaded && (
              <div className="flex items-center space-x-2">
                {!user ? (
                  <>
                    <SignInButton mode="modal">
                      <Button variant="ghost" size="sm">Sign in</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button size="sm">Sign up</Button>
                    </SignUpButton>
                  </>
                ) : (
                  <UserButton afterSignOutUrl="/" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}