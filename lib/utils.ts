import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Check if code is running on the client
export const isClient = typeof window !== "undefined"

// Safe window dimensions hook
export function getWindowDimensions() {
  if (!isClient) return { width: 0, height: 0 }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

