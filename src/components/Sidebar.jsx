import React from 'react'
import { 
  LayoutDashboard, 
  MessageSquare, 
  Megaphone, 
  StickyNote, 
  Timer, 
  BookOpen, 
  MessageCircle, 
  BarChart3, 
  User, 
  GitBranch,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const Sidebar = ({ activeTab, onTabChange, collapsed, onToggleCollapse }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'slack', label: 'Slack Channels', icon: MessageSquare },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'notes', label: 'Note Taker', icon: StickyNote },
    { id: 'timer', label: 'Hold Timer', icon: Timer },
    { id: 'sops', label: 'SOPs Directory', icon: BookOpen },
    { id: 'responses', label: 'Canned Responses', icon: MessageCircle },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'flows', label: 'Decision Flows', icon: GitBranch },
  ]

  return (
    <div className={`bg-white border-r border-neutral-200 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-tempo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-semibold text-lg text-neutral-900">Tempo</span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-lg hover:bg-neutral-100 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-tempo-50 text-tempo-700 border-r-2 border-tempo-600'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <Icon size={20} />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-neutral-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-tempo-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">John Doe</p>
                <p className="text-xs text-neutral-500">Customer Success Agent</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar