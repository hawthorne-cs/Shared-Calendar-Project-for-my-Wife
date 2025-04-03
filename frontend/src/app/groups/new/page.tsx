"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/app-shell'
import { ChevronLeftIcon, UsersIcon } from '@/components/icons'

// Color options for group
const colorOptions = [
  { name: 'Blurple', value: 'bg-[#5865f2]' },
  { name: 'Green', value: 'bg-[#3ba55c]' },
  { name: 'Pink', value: 'bg-[#eb459e]' },
  { name: 'Yellow', value: 'bg-[#faa61a]' },
  { name: 'Red', value: 'bg-[#ed4245]' },
  { name: 'Purple', value: 'bg-[#9b59b6]' },
  { name: 'Teal', value: 'bg-[#1abc9c]' },
  { name: 'Orange', value: 'bg-[#e67e22]' }
]

// Emoji options for group avatar
const emojiOptions = [
  '👨‍💻', '👨‍👩‍👧‍👦', '🏔️', '📚', '🎮', '🎨', '🏋️', '🧑‍🍳', 
  '🎓', '🧩', '🎵', '🏆', '🧬', '⚽', '🌱', '💼'
]

export default function NewGroupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    visibility: 'private',
    emoji: '👨‍💻',
    color: 'bg-[#5865f2]'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEmojiSelect = (emoji: string) => {
    setFormData(prev => ({
      ...prev,
      emoji
    }))
  }

  const handleColorSelect = (color: string) => {
    setFormData(prev => ({
      ...prev,
      color
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Group name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Group name must be at least 3 characters'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
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
      
      // In a real app, you would call your API to create the group
      router.push('/groups')
    } catch (err) {
      setErrors({ form: 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppShell>
      <div className="p-6">
        <header className="mb-6">
          <div className="flex items-center mb-2">
            <Link 
              href="/groups"
              className="mr-3 p-2 rounded-full bg-[#36393f] hover:bg-[#40444b] text-[#b9bbbe] hover:text-white transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-bold text-white">Create a New Group</h1>
          </div>
          <p className="text-[#b9bbbe]">
            Create a group to share calendars and plan events together
          </p>
        </header>

        {/* Form */}
        <div className="max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.form && (
              <div className="bg-[#f04747] bg-opacity-10 text-[#f04747] p-4 rounded-md border border-[#f04747] border-opacity-20">
                {errors.form}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column - Basic info */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium uppercase text-[#b9bbbe]">
                    Group Name <span className="text-[#f04747]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter a group name"
                    className={`w-full px-3 py-2 bg-[#202225] border rounded-md text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2] ${
                      errors.name ? 'border-[#f04747]' : 'border-[#36393f]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-[#f04747] mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium uppercase text-[#b9bbbe]">
                    Description <span className="text-[#f04747]">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="What's this group about?"
                    rows={4}
                    className={`w-full px-3 py-2 bg-[#202225] border rounded-md text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2] resize-none ${
                      errors.description ? 'border-[#f04747]' : 'border-[#36393f]'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-xs text-[#f04747] mt-1">{errors.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="visibility" className="block text-sm font-medium uppercase text-[#b9bbbe]">
                    Visibility
                  </label>
                  <select
                    id="visibility"
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-[#202225] border border-[#36393f] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                  >
                    <option value="private">Private - Only invited members can join</option>
                    <option value="public">Public - Anyone with the link can join</option>
                  </select>
                </div>
              </div>

              {/* Right column - Customization */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium uppercase text-[#b9bbbe] mb-2">
                    Group Icon
                  </label>
                  <div className="p-4 bg-[#2f3136] rounded-md border border-[#202225]">
                    <div className="flex justify-center mb-4">
                      <div className={`w-20 h-20 rounded-xl ${formData.color} flex items-center justify-center text-4xl`}>
                        {formData.emoji}
                      </div>
                    </div>
                    <div className="grid grid-cols-8 gap-2">
                      {emojiOptions.map(emoji => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleEmojiSelect(emoji)}
                          className={`w-10 h-10 rounded-md flex items-center justify-center hover:bg-[#40444b] transition-colors ${
                            formData.emoji === emoji ? 'bg-[#40444b] ring-2 ring-[#5865f2]' : 'bg-[#36393f]'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium uppercase text-[#b9bbbe] mb-2">
                    Group Color
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorOptions.map(({ name, value }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleColorSelect(value)}
                        className={`h-12 rounded-md transition-all ${value} ${
                          formData.color === value ? 'ring-2 ring-white shadow-lg scale-105' : 'opacity-80 hover:opacity-100'
                        }`}
                        title={name}
                      >
                        {formData.color === value && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#202225] pt-6 flex justify-between">
              <Link
                href="/groups"
                className="px-4 py-2 rounded-md border border-[#36393f] text-[#b9bbbe] hover:bg-[#36393f] transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-md font-medium ${
                  loading ? 'bg-[#4752c4] text-[#b9bbbe]' : 'bg-[#5865f2] text-white hover:bg-[#4752c4]'
                } transition-colors`}
              >
                {loading ? 'Creating...' : 'Create Group'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  )
} 