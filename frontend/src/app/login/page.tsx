"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CalendarIcon } from '@/components/icons'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Mock login for now - in a real app, you would call an API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Validate credentials (replace with actual authentication)
      if (email === 'user@example.com' && password === 'password') {
        // Success - redirect to dashboard
        router.push('/dashboard')
      } else {
        // Failed login
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#36393f] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#202225] bg-[#2f3136] py-4 sticky top-0">
        <div className="container mx-auto px-4 flex items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-white">
              CJ's Calendars
            </span>
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-[#2f3136] w-full max-w-md rounded-lg border border-[#202225] overflow-hidden">
          <div className="border-b border-[#202225] px-4 py-3">
            <h1 className="text-xl font-semibold text-white">Welcome back!</h1>
            <p className="text-[#b9bbbe] text-sm">We're so excited to see you again!</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="bg-[#f04747] bg-opacity-10 text-[#f04747] p-3 rounded-md border border-[#f04747] border-opacity-20 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-medium uppercase text-[#b9bbbe]">
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-[#202225] border border-[#36393f] rounded-md text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-xs font-medium uppercase text-[#b9bbbe]">
                  PASSWORD
                </label>
                <Link href="/forgot-password" className="text-xs text-[#5865f2] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-3 py-2 bg-[#202225] border border-[#36393f] rounded-md text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-2.5 rounded-md font-medium transition-colors ${
                loading 
                  ? 'bg-[#4752c4] text-[#b9bbbe]' 
                  : 'bg-[#5865f2] text-white hover:bg-[#4752c4]'
              }`}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <p className="text-sm text-[#b9bbbe] pt-2">
              Need an account?{' '}
              <Link href="/signup" className="text-[#5865f2] hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2f3136] border-t border-[#202225] py-4 text-center text-[#b9bbbe] text-sm">
        © {new Date().getFullYear()} CJ's Calendars. All rights reserved.
      </footer>
    </div>
  )
} 