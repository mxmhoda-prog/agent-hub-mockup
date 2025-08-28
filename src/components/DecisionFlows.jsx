import React, { useState } from 'react'
import { 
  GitBranch, 
  Plus, 
  Search, 
  Filter, 
  Play, 
  Pause, 
  Square, 
  Edit, 
  Trash2,
  Copy,
  Download,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  ChevronDown
} from 'lucide-react'

const DecisionFlows = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showNewForm, setShowNewForm] = useState(false)
  const [flows, setFlows] = useState([
    {
      id: 1,
      title: 'Customer Refund Decision Tree',
      description: 'Step-by-step decision flow for determining refund eligibility and processing',
      category: 'refunds',
      tags: ['refund', 'customer-service', 'decision-tree'],
      lastUsed: '2 hours ago',
      useCount: 34,
      rating: 4.8,
      isFavorite: true,
      author: 'Sarah Johnson',
      lastUpdated: '1 week ago',
      status: 'active',
      steps: [
        {
          id: 1,
          question: 'Is the customer within the 30-day return window?',
          options: [
            { text: 'Yes', nextStep: 2, action: 'Proceed to next step' },
            { text: 'No', nextStep: 'end', action: 'Explain policy, offer alternatives' }
          ]
        },
        {
          id: 2,
          question: 'Is the product in original condition?',
          options: [
            { text: 'Yes', nextStep: 3, action: 'Proceed to next step' },
            { text: 'No', nextStep: 'end', action: 'Explain condition requirements' }
          ]
        },
        {
          id: 3,
          question: 'What is the reason for return?',
          options: [
            { text: 'Defective product', nextStep: 4, action: 'Process warranty claim' },
            { text: 'Customer changed mind', nextStep: 5, action: 'Process standard return' },
            { text: 'Wrong item received', nextStep: 6, action: 'Process exchange' }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Technical Issue Escalation Flow',
      description: 'Decision matrix for determining when and how to escalate technical issues',
      category: 'technical',
      tags: ['escalation', 'technical', 'support'],
      lastUsed: '1 day ago',
      useCount: 28,
      rating: 4.6,
      isFavorite: false,
      author: 'Mike Chen',
      lastUpdated: '2 weeks ago',
      status: 'active',
      steps: [
        {
          id: 1,
          question: 'Can the issue be resolved with basic troubleshooting?',
          options: [
            { text: 'Yes', nextStep: 'end', action: 'Provide troubleshooting steps' },
            { text: 'No', nextStep: 2, action: 'Proceed to escalation criteria' }
          ]
        },
        {
          id: 2,
          question: 'What is the impact level?',
          options: [
            { text: 'High - Multiple users affected', nextStep: 3, action: 'Immediate escalation' },
            { text: 'Medium - Single user, business impact', nextStep: 4, action: 'Priority escalation' },
            { text: 'Low - Single user, no business impact', nextStep: 'end', action: 'Standard support process' }
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'Account Verification Process',
      description: 'Multi-step verification flow for account access and changes',
      category: 'security',
      tags: ['verification', 'security', 'account'],
      lastUsed: '4 hours ago',
      useCount: 67,
      rating: 4.9,
      isFavorite: true,
      author: 'Lisa Rodriguez',
      lastUpdated: '3 days ago',
      status: 'active',
      steps: [
        {
          id: 1,
          question: 'What type of account change is requested?',
          options: [
            { text: 'Password reset', nextStep: 2, action: 'Email verification required' },
            { text: 'Email change', nextStep: 3, action: 'Enhanced verification required' },
            { text: 'Account deletion', nextStep: 4, action: 'Manager approval required' }
          ]
        },
        {
          id: 2,
          question: 'Can customer verify email access?',
          options: [
            { text: 'Yes', nextStep: 'end', action: 'Send reset link' },
            { text: 'No', nextStep: 'end', action: 'Alternative verification methods' }
          ]
        }
      ]
    }
  ])

  const [newFlow, setNewFlow] = useState({
    title: '',
    description: '',
    category: 'general',
    tags: ''
  })

  const [activeFlow, setActiveFlow] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'refunds', label: 'Refunds & Returns' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'security', label: 'Security & Verification' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'general', label: 'General Support' }
  ]

  const toggleFavorite = (id) => {
    setFlows(flows.map(flow =>
      flow.id === id 
        ? { ...flow, isFavorite: !flow.isFavorite }
        : flow
    ))
  }

  const deleteFlow = (id) => {
    setFlows(flows.filter(flow => flow.id !== id))
  }

  const copyFlow = (flow) => {
    const textToCopy = `${flow.title}\n\n${flow.description}\n\nSteps:\n${flow.steps.map(step => 
      `${step.question}\n${step.options.map(opt => `- ${opt.text}: ${opt.action}`).join('\n')}`
    ).join('\n\n')}`
    navigator.clipboard.writeText(textToCopy)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const flow = {
      id: Date.now(),
      ...newFlow,
      tags: newFlow.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      lastUsed: 'Just now',
      useCount: 0,
      rating: 0,
      isFavorite: false,
      author: 'John Doe',
      lastUpdated: 'Just now',
      status: 'active',
      steps: []
    }
    setFlows([flow, ...flows])
    setNewFlow({ title: '', description: '', category: 'general', tags: '' })
    setShowNewForm(false)
  }

  const startFlow = (flow) => {
    setActiveFlow(flow)
    setCurrentStep(0)
  }

  const selectOption = (option) => {
    if (option.nextStep === 'end') {
      // Flow completed
      setActiveFlow(null)
      setCurrentStep(0)
    } else {
      // Move to next step
      setCurrentStep(option.nextStep - 1)
    }
  }

  const filteredFlows = flows.filter(flow => {
    const matchesSearch = flow.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         flow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         flow.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || flow.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const favoriteFlows = filteredFlows.filter(flow => flow.isFavorite)
  const regularFlows = filteredFlows.filter(flow => !flow.isFavorite)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Decision Flows</h2>
          <p className="text-neutral-600 mt-1">Navigate through decision trees and workflows</p>
        </div>
        <button 
          onClick={() => setShowNewForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Flow</span>
        </button>
      </div>

      {/* Active Flow Display */}
      {activeFlow && (
        <div className="card bg-tempo-50 border-tempo-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Active Flow: {activeFlow.title}</h3>
            <button
              onClick={() => {
                setActiveFlow(null)
                setCurrentStep(0)
              }}
              className="btn-secondary text-sm"
            >
              <Square size={16} />
              <span>End Flow</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {activeFlow.steps[currentStep] && (
              <div className="bg-white p-4 rounded-lg border border-tempo-200">
                <h4 className="font-medium text-neutral-900 mb-3">
                  Step {currentStep + 1}: {activeFlow.steps[currentStep].question}
                </h4>
                <div className="space-y-2">
                  {activeFlow.steps[currentStep].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => selectOption(option)}
                      className="w-full text-left p-3 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-neutral-900">{option.text}</span>
                        <ChevronRight className="text-neutral-400" size={16} />
                      </div>
                      <p className="text-sm text-neutral-600 mt-1">{option.action}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {currentStep >= activeFlow.steps.length && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
                <p className="font-medium text-green-800">Flow completed successfully!</p>
                <p className="text-sm text-green-600 mt-1">All decision points have been navigated.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Flow Form */}
      {showNewForm && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">New Decision Flow</h3>
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
                value={newFlow.title}
                onChange={(e) => setNewFlow({...newFlow, title: e.target.value})}
                className="input-field"
                placeholder="Enter flow title"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
              <textarea
                value={newFlow.description}
                onChange={(e) => setNewFlow({...newFlow, description: e.target.value})}
                className="input-field"
                rows={3}
                placeholder="Enter flow description..."
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                <select
                  value={newFlow.category}
                  onChange={(e) => setNewFlow({...newFlow, category: e.target.value})}
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
                  value={newFlow.tags}
                  onChange={(e) => setNewFlow({...newFlow, tags: e.target.value})}
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
                Create Flow
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
              placeholder="Search flows by title, description, or tags..."
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

      {/* Favorite Flows */}
      {favoriteFlows.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-2">
            <Star className="text-yellow-500 fill-current" size={20} />
            <span>Favorite Flows</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteFlows.map((flow) => (
              <FlowCard 
                key={flow.id}
                flow={flow}
                onToggleFavorite={toggleFavorite}
                onCopy={copyFlow}
                onDelete={deleteFlow}
                onStart={startFlow}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Flows */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">All Decision Flows</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularFlows.map((flow) => (
            <FlowCard 
              key={flow.id}
              flow={flow}
              onToggleFavorite={toggleFavorite}
              onCopy={copyFlow}
              onDelete={deleteFlow}
              onStart={startFlow}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Play className="text-tempo-600" size={20} />
            <span className="font-medium">Start Recent</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Star className="text-tempo-600" size={20} />
            <span className="font-medium">View Favorites</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Download className="text-tempo-600" size={20} />
            <span className="font-medium">Export All</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <GitBranch className="text-tempo-600" size={20} />
            <span className="font-medium">Create Template</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const FlowCard = ({ flow, onToggleFavorite, onCopy, onDelete, onStart }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-tempo-100 rounded-lg flex items-center justify-center">
            <GitBranch className="text-tempo-600" size={16} />
          </div>
          <span className="text-xs font-medium text-neutral-500 uppercase">{flow.category}</span>
        </div>
        
        <button
          onClick={() => onToggleFavorite(flow.id)}
          className={`p-1 rounded ${flow.isFavorite ? 'text-yellow-500' : 'text-neutral-400 hover:text-neutral-600'}`}
        >
          <Star size={16} className={flow.isFavorite ? 'fill-current' : ''} />
        </button>
      </div>

      <h4 className="font-semibold text-neutral-900 mb-2">{flow.title}</h4>
      <p className="text-sm text-neutral-600 mb-4">{flow.description}</p>

      {flow.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {flow.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-neutral-100 text-neutral-700">
              {tag}
            </span>
          ))}
          {flow.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-neutral-100 text-neutral-700">
              +{flow.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-neutral-500">
          <span className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{flow.lastUsed}</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle size={14} />
            <span>{flow.useCount} uses</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {flow.status}
          </span>
        </div>
      </div>

      {/* Expandable Steps Preview */}
      <div className="border-t border-neutral-200 pt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-sm text-neutral-600 hover:text-neutral-900"
        >
          <span>View Steps ({flow.steps.length})</span>
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        
        {expanded && (
          <div className="mt-3 space-y-2">
            {flow.steps.slice(0, 3).map((step, index) => (
              <div key={index} className="text-xs text-neutral-500 bg-neutral-50 p-2 rounded">
                <span className="font-medium">Step {index + 1}:</span> {step.question}
              </div>
            ))}
            {flow.steps.length > 3 && (
              <div className="text-xs text-neutral-400 text-center">
                +{flow.steps.length - 3} more steps
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => onStart(flow)}
          className="btn-primary text-sm"
        >
          <Play size={16} />
          <span>Start Flow</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onCopy(flow)}
            className="p-1 text-neutral-400 hover:text-neutral-600 rounded"
            title="Copy flow"
          >
            <Copy size={16} />
          </button>
          <button className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(flow.id)}
            className="p-1 text-neutral-400 hover:text-red-600 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DecisionFlows