import Link from 'next/link'
import { CalendarIcon } from '@/components/icons'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-discord-900 dark:to-discord-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-discord-800 bg-white dark:bg-discord-900 shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-gray-900 dark:text-white">
              CJ's Calendars
            </span>
          </div>
          <div className="flex space-x-4">
            <Link href="/login" className="btn-ghost">
              Log in
            </Link>
            <Link href="/signup" className="btn-primary">
              Sign up
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                Share calendars and plan together
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                A cozy platform where friends, couples, and groups can share schedules, 
                collaborate on events, and stay connected.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/signup" className="btn-primary text-center">
                  Get Started
                </Link>
                <Link href="/features" className="btn-secondary text-center">
                  See Features
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white dark:bg-discord-800 rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-video bg-gray-100 dark:bg-discord-900 p-4">
                  <div className="h-full flex flex-col border-2 border-dashed border-gray-300 dark:border-discord-700 rounded-lg items-center justify-center">
                    <CalendarIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                      Calendar preview image here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-discord-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose CJ's Calendars?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-6">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                <CalendarIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Shared Calendars</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create and share multiple calendars with friends, family, or colleagues.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card p-6">
              <div className="w-12 h-12 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center mb-4">
                <CalendarIcon className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Group Planning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Collaborate on event planning with intuitive tools and group polls.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card p-6">
              <div className="w-12 h-12 rounded-full bg-accent-100 dark:bg-accent-900 flex items-center justify-center mb-4">
                <CalendarIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Smart Notifications</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Stay updated with customizable reminders and real-time notifications.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-discord-950">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to start planning together?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already making plans the easy way.
          </p>
          <Link href="/signup" className="btn-primary text-center px-8 py-3 text-lg inline-block">
            Sign Up For Free
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-discord-900 border-t border-gray-200 dark:border-discord-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl text-gray-900 dark:text-white">
                  CJ's Calendars
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                Making planning easier and more collaborative for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><Link href="/features" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Features</Link></li>
                  <li><Link href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Pricing</Link></li>
                  <li><Link href="/integrations" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Integrations</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Blog</Link></li>
                  <li><Link href="/help" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Help Center</Link></li>
                  <li><Link href="/tutorials" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Tutorials</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">About Us</Link></li>
                  <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Contact</Link></li>
                  <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-discord-800 mt-12 pt-8">
            <p className="text-gray-600 dark:text-gray-400 text-center">
              © {new Date().getFullYear()} Gatherly. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 