import React, { useState } from 'react'
import { Search, Bell, Settings, HelpCircle, Menu } from 'lucide-react'

const Header = ({ activeTab, onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      slack: 'Slack Channels',
      announcements: 'Announcements & Updates',
      notes: 'Note Taker',
      timer: 'Hold Timer',
      sops: 'SOPs Directory',
      responses: 'Canned Response Navigator',
      performance: 'Performance Dashboard',
      profile: 'Profile Settings',
      flows: 'Decision Flows'
    }
    return titles[activeTab] || 'Dashboard'
  }

  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{getPageTitle()}</h1>
            <p className="text-sm text-neutral-500">Everything you need in one place</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search tools, SOPs, responses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tempo-500 focus:border-transparent"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-neutral-100 transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
              <HelpCircle size={20} />
            </button>
            
            <button className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
              <Settings size={20} />
            </button>
          </div>

          {/* Mobile Search */}
          <button className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <Search size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header