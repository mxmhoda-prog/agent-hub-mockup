import React from 'react'
import { 
  MessageSquare, 
  Megaphone, 
  StickyNote, 
  Timer, 
  BookOpen, 
  MessageCircle, 
  BarChart3, 
  User, 
  GitBranch,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const Dashboard = () => {
  const quickActions = [
    { id: 'slack', label: 'Slack Channels', icon: MessageSquare, color: 'bg-blue-500', description: 'Update channel statuses' },
    { id: 'announcements', label: 'Announcements', icon: Megaphone, color: 'bg-orange-500', description: 'Post updates & news' },
    { id: 'notes', label: 'Note Taker', icon: StickyNote, color: 'bg-green-500', description: 'Quick note creation' },
    { id: 'timer', label: 'Hold Timer', icon: Timer, color: 'bg-purple-500', description: 'Track call hold times' },
    { id: 'sops', label: 'SOPs Directory', icon: BookOpen, color: 'bg-indigo-500', description: 'Access procedures' },
    { id: 'responses', label: 'Canned Responses', icon: MessageCircle, color: 'bg-pink-500', description: 'Quick response templates' },
  ]

  const recentActivity = [
    { id: 1, type: 'slack', message: 'Updated #customer-support channel status', time: '2 min ago', status: 'success' },
    { id: 2, type: 'announcement', message: 'Posted system maintenance notice', time: '15 min ago', status: 'success' },
    { id: 3, type: 'sop', message: 'Accessed refund procedure SOP', time: '1 hour ago', status: 'info' },
    { id: 4, type: 'response', message: 'Used "account verification" template', time: '2 hours ago', status: 'success' },
  ]

  const performanceMetrics = [
    { label: 'Today\'s Calls', value: '24', change: '+12%', trend: 'up' },
    { label: 'Avg Handle Time', value: '4m 32s', change: '-8%', trend: 'down' },
    { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up' },
    { label: 'SOPs Accessed', value: '18', change: '+5', trend: 'up' },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-500" size={16} />
      case 'info':
        return <AlertCircle className="text-blue-500" size={16} />
      default:
        return <Clock className="text-neutral-500" size={16} />
    }
  }

  const getActivityIcon = (type) => {
    const icons = {
      slack: MessageSquare,
      announcement: Megaphone,
      sop: BookOpen,
      response: MessageCircle,
    }
    const Icon = icons[type] || MessageSquare
    return <Icon size={16} />
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Welcome back, John! 👋</h2>
            <p className="text-neutral-600 mt-1">Here's what's happening in your Tempo Agent Hub today</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-500">Current Time</p>
            <p className="text-2xl font-mono font-bold text-tempo-600">
              {new Date().toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">{metric.label}</p>
                <p className="text-2xl font-bold text-neutral-900">{metric.value}</p>
              </div>
              <div className={`flex items-center space-x-1 ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp size={20} />
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="flex flex-col items-center p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-all duration-200 group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className="text-white" size={24} />
              </div>
              <span className="font-medium text-neutral-900 text-sm text-center">{action.label}</span>
              <span className="text-xs text-neutral-500 text-center mt-1">{action.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity & Quick Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50">
                <div className="text-neutral-400">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-900 truncate">{activity.message}</p>
                  <p className="text-xs text-neutral-500">{activity.time}</p>
                </div>
                {getStatusIcon(activity.status)}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tools */}
        <div className="card">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Tools</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Timer className="text-tempo-600" size={20} />
                <span className="font-medium">Start Hold Timer</span>
              </div>
              <span className="text-sm text-neutral-500">Quick start</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
              <div className="flex items-center space-x-3">
                <StickyNote className="text-tempo-600" size={20} />
                <span className="font-medium">New Note</span>
              </div>
              <span className="text-sm text-neutral-500">Create note</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
              <div className="flex items-center space-x-3">
                <MessageCircle className="text-tempo-600" size={20} />
                <span className="font-medium">Find Response</span>
              </div>
              <span className="text-sm text-neutral-500">Search templates</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
              <div className="flex items-center space-x-3">
                <BookOpen className="text-tempo-600" size={20} />
                <span className="font-medium">Browse SOPs</span>
              </div>
              <span className="text-sm text-neutral-500">View procedures</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard