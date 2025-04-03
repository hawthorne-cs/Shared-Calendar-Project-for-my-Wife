"use client"

import { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import { MessageCircleIcon, PlusIcon, SendIcon } from '@/components/icons'

// Mock conversations data
const conversations = [
  {
    id: '1',
    user: {
      id: '101',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      status: 'online',
      statusColor: 'bg-[#3ba55c]'
    },
    lastMessage: 'Are we still meeting tomorrow?',
    time: '5:42 PM',
    unread: 2
  },
  {
    id: '2',
    user: {
      id: '102',
      name: 'Mike Thompson',
      avatar: 'MT',
      status: 'idle',
      statusColor: 'bg-[#faa61a]'
    },
    lastMessage: 'I sent you the calendar invite',
    time: '2:15 PM',
    unread: 0
  },
  {
    id: '3',
    user: {
      id: '103',
      name: 'Alex Wong',
      avatar: 'AW',
      status: 'offline',
      statusColor: 'bg-[#747f8d]'
    },
    lastMessage: 'Thanks for the update!',
    time: 'Yesterday',
    unread: 0
  },
  {
    id: '4',
    user: {
      id: '104',
      name: 'Emily Chen',
      avatar: 'EC',
      status: 'dnd',
      statusColor: 'bg-[#ed4245]'
    },
    lastMessage: 'Let me check my schedule',
    time: 'Yesterday',
    unread: 0
  }
]

// Mock messages for the selected conversation
const mockMessages = [
  {
    id: '1',
    sender: {
      id: '101',
      name: 'Sarah Johnson',
      avatar: 'SJ'
    },
    content: "Hey there! Just wanted to check if we're still on for tomorrow's meeting?",
    time: '5:30 PM',
    isMine: false
  },
  {
    id: '2',
    sender: {
      id: 'me',
      name: 'Me',
      avatar: 'ME'
    },
    content: 'Hi Sarah! Yes, we\'re still on for tomorrow at 10 AM.',
    time: '5:35 PM',
    isMine: true
  },
  {
    id: '3',
    sender: {
      id: '101',
      name: 'Sarah Johnson',
      avatar: 'SJ'
    },
    content: 'Great! Do you have the agenda prepared?',
    time: '5:38 PM',
    isMine: false
  },
  {
    id: '4',
    sender: {
      id: 'me',
      name: 'Me',
      avatar: 'ME'
    },
    content: 'I\'m still working on it. I\'ll share it with you later tonight.',
    time: '5:40 PM',
    isMine: true
  },
  {
    id: '5',
    sender: {
      id: '101',
      name: 'Sarah Johnson',
      avatar: 'SJ'
    },
    content: 'Are we still meeting tomorrow?',
    time: '5:42 PM',
    isMine: false
  }
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState(mockMessages)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv => 
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim()) return
    
    const newMsg = {
      id: `new-${Date.now()}`,
      sender: {
        id: 'me',
        name: 'Me',
        avatar: 'ME',
      },
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    }
    
    setMessages([...messages, newMsg])
    setNewMessage('')
  }

  return (
    <AppShell>
      <div className="flex h-full overflow-hidden">
        {/* Conversations sidebar */}
        <div className="w-80 border-r border-[#202225] bg-[#2f3136] flex flex-col">
          <div className="p-4 border-b border-[#202225]">
            <h1 className="text-lg font-semibold text-white mb-2">Messages</h1>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-[#202225] border border-[#36393f] rounded-md text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
              />
              <div className="absolute left-3 top-2.5 text-[#b9bbbe]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              <div className="p-2">
                {filteredConversations.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full flex items-center p-3 mb-1 rounded-md transition-colors ${
                      selectedConversation?.id === conv.id 
                        ? 'bg-[#393c43]' 
                        : 'hover:bg-[#36393f]'
                    }`}
                  >
                    <div className="relative mr-3 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-medium">
                        {conv.user.avatar}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#2f3136] ${conv.user.statusColor}`}></div>
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex justify-between">
                        <p className="font-medium text-white truncate">{conv.user.name}</p>
                        <span className="text-xs text-[#b9bbbe]">{conv.time}</span>
                      </div>
                      <p className="text-sm text-[#b9bbbe] truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="ml-2 bg-[#ed4245] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {conv.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-[#36393f] flex items-center justify-center mb-4">
                  <MessageCircleIcon className="w-8 h-8 text-[#b9bbbe]" />
                </div>
                <p className="text-[#b9bbbe] mb-2">No conversations found</p>
                <p className="text-sm text-[#72767d]">
                  {searchQuery 
                    ? `No results for "${searchQuery}"`
                    : "You don't have any conversations yet"}
                </p>
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-[#202225]">
            <button className="w-full flex items-center justify-center px-4 py-2 bg-[#3ba55c] text-white rounded-md hover:bg-[#359951] transition-colors">
              <PlusIcon className="w-5 h-5 mr-2" />
              New Message
            </button>
          </div>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-[#36393f]">
          {selectedConversation ? (
            <>
              {/* Chat header */}
              <div className="flex items-center p-4 border-b border-[#202225] h-16 flex-shrink-0">
                <div className="relative mr-3">
                  <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-medium">
                    {selectedConversation.user.avatar}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#36393f] ${selectedConversation.user.statusColor}`}></div>
                </div>
                <div>
                  <h2 className="font-semibold text-white">{selectedConversation.user.name}</h2>
                  <p className="text-xs text-[#b9bbbe]">
                    {selectedConversation.user.status === 'online' && 'Online'}
                    {selectedConversation.user.status === 'idle' && 'Idle'}
                    {selectedConversation.user.status === 'dnd' && 'Do Not Disturb'}
                    {selectedConversation.user.status === 'offline' && 'Offline'}
                  </p>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[80%] ${message.isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                      {!message.isMine && (
                        <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-medium mr-2">
                          {message.sender.avatar}
                        </div>
                      )}
                      <div>
                        {!message.isMine && (
                          <div className="flex items-center mb-1">
                            <span className="text-white text-sm font-medium">{message.sender.name}</span>
                            <span className="text-xs text-[#b9bbbe] ml-2">{message.time}</span>
                          </div>
                        )}
                        <div 
                          className={`p-3 rounded-lg ${
                            message.isMine 
                              ? 'bg-[#5865f2] text-white' 
                              : 'bg-[#2f3136] text-white'
                          }`}
                        >
                          {message.content}
                        </div>
                        {message.isMine && (
                          <div className="flex items-center justify-end mt-1">
                            <span className="text-xs text-[#b9bbbe]">{message.time}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t border-[#202225]">
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Message ${selectedConversation.user.name}`}
                    className="flex-1 px-4 py-3 bg-[#40444b] border-none rounded-md text-white placeholder-[#72767d] focus:outline-none"
                  />
                  <button 
                    type="submit"
                    disabled={!newMessage.trim()}
                    className={`ml-2 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      newMessage.trim() 
                        ? 'bg-[#5865f2] text-white hover:bg-[#4752c4]' 
                        : 'bg-[#2f3136] text-[#72767d]'
                    }`}
                  >
                    <SendIcon className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 rounded-full bg-[#2f3136] flex items-center justify-center mb-4">
                <MessageCircleIcon className="w-10 h-10 text-[#b9bbbe]" />
              </div>
              <h2 className="text-white text-xl font-semibold mb-2">Your Messages</h2>
              <p className="text-[#b9bbbe] mb-4 text-center max-w-sm">
                Select a conversation or start a new one to begin messaging
              </p>
              <button className="flex items-center px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors">
                <PlusIcon className="w-5 h-5 mr-2" />
                New Message
              </button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
} 