import React, { useState } from 'react'
import { 
  MessageCircle, 
  Search, 
  Filter, 
  Plus, 
  Copy, 
  Edit, 
  Trash2, 
  Star,
  Tag,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'

const CannedResponses = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showNewForm, setShowNewForm] = useState(false)
  const [responses, setResponses] = useState([
    {
      id: 1,
      title: 'Account Verification Response',
      content: 'Thank you for contacting us. To help you with your account, I\'ll need to verify your identity. Please provide your full name, email address, and the last 4 digits of your account number.',
      category: 'verification',
      tags: ['verification', 'account', 'identity'],
      lastUsed: '2 hours ago',
      useCount: 45,
      rating: 4.8,
      isFavorite: true,
      author: 'Sarah Johnson',
      lastUpdated: '1 week ago'
    },
    {
      id: 2,
      title: 'Refund Process Explanation',
      content: 'I understand you\'d like to request a refund. Our refund process typically takes 5-7 business days to process. I\'ll need to gather some information from you to initiate the refund. Can you please provide your order number and the reason for the refund?',
      category: 'refunds',
      tags: ['refund', 'process', 'order'],
      lastUsed: '1 day ago',
      useCount: 23,
      rating: 4.6,
      isFavorite: false,
      author: 'Mike Chen',
      lastUpdated: '3 days ago'
    },
    {
      id: 3,
      title: 'Technical Issue Troubleshooting',
      content: 'I\'m sorry to hear you\'re experiencing technical difficulties. Let\'s troubleshoot this step by step. First, please try clearing your browser cache and cookies, then restart your browser. If the issue persists, please let me know what specific error message you\'re seeing.',
      category: 'technical',
      tags: ['technical', 'troubleshooting', 'browser'],
      lastUsed: '4 hours ago',
      useCount: 67,
      rating: 4.9,
      isFavorite: true,
      author: 'Lisa Rodriguez',
      lastUpdated: '2 weeks ago'
    },
    {
      id: 4,
      title: 'Billing Question Response',
      content: 'Thank you for your question about your billing. I can see your recent charges on your account. The charge you\'re referring to is for your monthly subscription renewal. Would you like me to explain the breakdown of your charges or help you with any billing adjustments?',
      category: 'billing',
      tags: ['billing', 'subscription', 'charges'],
      lastUsed: '6 hours ago',
      useCount: 34,
      rating: 4.7,
      isFavorite: false,
      author: 'David Kim',
      lastUpdated: '5 days ago'
    },
    {
      id: 5,
      title: 'Product Return Instructions',
      content: 'I\'d be happy to help you with your return. To process your return, please ensure the item is in its original condition with all packaging intact. You can initiate the return through your account dashboard or I can help you process it now. Do you have your order number handy?',
      category: 'returns',
      tags: ['returns', 'product', 'packaging'],
      lastUsed: '1 day ago',
      useCount: 28,
      rating: 4.5,
      isFavorite: false,
      author: 'Sarah Johnson',
      lastUpdated: '1 week ago'
    }
  ])

  const [newResponse, setNewResponse] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: ''
  })

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'verification', label: 'Account Verification' },
    { value: 'refunds', label: 'Refunds & Returns' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'returns', label: 'Product Returns' },
    { value: 'general', label: 'General Support' }
  ]

  const toggleFavorite = (id) => {
    setResponses(responses.map(response =>
      response.id === id 
        ? { ...response, isFavorite: !response.isFavorite }
        : response
    ))
  }

  const copyResponse = (content) => {
    navigator.clipboard.writeText(content)
  }

  const deleteResponse = (id) => {
    setResponses(responses.filter(response => response.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const response = {
      id: Date.now(),
      ...newResponse,
      tags: newResponse.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      lastUsed: 'Just now',
      useCount: 0,
      rating: 0,
      isFavorite: false,
      author: 'John Doe',
      lastUpdated: 'Just now'
    }
    setResponses([response, ...responses])
    setNewResponse({ title: '', content: '', category: 'general', tags: '' })
    setShowNewForm(false)
  }

  const filteredResponses = responses.filter(response => {
    const matchesSearch = response.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         response.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         response.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || response.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const favoriteResponses = filteredResponses.filter(response => response.isFavorite)
  const regularResponses = filteredResponses.filter(response => !response.isFavorite)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Canned Response Navigator</h2>
          <p className="text-neutral-600 mt-1">Quick access to pre-written response templates</p>
        </div>
        <button 
          onClick={() => setShowNewForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Response</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Responses</p>
              <p className="text-2xl font-bold text-neutral-900">{responses.length}</p>
            </div>
            <div className="w-12 h-12 bg-tempo-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="text-tempo-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Favorites</p>
              <p className="text-2xl font-bold text-neutral-900">{responses.filter(r => r.isFavorite).length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Uses</p>
              <p className="text-2xl font-bold text-neutral-900">{responses.reduce((total, r) => total + r.useCount, 0)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Avg Rating</p>
              <p className="text-2xl font-bold text-neutral-900">
                {(responses.reduce((total, r) => total + r.rating, 0) / responses.length).toFixed(1)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ThumbsUp className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* New Response Form */}
      {showNewForm && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">New Canned Response</h3>
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
                value={newResponse.title}
                onChange={(e) => setNewResponse({...newResponse, title: e.target.value})}
                className="input-field"
                placeholder="Enter response title"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Content</label>
              <textarea
                value={newResponse.content}
                onChange={(e) => setNewResponse({...newResponse, content: e.target.value})}
                className="input-field"
                rows={6}
                placeholder="Enter response content..."
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                <select
                  value={newResponse.category}
                  onChange={(e) => setNewResponse({...newResponse, category: e.target.value})}
                  className="input-field"
                >
                  {categories.slice(1).map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Tags</label>
                <input
                  type="text"
                  value={newResponse.tags}
                  onChange={(e) => setNewResponse({...newResponse, tags: e.target.value})}
                  className="input-field"
                  placeholder="tag1, tag2, tag3"
                />
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
                Save Response
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
              placeholder="Search responses by title, content, or tags..."
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

      {/* Favorite Responses */}
      {favoriteResponses.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-2">
            <Star className="text-yellow-500 fill-current" size={20} />
            <span>Favorite Responses</span>
          </h3>
          <div className="space-y-4">
            {favoriteResponses.map((response) => (
              <ResponseCard 
                key={response.id}
                response={response}
                onToggleFavorite={toggleFavorite}
                onCopy={copyResponse}
                onDelete={deleteResponse}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Responses */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">All Responses</h3>
        <div className="space-y-4">
          {regularResponses.map((response) => (
            <ResponseCard 
              key={response.id}
              response={response}
              onToggleFavorite={toggleFavorite}
              onCopy={copyResponse}
              onDelete={deleteResponse}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Star className="text-tempo-600" size={20} />
            <span className="font-medium">View Favorites</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Clock className="text-tempo-600" size={20} />
            <span className="font-medium">Recently Used</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <ThumbsUp className="text-tempo-600" size={20} />
            <span className="font-medium">Top Rated</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const ResponseCard = ({ response, onToggleFavorite, onCopy, onDelete }) => {
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-tempo-100 rounded-lg flex items-center justify-center">
            <MessageCircle className="text-tempo-600" size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900">{response.title}</h4>
            <div className="flex items-center space-x-3 mt-1">
              <span className="text-sm text-neutral-500">by {response.author}</span>
              <span className="text-sm text-neutral-500">•</span>
              <span className="text-sm text-neutral-500">{response.lastUpdated}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {response.category}
          </span>
          
          <button
            onClick={() => onToggleFavorite(response.id)}
            className={`p-1 rounded ${response.isFavorite ? 'text-yellow-500' : 'text-neutral-400 hover:text-neutral-600'}`}
          >
            <Star size={16} className={response.isFavorite ? 'fill-current' : ''} />
          </button>
        </div>
      </div>

      <p className="text-neutral-600 mb-4">{response.content}</p>

      {response.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {response.tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-neutral-100 text-neutral-700">
              <Tag size={10} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-neutral-500">
          <span className="flex items-center space-x-1">
            <Eye size={14} />
            <span>{response.useCount} uses</span>
          </span>
          <span className="flex items-center space-x-1">
            <ThumbsUp size={14} />
            <span>{response.rating}/5</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{response.lastUsed}</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onCopy(response.content)}
            className="p-2 bg-tempo-100 text-tempo-700 rounded-lg hover:bg-tempo-200 transition-colors"
            title="Copy response"
          >
            <Copy size={16} />
          </button>
          <button className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(response.id)}
            className="p-1 text-neutral-400 hover:text-red-600 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CannedResponses