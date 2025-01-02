
// src/app/page.tsx
"use client"
import { SessionProvider } from "next-auth/react"
import Auth from "../components/auth"
import Todo from '../components/todo'

export default function Home() {
  return(<SessionProvider>
    <Auth />
  </SessionProvider>) 
}