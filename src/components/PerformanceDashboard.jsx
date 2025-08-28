import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  MessageSquare, 
  CheckCircle, 
  AlertTriangle,
  Users,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Download,
  Filter
} from 'lucide-react'

const PerformanceDashboard = () => {
  const [timeRange, setTimeRange] = useState('week')
  const [performanceData] = useState({
    currentPeriod: {
      callsHandled: 156,
      avgHandleTime: '4m 32s',
      customerSatisfaction: 4.8,
      firstCallResolution: 87,
      responseTime: '2m 15s',
      ticketsResolved: 134,
      escalations: 12,
      qualityScore: 92
    },
    previousPeriod: {
      callsHandled: 142,
      avgHandleTime: '4m 58s',
      customerSatisfaction: 4.6,
      firstCallResolution: 83,
      responseTime: '2m 45s',
      ticketsResolved: 118,
      escalations: 18,
      qualityScore: 89
    },
    trends: {
      callsHandled: '+9.9%',
      avgHandleTime: '-8.7%',
      customerSatisfaction: '+4.3%',
      firstCallResolution: '+4.8%',
      responseTime: '-18.2%',
      ticketsResolved: '+13.6%',
      escalations: '-33.3%',
      qualityScore: '+3.4%'
    }
  })

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'call',
      customer: 'John Smith',
      duration: '5m 23s',
      satisfaction: 5,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'ticket',
      customer: 'Sarah Johnson',
      status: 'resolved',
      satisfaction: 4,
      timestamp: '3 hours ago'
    },
    {
      id: 3,
      type: 'escalation',
      customer: 'Mike Chen',
      reason: 'Technical complexity',
      timestamp: '4 hours ago'
    },
    {
      id: 4,
      type: 'call',
      customer: 'Lisa Rodriguez',
      duration: '3m 45s',
      satisfaction: 5,
      timestamp: '5 hours ago'
    }
  ])

  const [qualityMetrics] = useState([
    { metric: 'Greeting & Introduction', score: 95, target: 90 },
    { metric: 'Problem Understanding', score: 88, target: 85 },
    { metric: 'Solution Accuracy', score: 94, target: 90 },
    { metric: 'Communication Skills', score: 91, target: 85 },
    { metric: 'Documentation', score: 89, target: 85 },
    { metric: 'Follow-up Actions', score: 87, target: 80 }
  ])

  const getTrendIcon = (trend) => {
    if (trend.includes('+')) {
      return <TrendingUp className="text-green-600" size={16} />
    } else if (trend.includes('-')) {
      return <TrendingDown className="text-red-600" size={16} />
    }
    return null
  }

  const getTrendColor = (trend) => {
    if (trend.includes('+')) {
      return 'text-green-600'
    } else if (trend.includes('-')) {
      return 'text-red-600'
    }
    return 'text-neutral-600'
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'call':
        return <Phone className="text-blue-600" size={16} />
      case 'ticket':
        return <MessageSquare className="text-green-600" size={16} />
      case 'escalation':
        return <AlertTriangle className="text-orange-600" size={16} />
      default:
        return <MessageCircle className="text-neutral-600" size={16} />
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'call':
        return 'bg-blue-100'
      case 'ticket':
        return 'bg-green-100'
      case 'escalation':
        return 'bg-orange-100'
      default:
        return 'bg-neutral-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Performance Dashboard</h2>
          <p className="text-neutral-600 mt-1">Track your performance metrics and KPIs</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tempo-500 focus:border-transparent"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <button className="btn-secondary flex items-center space-x-2">
            <Download size={20} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="text-blue-600" size={24} />
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor(performanceData.trends.callsHandled)}`}>
              {getTrendIcon(performanceData.trends.callsHandled)}
              <span className="text-sm font-medium">{performanceData.trends.callsHandled}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600">Calls Handled</p>
            <p className="text-2xl font-bold text-neutral-900">{performanceData.currentPeriod.callsHandled}</p>
            <p className="text-xs text-neutral-500">vs {performanceData.previousPeriod.callsHandled} last period</p>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="text-green-600" size={24} />
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor(performanceData.trends.avgHandleTime)}`}>
              {getTrendIcon(performanceData.trends.avgHandleTime)}
              <span className="text-sm font-medium">{performanceData.trends.avgHandleTime}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600">Avg Handle Time</p>
            <p className="text-2xl font-bold text-neutral-900">{performanceData.currentPeriod.avgHandleTime}</p>
            <p className="text-xs text-neutral-500">vs {performanceData.previousPeriod.avgHandleTime} last period</p>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-yellow-600" size={24} />
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor(performanceData.trends.customerSatisfaction)}`}>
              {getTrendIcon(performanceData.trends.customerSatisfaction)}
              <span className="text-sm font-medium">{performanceData.trends.customerSatisfaction}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600">Customer Satisfaction</p>
            <p className="text-2xl font-bold text-neutral-900">{performanceData.currentPeriod.customerSatisfaction}/5</p>
            <p className="text-xs text-neutral-500">vs {performanceData.previousPeriod.customerSatisfaction}/5 last period</p>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-purple-600" size={24} />
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor(performanceData.trends.qualityScore)}`}>
              {getTrendIcon(performanceData.trends.qualityScore)}
              <span className="text-sm font-medium">{performanceData.trends.qualityScore}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600">Quality Score</p>
            <p className="text-2xl font-bold text-neutral-900">{performanceData.currentPeriod.qualityScore}%</p>
            <p className="text-xs text-neutral-500">vs {performanceData.previousPeriod.qualityScore}% last period</p>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">First Call Resolution</p>
              <p className="text-2xl font-bold text-neutral-900">{performanceData.currentPeriod.firstCallResolution}%</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-indigo-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Response Time</p>
              <p className="text-2xl font-bold text-neutral-900">{performanceData.currentPeriod.responseTime}</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <Clock className="text-pink-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Tickets Resolved</p>
              <p className="text-2xl font-bold text-neutral-900">{performanceData.currentPeriod.ticketsResolved}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Escalations</p>
              <p className="text-2xl font-bold text-neutral-900">{performanceData.currentPeriod.escalations}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quality Metrics */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quality Metrics</h3>
        <div className="space-y-4">
          {qualityMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">{metric.metric}</span>
                  <span className="text-sm font-medium text-neutral-900">{metric.score}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${metric.score >= metric.target ? 'bg-green-500' : 'bg-yellow-500'}`}
                    style={{ width: `${metric.score}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-neutral-500">Target: {metric.target}%</span>
                  <span className={`text-xs ${metric.score >= metric.target ? 'text-green-600' : 'text-yellow-600'}`}>
                    {metric.score >= metric.target ? '✓ On Target' : '⚠ Below Target'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity & Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50">
                <div className={`w-8 h-8 ${getActivityColor(activity.type)} rounded-lg flex items-center justify-center`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-900 truncate">
                    {activity.type === 'call' && `${activity.customer} - ${activity.duration}`}
                    {activity.type === 'ticket' && `${activity.customer} - ${activity.status}`}
                    {activity.type === 'escalation' && `${activity.customer} - ${activity.reason}`}
                  </p>
                  <p className="text-xs text-neutral-500">{activity.timestamp}</p>
                </div>
                {activity.satisfaction && (
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-neutral-600">{activity.satisfaction}/5</span>
                    <CheckCircle className="text-green-500" size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="card">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Performance Trends</h3>
          <div className="flex items-center justify-center h-64 bg-neutral-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="text-neutral-400 mx-auto mb-2" size={48} />
              <p className="text-neutral-500">Performance chart visualization</p>
              <p className="text-sm text-neutral-400">Shows trends over time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Calendar className="text-tempo-600" size={20} />
            <span className="font-medium">Schedule Review</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Download className="text-tempo-600" size={20} />
            <span className="font-medium">Download Report</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Users className="text-tempo-600" size={20} />
            <span className="font-medium">Team Comparison</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-neutral-200 hover:border-tempo-300 hover:bg-tempo-50 transition-colors">
            <Filter className="text-tempo-600" size={20} />
            <span className="font-medium">Custom Metrics</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PerformanceDashboard