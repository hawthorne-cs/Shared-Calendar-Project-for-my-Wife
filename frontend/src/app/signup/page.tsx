"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CalendarIcon } from '@/components/icons'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid'
    }
    
    if (!formData.username) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would call your API to create the user
      // For now, just redirect to login
      router.push('/login?registered=true')
    } catch (err) {
      setErrors({ form: 'An error occurred. Please try again.' })
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

      {/* Signup Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-[#2f3136] w-full max-w-md rounded-lg border border-[#202225] overflow-hidden">
          <div className="border-b border-[#202225] px-4 py-3">
            <h1 className="text-xl font-semibold text-white">Create an account</h1>
            <p className="text-[#b9bbbe] text-sm">Join our calendar community!</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errors.form && (
              <div className="bg-[#f04747] bg-opacity-10 text-[#f04747] p-3 rounded-md border border-[#f04747] border-opacity-20 text-sm">
                {errors.form}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-medium uppercase text-[#b9bbbe]">
                EMAIL <span className="text-[#f04747]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className={`w-full px-3 py-2 bg-[#202225] border rounded-md text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2] ${
                  errors.email ? 'border-[#f04747]' : 'border-[#36393f]'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-[#f04747] mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="block text-xs font-medium uppercase text-[#b9bbbe]">
                USERNAME <span className="text-[#f04747]">*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
                className={`w-full px-3 py-2 bg-[#202225] border rounded-md text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2] ${
                  errors.username ? 'border-[#f04747]' : 'border-[#36393f]'
                }`}
              />
              {errors.username && (
                <p className="text-xs text-[#f04747] mt-1">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs font-medium uppercase text-[#b9bbbe]">
                PASSWORD <span className="text-[#f04747]">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                className={`w-full px-3 py-2 bg-[#202225] border rounded-md text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2] ${
                  errors.password ? 'border-[#f04747]' : 'border-[#36393f]'
                }`}
              />
              {errors.password && (
                <p className="text-xs text-[#f04747] mt-1">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-xs font-medium uppercase text-[#b9bbbe]">
                CONFIRM PASSWORD <span className="text-[#f04747]">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                className={`w-full px-3 py-2 bg-[#202225] border rounded-md text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2] ${
                  errors.confirmPassword ? 'border-[#f04747]' : 'border-[#36393f]'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-[#f04747] mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-2.5 rounded-md font-medium transition-colors ${
                  loading 
                    ? 'bg-[#4752c4] text-[#b9bbbe]' 
                    : 'bg-[#5865f2] text-white hover:bg-[#4752c4]'
                }`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            <p className="text-sm text-[#b9bbbe] pt-2">
              Already have an account?{' '}
              <Link href="/login" className="text-[#5865f2] hover:underline">
                Log In
              </Link>
            </p>

            <div className="text-xs text-[#72767d] border-t border-[#202225] pt-4 mt-4">
              By registering, you agree to our{' '}
              <Link href="/terms" className="text-[#5865f2] hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-[#5865f2] hover:underline">
                Privacy Policy
              </Link>.
            </div>
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