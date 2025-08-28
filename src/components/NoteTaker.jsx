import React, { useState } from 'react'
import { 
  StickyNote, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Tag, 
  Edit, 
  Trash2, 
  Copy,
  Download,
  Star,
  Clock
} from 'lucide-react'

const NoteTaker = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showNewForm, setShowNewForm] = useState(false)
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Customer Refund Request - John Smith',
      content: 'Customer called regarding a refund for order #12345. Product arrived damaged. Explained refund process and initiated return label. Customer was satisfied with resolution.',
      category: 'refund',
      tags: ['refund', 'damaged-product', 'satisfied'],
      customerId: 'CS-001',
      priority: 'medium',
      createdAt: '2 hours ago',
      isStarred: true,
      status: 'resolved'
    },
    {
      id: 2,
      title: 'Technical Issue - Sarah Johnson',
      content: 'Customer experiencing login issues with mobile app. Reset password and cleared cache. Issue resolved. Follow up in 24 hours to confirm.',
      category: 'technical',
      tags: ['login', 'mobile-app', 'password-reset'],
      customerId: 'CS-002',
      priority: 'high',
      createdAt: '4 hours ago',
      isStarred: false,
      status: 'pending'
    },
    {
      id: 3,
      title: 'Billing Question - Mike Chen',
      content: 'Customer confused about recent charge. Explained subscription renewal and showed billing history. Customer understood and was happy with service.',
      category: 'billing',
      tags: ['billing', 'subscription', 'clarification'],
      customerId: 'CS-003',
      priority: 'low',
      createdAt: '1 day ago',
      isStarred: false,
      status: 'resolved'
    }
  ])

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: '',
    customerId: '',
    priority: 'medium'
  })

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'refund', label: 'Refund Requests' },
    { value: 'technical', label: 'Technical Issues' },
    { value: 'billing', label: 'Billing Questions' },
    { value: 'product', label: 'Product Support' },
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
      case 'refund':
        return <StickyNote size={16} />
      case 'technical':
        return <StickyNote size={16} />
      case 'billing':
        return <StickyNote size={16} />
      case 'product':
        return <StickyNote size={16} />
      default:
        return <StickyNote size={16} />
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const note = {
      id: Date.now(),
      ...newNote,
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: 'Just now',
      isStarred: false,
      status: 'active'
    }
    setNotes([note, ...notes])
    setNewNote({ title: '', content: '', category: 'general', tags: '', customerId: '', priority: 'medium' })
    setShowNewForm(false)
  }

  const toggleStar = (id) => {
    setNotes(notes.map(note =>
      note.id === id 
        ? { ...note, isStarred: !note.isStarred }
        : note
    ))
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const copyNote = (note) => {
    const textToCopy = `${note.title}\n\n${note.content}\n\nCustomer ID: ${note.customerId}\nCategory: ${note.category}\nPriority: ${note.priority}`
    navigator.clipboard.writeText(textToCopy)
  }

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.customerId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || note.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const starredNotes = filteredNotes.filter(note => note.isStarred)
  const regularNotes = filteredNotes.filter(note => !note.isStarred)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Note Taker</h2>
          <p className="text-neutral-600 mt-1">Create and manage customer interaction notes</p>
        </div>
        <button 
          onClick={() => setShowNewForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Note</span>
        </button>
      </div>

      {/* New Note Form */}
      {showNewForm && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">New Note</h3>
            <button 
              onClick={() => setShowNewForm(false)}
              className="text-neutral-500 hover:text-neutral-700"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  className="input-field"
                  placeholder="Enter note title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Customer ID</label>
                <input
                  type="text"
                  value={newNote.customerId}
                  onChange={(e) => setNewNote({...newNote, customerId: e.target.value})}
                  className="input-field"
                  placeholder="Enter customer ID"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Content</label>
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                className="input-field"
                rows={6}
                placeholder="Enter note content..."
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                <select
                  value={newNote.category}
                  onChange={(e) => setNewNote({...newNote, category: e.target.value})}
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
                  value={newNote.priority}
                  onChange={(e) => setNewNote({...newNote, priority: e.target.value})}
                  className="input-field"
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Tags</label>
                <input
                  type="text"
                  value={newNote.tags}
                  onChange={(e) => setNewNote({...newNote, tags: e.target.value})}
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
                Save Note
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
              placeholder="Search notes by title, content, or customer ID..."
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

      {/* Starred Notes */}
      {starredNotes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-2">
            <Star className="text-yellow-500 fill-current" size={20} />
            <span>Starred Notes</span>
          </h3>
          <div className="space-y-4">
            {starredNotes.map((note) => (
              <NoteCard 
                key={note.id}
                note={note}
                onToggleStar={toggleStar}
                onDelete={deleteNote}
                onCopy={copyNote}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Notes */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Notes</h3>
        <div className="space-y-4">
          {regularNotes.map((note) => (
            <NoteCard 
              key={note.id}
              note={note}
              onToggleStar={toggleStar}
              onDelete={deleteNote}
              onCopy={copyNote}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const NoteCard = ({ note, onToggleStar, onDelete, onCopy }) => {
  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
  ]

  const getPriorityColor = (priority) => {
    const found = priorities.find(p => p.value === priority)
    return found ? found.color : 'bg-neutral-100 text-neutral-800'
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-tempo-100 rounded-lg flex items-center justify-center">
            <StickyNote className="text-tempo-600" size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900">{note.title}</h4>
            <div className="flex items-center space-x-3 mt-1">
              {note.customerId && (
                <>
                  <span className="text-sm text-neutral-500">Customer: {note.customerId}</span>
                  <span className="text-sm text-neutral-500">•</span>
                </>
              )}
              <span className="text-sm text-neutral-500">{note.createdAt}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(note.priority)}`}>
            {note.priority}
          </span>
          
          <button
            onClick={() => onToggleStar(note.id)}
            className={`p-1 rounded ${note.isStarred ? 'text-yellow-500' : 'text-neutral-400 hover:text-neutral-600'}`}
          >
            <Star size={16} className={note.isStarred ? 'fill-current' : ''} />
          </button>
        </div>
      </div>

      <p className="text-neutral-600 mb-4">{note.content}</p>

      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-neutral-100 text-neutral-700">
              <Tag size={12} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-neutral-500">
          <span className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{note.createdAt}</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onCopy(note)}
            className="p-1 text-neutral-400 hover:text-neutral-600 rounded"
            title="Copy note"
          >
            <Copy size={16} />
          </button>
          <button className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
            <Download size={16} />
          </button>
          <button className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(note.id)}
            className="p-1 text-neutral-400 hover:text-red-600 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteTaker