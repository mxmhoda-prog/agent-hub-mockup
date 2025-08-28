import React, { useState, useEffect } from 'react'
import { 
  Timer, 
  Play, 
  Pause, 
  Square, 
  Plus, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  BarChart3,
  Download,
  Trash2
} from 'lucide-react'

const HoldTimer = () => {
  const [timers, setTimers] = useState([
    {
      id: 1,
      customerName: 'John Smith',
      customerId: 'CS-001',
      reason: 'Checking account details',
      startTime: Date.now() - 180000, // 3 minutes ago
      isRunning: true,
      status: 'active',
      notes: 'Customer on hold while checking billing history'
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      customerId: 'CS-002',
      reason: 'Technical issue investigation',
      startTime: Date.now() - 300000, // 5 minutes ago
      isRunning: false,
      status: 'completed',
      endTime: Date.now() - 60000, // 1 minute ago
      notes: 'Issue resolved, customer satisfied'
    }
  ])

  const [showNewForm, setShowNewForm] = useState(false)
  const [newTimer, setNewTimer] = useState({
    customerName: '',
    customerId: '',
    reason: '',
    notes: ''
  })

  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatDuration = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) {
      return `${hours}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
    }
    return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
  }

  const startTimer = (id) => {
    setTimers(timers.map(timer =>
      timer.id === id 
        ? { ...timer, isRunning: true, startTime: currentTime }
        : timer
    ))
  }

  const pauseTimer = (id) => {
    setTimers(timers.map(timer =>
      timer.id === id 
        ? { ...timer, isRunning: false }
        : timer
    ))
  }

  const stopTimer = (id) => {
    setTimers(timers.map(timer =>
      timer.id === id 
        ? { 
            ...timer, 
            isRunning: false, 
            status: 'completed',
            endTime: currentTime
          }
        : timer
    ))
  }

  const deleteTimer = (id) => {
    setTimers(timers.filter(timer => timer.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const timer = {
      id: Date.now(),
      ...newTimer,
      startTime: currentTime,
      isRunning: true,
      status: 'active'
    }
    setTimers([timer, ...timers])
    setNewTimer({ customerName: '', customerId: '', reason: '', notes: '' })
    setShowNewForm(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} />
      case 'completed':
        return <CheckCircle size={16} />
      case 'paused':
        return <AlertTriangle size={16} />
      default:
        return <Clock size={16} />
    }
  }

  const activeTimers = timers.filter(timer => timer.status === 'active')
  const completedTimers = timers.filter(timer => timer.status === 'completed')

  const totalHoldTime = completedTimers.reduce((total, timer) => {
    if (timer.endTime && timer.startTime) {
      return total + (timer.endTime - timer.startTime)
    }
    return total
  }, 0)

  const averageHoldTime = completedTimers.length > 0 ? totalHoldTime / completedTimers.length : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Hold Timer</h2>
          <p className="text-neutral-600 mt-1">Track customer call hold times and manage wait periods</p>
        </div>
        <button 
          onClick={() => setShowNewForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Timer</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Active Timers</p>
              <p className="text-2xl font-bold text-neutral-900">{activeTimers.length}</p>
            </div>
            <div className="w-12 h-12 bg-tempo-100 rounded-lg flex items-center justify-center">
              <Timer className="text-tempo-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Hold Time</p>
              <p className="text-2xl font-bold text-neutral-900">{formatDuration(totalHoldTime)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Avg Hold Time</p>
              <p className="text-2xl font-bold text-neutral-900">{formatDuration(averageHoldTime)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* New Timer Form */}
      {showNewForm && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">New Hold Timer</h3>
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
                <label className="block text-sm font-medium text-neutral-700 mb-2">Customer Name</label>
                <input
                  type="text"
                  value={newTimer.customerName}
                  onChange={(e) => setNewTimer({...newTimer, customerName: e.target.value})}
                  className="input-field"
                  placeholder="Enter customer name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Customer ID</label>
                <input
                  type="text"
                  value={newTimer.customerId}
                  onChange={(e) => setNewTimer({...newTimer, customerId: e.target.value})}
                  className="input-field"
                  placeholder="Enter customer ID"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Hold Reason</label>
              <input
                type="text"
                value={newTimer.reason}
                onChange={(e) => setNewTimer({...newTimer, reason: e.target.value})}
                className="input-field"
                placeholder="Why is the customer on hold?"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Notes</label>
              <textarea
                value={newTimer.notes}
                onChange={(e) => setNewTimer({...newTimer, notes: e.target.value})}
                className="input-field"
                rows={3}
                placeholder="Additional notes..."
              />
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
                Start Timer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Active Timers */}
      {activeTimers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Active Timers</h3>
          <div className="space-y-4">
            {activeTimers.map((timer) => (
              <TimerCard 
                key={timer.id}
                timer={timer}
                currentTime={currentTime}
                onStart={startTimer}
                onPause={pauseTimer}
                onStop={stopTimer}
                onDelete={deleteTimer}
                formatDuration={formatDuration}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Timers */}
      {completedTimers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Completed Timers</h3>
          <div className="space-y-4">
            {completedTimers.map((timer) => (
              <CompletedTimerCard 
                key={timer.id}
                timer={timer}
                onDelete={deleteTimer}
                formatDuration={formatDuration}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Download className="text-tempo-600" size={20} />
            <span className="font-medium">Export Report</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <BarChart3 className="text-tempo-600" size={20} />
            <span className="font-medium">View Analytics</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Clock className="text-tempo-600" size={20} />
            <span className="font-medium">Set Alerts</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const TimerCard = ({ timer, currentTime, onStart, onPause, onStop, onDelete, formatDuration }) => {
  const elapsed = currentTime - timer.startTime
  const isRunning = timer.isRunning

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-tempo-100 rounded-lg flex items-center justify-center">
            <Timer className="text-tempo-600" size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900">{timer.customerName}</h4>
            <div className="flex items-center space-x-3 mt-1">
              {timer.customerId && (
                <>
                  <span className="text-sm text-neutral-500">ID: {timer.customerId}</span>
                  <span className="text-sm text-neutral-500">•</span>
                </>
              )}
              <span className="text-sm text-neutral-500">{timer.reason}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-mono font-bold text-tempo-600">
            {formatDuration(elapsed)}
          </div>
          <div className="text-sm text-neutral-500">Elapsed Time</div>
        </div>
      </div>

      {timer.notes && (
        <p className="text-neutral-600 mb-4">{timer.notes}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium bg-green-100 text-green-800 border-green-200">
            <CheckCircle size={16} className="mr-1" />
            Active
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {isRunning ? (
            <button
              onClick={() => onPause(timer.id)}
              className="p-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              <Pause size={20} />
            </button>
          ) : (
            <button
              onClick={() => onStart(timer.id)}
              className="p-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
            >
              <Play size={20} />
            </button>
          )}
          
          <button
            onClick={() => onStop(timer.id)}
            className="p-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Square size={20} />
          </button>
          
          <button 
            onClick={() => onDelete(timer.id)}
            className="p-2 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

const CompletedTimerCard = ({ timer, onDelete, formatDuration }) => {
  const duration = timer.endTime && timer.startTime ? timer.endTime - timer.startTime : 0

  return (
    <div className="card bg-neutral-50">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="text-blue-600" size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900">{timer.customerName}</h4>
            <div className="flex items-center space-x-3 mt-1">
              {timer.customerId && (
                <>
                  <span className="text-sm text-neutral-500">ID: {timer.customerId}</span>
                  <span className="text-sm text-neutral-500">•</span>
                </>
              )}
              <span className="text-sm text-neutral-500">{timer.reason}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xl font-mono font-bold text-blue-600">
            {formatDuration(duration)}
          </div>
          <div className="text-sm text-neutral-500">Total Time</div>
        </div>
      </div>

      {timer.notes && (
        <p className="text-neutral-600 mb-3">{timer.notes}</p>
      )}

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium bg-blue-100 text-blue-800 border-blue-200">
          <CheckCircle size={16} className="mr-1" />
          Completed
        </span>
        
        <button 
          onClick={() => onDelete(timer.id)}
          className="p-1 text-neutral-400 hover:text-red-600 rounded"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

export default HoldTimer