import Link from 'next/link'
import { CalendarIcon, UsersIcon, BellIcon } from '@/components/icons'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#36393f]">
      {/* Header */}
      <header className="border-b border-[#202225] bg-[#2f3136] py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-white">
              CJ's Calendars
            </span>
          </div>
          <div className="flex space-x-3">
            <Link 
              href="/login" 
              className="px-4 py-2 rounded-md bg-[#2f3136] text-white hover:bg-[#40444b] transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 rounded-md bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 border-b border-[#202225]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="h-1 w-12 bg-[#5865f2] rounded-full mr-4"></div>
                <span className="text-[#5865f2] font-medium">PLAN TOGETHER</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Share calendars like <span className="text-[#5865f2]">never before</span>
        </h1>
              <p className="text-lg text-[#b9bbbe]">
                A Discord-inspired platform where friends, couples, and groups can share schedules, 
                collaborate on events, and stay connected without the hassle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/signup" 
                  className="px-6 py-3 rounded-md bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors flex items-center justify-center font-medium"
                >
            Get Started
                </Link>
                <Link 
                  href="/features" 
                  className="px-6 py-3 rounded-md bg-[#4f545c] text-white hover:bg-[#40444b] transition-colors flex items-center justify-center font-medium"
                >
                  See Features
                </Link>
              </div>
            </div>
            <div className="relative p-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#5865f2] to-[#eb459e] rounded-2xl blur-xl opacity-20"></div>
              <div className="relative bg-[#2f3136] rounded-xl shadow-lg overflow-hidden border border-[#202225]">
                <div className="aspect-video bg-[#36393f] p-4">
                  <div className="h-full border-2 border-dashed border-[#40444b] rounded-lg flex flex-col items-center justify-center">
                    <CalendarIcon className="w-16 h-16 text-[#b9bbbe] mb-4" />
                    <p className="text-[#b9bbbe] text-center">
                      Calendar preview image
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-[#2f3136]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white inline-block relative">
              Why Choose CJ's Calendars?
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-[#5865f2] rounded-full"></div>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#36393f] p-6 rounded-lg border border-[#202225] hover:bg-[#40444b] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#5865f2] bg-opacity-20 flex items-center justify-center mb-5 group-hover:bg-opacity-30 transition-colors">
                <CalendarIcon className="w-6 h-6 text-[#5865f2]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">CJ's CALENDARS</h3>
              <p className="text-[#b9bbbe]">
                Create and share multiple calendars with friends, family, or colleagues with flexible permission settings.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-[#36393f] p-6 rounded-lg border border-[#202225] hover:bg-[#40444b] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#5865f2] bg-opacity-20 flex items-center justify-center mb-5 group-hover:bg-opacity-30 transition-colors">
                <UsersIcon className="w-6 h-6 text-[#5865f2]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Group Planning</h3>
              <p className="text-[#b9bbbe]">
                Collaborate on event planning with intuitive tools, group polls, and real-time updates for all members.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-[#36393f] p-6 rounded-lg border border-[#202225] hover:bg-[#40444b] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#5865f2] bg-opacity-20 flex items-center justify-center mb-5 group-hover:bg-opacity-30 transition-colors">
                <BellIcon className="w-6 h-6 text-[#5865f2]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Smart Notifications</h3>
              <p className="text-[#b9bbbe]">
                Stay updated with customizable reminders and real-time notifications directly in your preferred channels.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#36393f] border-t border-[#202225]">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-[#5865f2] bg-opacity-10 p-8 rounded-2xl border border-[#5865f2] border-opacity-20">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to start planning together?
            </h2>
            <p className="text-lg text-[#b9bbbe] mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already making plans the Discord way.
            </p>
            <Link 
              href="/signup" 
              className="px-8 py-3 rounded-md bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors inline-block text-lg font-medium"
            >
              Sign Up For Free
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#2f3136] border-t border-[#202225] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-white">
                  CJ's Calendars
                </span>
              </div>
              <p className="text-[#b9bbbe] max-w-xs">
                Making planning easier with a Discord-inspired interface that feels just like home.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-white mb-4 text-sm uppercase">Product</h3>
                <ul className="space-y-2">
                  <li><Link href="/features" className="text-[#b9bbbe] hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="/pricing" className="text-[#b9bbbe] hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="/integrations" className="text-[#b9bbbe] hover:text-white transition-colors">Integrations</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-white mb-4 text-sm uppercase">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="/blog" className="text-[#b9bbbe] hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/help" className="text-[#b9bbbe] hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="/tutorials" className="text-[#b9bbbe] hover:text-white transition-colors">Tutorials</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-white mb-4 text-sm uppercase">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-[#b9bbbe] hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="text-[#b9bbbe] hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/privacy" className="text-[#b9bbbe] hover:text-white transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#202225] mt-12 pt-8">
            <p className="text-[#b9bbbe] text-center text-sm">
              © {new Date().getFullYear()} CJ's Calendars. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      </div>
  )
} 