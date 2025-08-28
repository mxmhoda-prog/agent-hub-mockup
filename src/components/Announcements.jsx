import React, { useState } from 'react'
import { 
  Megaphone, 
  Plus, 
  Search, 
  Filter, 
  Pin, 
  MessageSquare, 
  Eye, 
  Edit, 
  Trash2,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock
} from 'lucide-react'

const Announcements = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showNewForm, setShowNewForm] = useState(false)
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'System Maintenance Tonight',
      content: 'Scheduled maintenance will occur tonight from 2-4 AM EST. Some services may be temporarily unavailable.',
      category: 'maintenance',
      priority: 'high',
      author: 'Sarah Johnson',
      createdAt: '2 hours ago',
      isPinned: true,
      views: 45,
      comments: 3,
      status: 'active'
    },
    {
      id: 2,
      title: 'New Customer Portal Features',
      content: 'We\'ve added new self-service features to the customer portal including automated password reset and account verification.',
      category: 'feature',
      priority: 'medium',
      author: 'Mike Chen',
      createdAt: '1 day ago',
      isPinned: false,
      views: 128,
      comments: 12,
      status: 'active'
    },
    {
      id: 3,
      title: 'Holiday Schedule Update',
      content: 'Customer support will have reduced hours during the upcoming holiday weekend. Please check the schedule for specific times.',
      category: 'schedule',
      priority: 'medium',
      author: 'Lisa Rodriguez',
      createdAt: '2 days ago',
      isPinned: true,
      views: 89,
      comments: 7,
      status: 'active'
    },
    {
      id: 4,
      title: 'Updated Refund Policy',
      content: 'We\'ve updated our refund policy to better serve our customers. New policy takes effect next week.',
      category: 'policy',
      priority: 'high',
      author: 'David Kim',
      createdAt: '3 days ago',
      isPinned: false,
      views: 156,
      comments: 8,
      status: 'active'
    }
  ])

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    category: 'general',
    priority: 'medium'
  })

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'maintenance', label: 'System Maintenance' },
    { value: 'feature', label: 'New Features' },
    { value: 'schedule', label: 'Schedule Changes' },
    { value: 'policy', label: 'Policy Updates' },
    { value: 'general', label: 'General' }
  ]

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
  ]

  const getPriorityColor = (priority) => {
    const found = priorities.find(p => p.value === priority)
    return found ? found.color : 'bg-neutral-100 text-neutral-800'
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'maintenance':
        return <AlertTriangle size={16} />
      case 'feature':
        return <CheckCircle size={16} />
      case 'schedule':
        return <Clock size={16} />
      case 'policy':
        return <Info size={16} />
      default:
        return <Megaphone size={16} />
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const announcement = {
      id: Date.now(),
      ...newAnnouncement,
      author: 'John Doe',
      createdAt: 'Just now',
      isPinned: false,
      views: 0,
      comments: 0,
      status: 'active'
    }
    setAnnouncements([announcement, ...announcements])
    setNewAnnouncement({ title: '', content: '', category: 'general', priority: 'medium' })
    setShowNewForm(false)
  }

  const togglePin = (id) => {
    setAnnouncements(announcements.map(announcement =>
      announcement.id === id 
        ? { ...announcement, isPinned: !announcement.isPinned }
        : announcement
    ))
  }

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id))
  }

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || announcement.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.isPinned)
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.isPinned)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Announcements & Updates</h2>
          <p className="text-neutral-600 mt-1">Share important information with your team</p>
        </div>
        <button 
          onClick={() => setShowNewForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Announcement</span>
        </button>
      </div>

      {/* New Announcement Form */}
      {showNewForm && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">New Announcement</h3>
            <button 
              onClick={() => setShowNewForm(false)}
              className="text-neutral-500 hover:text-neutral-700"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Title</label>
              <input
                type="text"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                className="input-field"
                placeholder="Enter announcement title"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Content</label>
              <textarea
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                className="input-field"
                rows={4}
                placeholder="Enter announcement content"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                <select
                  value={newAnnouncement.category}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, category: e.target.value})}
                  className="input-field"
                >
                  {categories.slice(1).map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Priority</label>
                <select
                  value={newAnnouncement.priority}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                  className="input-field"
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowNewForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Post Announcement
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tempo-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-neutral-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tempo-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-2">
            <Pin className="text-tempo-600" size={20} />
            <span>Pinned Announcements</span>
          </h3>
          <div className="space-y-4">
            {pinnedAnnouncements.map((announcement) => (
              <AnnouncementCard 
                key={announcement.id}
                announcement={announcement}
                onTogglePin={togglePin}
                onDelete={deleteAnnouncement}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Announcements */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Announcements</h3>
        <div className="space-y-4">
          {regularAnnouncements.map((announcement) => (
            <AnnouncementCard 
              key={announcement.id}
              announcement={announcement}
              onTogglePin={togglePin}
              onDelete={deleteAnnouncement}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const AnnouncementCard = ({ announcement, onTogglePin, onDelete }) => {
  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
  ]

  const getPriorityColor = (priority) => {
    const found = priorities.find(p => p.value === priority)
    return found ? found.color : 'bg-neutral-100 text-neutral-800'
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'maintenance':
        return <AlertTriangle size={16} />
      case 'feature':
        return <CheckCircle size={16} />
      case 'schedule':
        return <Clock size={16} />
      case 'policy':
        return <Info size={16} />
      default:
        return <Megaphone size={16} />
    }
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-tempo-100 rounded-lg flex items-center justify-center">
            {getCategoryIcon(announcement.category)}
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900">{announcement.title}</h4>
            <div className="flex items-center space-x-3 mt-1">
              <span className="text-sm text-neutral-500">by {announcement.author}</span>
              <span className="text-sm text-neutral-500">•</span>
              <span className="text-sm text-neutral-500">{announcement.createdAt}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
            {announcement.priority}
          </span>
          
          <button
            onClick={() => onTogglePin(announcement.id)}
            className={`p-1 rounded ${announcement.isPinned ? 'text-tempo-600 bg-tempo-50' : 'text-neutral-400 hover:text-neutral-600'}`}
          >
            <Pin size={16} />
          </button>
        </div>
      </div>

      <p className="text-neutral-600 mb-4">{announcement.content}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-neutral-500">
          <span className="flex items-center space-x-1">
            <Eye size={16} />
            <span>{announcement.views}</span>
          </span>
          <span className="flex items-center space-x-1">
            <MessageSquare size={16} />
            <span>{announcement.comments}</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(announcement.id)}
            className="p-1 text-neutral-400 hover:text-red-600 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Announcements