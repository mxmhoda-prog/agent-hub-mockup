import React, { useState } from 'react'
import { 
  MessageSquare, 
  Hash, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Plus,
  Search,
  Filter
} from 'lucide-react'

const SlackChannels = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [channels, setChannels] = useState([
    {
      id: 1,
      name: 'customer-support',
      displayName: 'Customer Support',
      status: 'active',
      members: 24,
      lastActivity: '2 min ago',
      description: 'Primary channel for customer support inquiries',
      notifications: 3
    },
    {
      id: 2,
      name: 'technical-issues',
      displayName: 'Technical Issues',
      status: 'busy',
      members: 18,
      lastActivity: '15 min ago',
      description: 'Escalated technical problems and bugs',
      notifications: 0
    },
    {
      id: 3,
      name: 'billing-support',
      displayName: 'Billing Support',
      status: 'active',
      members: 12,
      lastActivity: '1 hour ago',
      description: 'Billing and payment related support',
      notifications: 1
    },
    {
      id: 4,
      name: 'product-feedback',
      displayName: 'Product Feedback',
      status: 'away',
      members: 8,
      lastActivity: '3 hours ago',
      description: 'Customer product feedback and suggestions',
      notifications: 0
    },
    {
      id: 5,
      name: 'urgent-escalations',
      displayName: 'Urgent Escalations',
      status: 'active',
      members: 6,
      lastActivity: '5 min ago',
      description: 'High priority customer escalations',
      notifications: 2
    }
  ])

  const statusOptions = [
    { value: 'all', label: 'All Statuses', color: 'text-neutral-600' },
    { value: 'active', label: 'Active', color: 'text-green-600' },
    { value: 'busy', label: 'Busy', color: 'text-orange-600' },
    { value: 'away', label: 'Away', color: 'text-yellow-600' },
    { value: 'offline', label: 'Offline', color: 'text-red-600' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'busy':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'away':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'offline':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} />
      case 'busy':
        return <AlertCircle size={16} />
      case 'away':
        return <Clock size={16} />
      case 'offline':
        return <XCircle size={16} />
      default:
        return <MessageSquare size={16} />
    }
  }

  const updateChannelStatus = (channelId, newStatus) => {
    setChannels(channels.map(channel => 
      channel.id === channelId 
        ? { ...channel, status: newStatus }
        : channel
    ))
  }

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         channel.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || channel.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Slack Channels</h2>
          <p className="text-neutral-600 mt-1">Manage and update channel statuses across your workspace</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Channel</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tempo-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-neutral-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tempo-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value} className={option.color}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChannels.map((channel) => (
          <div key={channel.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-tempo-100 rounded-lg flex items-center justify-center">
                  <Hash className="text-tempo-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">#{channel.name}</h3>
                  <p className="text-sm text-neutral-500">{channel.displayName}</p>
                </div>
              </div>
              
              {channel.notifications > 0 && (
                <div className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {channel.notifications}
                </div>
              )}
            </div>

            <p className="text-sm text-neutral-600 mb-4">{channel.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Users size={16} className="text-neutral-400" />
                <span className="text-sm text-neutral-600">{channel.members} members</span>
              </div>
              <div className="text-xs text-neutral-500">{channel.lastActivity}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(channel.status)}`}>
                {getStatusIcon(channel.status)}
                <span className="capitalize">{channel.status}</span>
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={channel.status}
                  onChange={(e) => updateChannelStatus(channel.id, e.target.value)}
                  className="text-xs px-2 py-1 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-tempo-500"
                >
                  <option value="active">Active</option>
                  <option value="busy">Busy</option>
                  <option value="away">Away</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <MessageSquare className="text-tempo-600" size={20} />
            <span className="font-medium">Send Update to All</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Users className="text-tempo-600" size={20} />
            <span className="font-medium">Manage Members</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Clock className="text-tempo-600" size={20} />
            <span className="font-medium">Set Auto-Status</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SlackChannels