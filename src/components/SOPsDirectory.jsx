import React, { useState } from 'react'
import { 
  BookOpen, 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Eye, 
  Star, 
  Clock,
  Tag,
  Folder,
  ChevronRight,
  Bookmark
} from 'lucide-react'

const SOPsDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sops, setSops] = useState([
    {
      id: 1,
      title: 'Customer Refund Process',
      description: 'Step-by-step guide for processing customer refunds including verification, approval, and processing steps.',
      category: 'refunds',
      tags: ['refund', 'billing', 'customer-service'],
      lastUpdated: '2 days ago',
      version: '2.1',
      author: 'Sarah Johnson',
      isBookmarked: true,
      views: 156,
      status: 'active',
      difficulty: 'intermediate'
    },
    {
      id: 2,
      title: 'Technical Issue Escalation',
      description: 'Protocol for escalating technical issues that cannot be resolved at the first level of support.',
      category: 'technical',
      tags: ['escalation', 'technical', 'support'],
      lastUpdated: '1 week ago',
      version: '1.8',
      author: 'Mike Chen',
      isBookmarked: false,
      views: 89,
      status: 'active',
      difficulty: 'advanced'
    },
    {
      id: 3,
      title: 'Account Verification Process',
      description: 'Standard procedure for verifying customer identity and account ownership during support calls.',
      category: 'security',
      tags: ['verification', 'security', 'identity'],
      lastUpdated: '3 days ago',
      version: '3.0',
      author: 'Lisa Rodriguez',
      isBookmarked: true,
      views: 234,
      status: 'active',
      difficulty: 'beginner'
    },
    {
      id: 4,
      title: 'Product Return Authorization',
      description: 'Complete workflow for authorizing product returns including condition assessment and shipping labels.',
      category: 'returns',
      tags: ['returns', 'shipping', 'authorization'],
      lastUpdated: '5 days ago',
      version: '2.3',
      author: 'David Kim',
      isBookmarked: false,
      views: 178,
      status: 'active',
      difficulty: 'intermediate'
    },
    {
      id: 5,
      title: 'Billing Dispute Resolution',
      description: 'Procedure for handling billing disputes including investigation, communication, and resolution steps.',
      category: 'billing',
      tags: ['billing', 'dispute', 'resolution'],
      lastUpdated: '1 day ago',
      version: '1.9',
      author: 'Sarah Johnson',
      isBookmarked: false,
      views: 67,
      status: 'active',
      difficulty: 'advanced'
    }
  ])

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'refunds', label: 'Refunds & Returns' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'security', label: 'Security & Verification' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'returns', label: 'Product Returns' }
  ]

  const difficulties = [
    { value: 'beginner', label: 'Beginner', color: 'bg-green-100 text-green-800' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'advanced', label: 'Advanced', color: 'bg-red-100 text-red-800' }
  ]

  const toggleBookmark = (id) => {
    setSops(sops.map(sop =>
      sop.id === id 
        ? { ...sop, isBookmarked: !sop.isBookmarked }
        : sop
    ))
  }

  const getDifficultyColor = (difficulty) => {
    const found = difficulties.find(d => d.value === difficulty)
    return found ? found.color : 'bg-neutral-100 text-neutral-800'
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'refunds':
        return <FileText size={16} />
      case 'technical':
        return <FileText size={16} />
      case 'security':
        return <FileText size={16} />
      case 'billing':
        return <FileText size={16} />
      case 'returns':
        return <FileText size={16} />
      default:
        return <FileText size={16} />
    }
  }

  const filteredSOPs = sops.filter(sop => {
    const matchesSearch = sop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sop.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || sop.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const bookmarkedSOPs = filteredSOPs.filter(sop => sop.isBookmarked)
  const regularSOPs = filteredSOPs.filter(sop => !sop.isBookmarked)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">SOPs Directory</h2>
          <p className="text-neutral-600 mt-1">Access standard operating procedures and best practices</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn-secondary flex items-center space-x-2">
            <Download size={20} />
            <span>Export All</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <BookOpen size={20} />
            <span>Create SOP</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total SOPs</p>
              <p className="text-2xl font-bold text-neutral-900">{sops.length}</p>
            </div>
            <div className="w-12 h-12 bg-tempo-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-tempo-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Bookmarked</p>
              <p className="text-2xl font-bold text-neutral-900">{sops.filter(sop => sop.isBookmarked).length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Bookmark className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Views</p>
              <p className="text-2xl font-bold text-neutral-900">{sops.reduce((total, sop) => total + sop.views, 0)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Recently Updated</p>
              <p className="text-2xl font-bold text-neutral-900">{sops.filter(sop => sop.lastUpdated.includes('day') && parseInt(sop.lastUpdated) <= 3).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search SOPs by title, description, or tags..."
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

      {/* Bookmarked SOPs */}
      {bookmarkedSOPs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-2">
            <Bookmark className="text-yellow-500 fill-current" size={20} />
            <span>Bookmarked SOPs</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedSOPs.map((sop) => (
              <SOPCard 
                key={sop.id}
                sop={sop}
                onToggleBookmark={toggleBookmark}
                getDifficultyColor={getDifficultyColor}
                getCategoryIcon={getCategoryIcon}
              />
            ))}
          </div>
        </div>
      )}

      {/* All SOPs */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">All Standard Operating Procedures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularSOPs.map((sop) => (
            <SOPCard 
              key={sop.id}
              sop={sop}
              onToggleBookmark={toggleBookmark}
              getDifficultyColor={getDifficultyColor}
              getCategoryIcon={getCategoryIcon}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Folder className="text-tempo-600" size={20} />
            <span className="font-medium">Browse by Category</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Clock className="text-tempo-600" size={20} />
            <span className="font-medium">Recently Updated</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Star className="text-tempo-600" size={20} />
            <span className="font-medium">Most Popular</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Download className="text-tempo-600" size={20} />
            <span className="font-medium">Download All</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const SOPCard = ({ sop, onToggleBookmark, getDifficultyColor, getCategoryIcon }) => {
  return (
    <div className="card hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-tempo-100 rounded-lg flex items-center justify-center">
            {getCategoryIcon(sop.category)}
          </div>
          <span className="text-xs font-medium text-neutral-500 uppercase">{sop.category}</span>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleBookmark(sop.id)
          }}
          className={`p-1 rounded ${sop.isBookmarked ? 'text-yellow-500' : 'text-neutral-400 hover:text-neutral-600'}`}
        >
          <Bookmark size={16} className={sop.isBookmarked ? 'fill-current' : ''} />
        </button>
      </div>

      <h4 className="font-semibold text-neutral-900 mb-2 group-hover:text-tempo-600 transition-colors">
        {sop.title}
      </h4>

      <p className="text-sm text-neutral-600 mb-4 line-clamp-3">{sop.description}</p>

      {sop.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {sop.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-neutral-100 text-neutral-700">
              <Tag size={10} className="mr-1" />
              {tag}
            </span>
          ))}
          {sop.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-neutral-100 text-neutral-700">
              +{sop.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(sop.difficulty)}`}>
          {sop.difficulty}
        </span>
        
        <div className="flex items-center space-x-2 text-xs text-neutral-500">
          <span>v{sop.version}</span>
          <span>•</span>
          <span>{sop.lastUpdated}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-neutral-500">
          <span className="flex items-center space-x-1">
            <Eye size={14} />
            <span>{sop.views}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{sop.lastUpdated}</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
            <Eye size={16} />
          </button>
          <button className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
            <Download size={16} />
          </button>
          <button className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SOPsDirectory