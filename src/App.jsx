import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import SlackChannels from './components/SlackChannels'
import Announcements from './components/Announcements'
import NoteTaker from './components/NoteTaker'
import HoldTimer from './components/HoldTimer'
import SOPsDirectory from './components/SOPsDirectory'
import CannedResponses from './components/CannedResponses'
import PerformanceDashboard from './components/PerformanceDashboard'
import Profile from './components/Profile'
import DecisionFlows from './components/DecisionFlows'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'slack':
        return <SlackChannels />
      case 'announcements':
        return <Announcements />
      case 'notes':
        return <NoteTaker />
      case 'timer':
        return <HoldTimer />
      case 'sops':
        return <SOPsDirectory />
      case 'responses':
        return <CannedResponses />
      case 'performance':
        return <PerformanceDashboard />
      case 'profile':
        return <Profile />
      case 'flows':
        return <DecisionFlows />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          activeTab={activeTab}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App