import React, { useState } from 'react'
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Save,
  Camera,
  Edit,
  Key,
  Smartphone,
  Mail,
  Calendar,
  MapPin,
  Building
} from 'lucide-react'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [profile, setProfile] = useState({
    personal: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@tempo.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1990-05-15',
      location: 'San Francisco, CA',
      timezone: 'America/Los_Angeles',
      bio: 'Experienced customer success agent with 5+ years in technical support and customer relations.'
    },
    work: {
      employeeId: 'EMP-001',
      department: 'Customer Success',
      position: 'Senior Support Agent',
      startDate: '2020-03-15',
      manager: 'Sarah Johnson',
      team: 'Technical Support',
      skills: ['Technical Support', 'Customer Relations', 'Problem Solving', 'Communication', 'Product Knowledge']
    },
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        sms: false,
        slack: true
      },
      autoStatus: true,
      holdTimerAlerts: true,
      performanceReminders: true
    },
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: '2024-01-15',
      loginHistory: [
        { date: '2024-01-20 09:30', location: 'San Francisco, CA', device: 'Chrome on Windows' },
        { date: '2024-01-19 14:15', location: 'San Francisco, CA', device: 'Chrome on Windows' },
        { date: '2024-01-18 08:45', location: 'San Francisco, CA', device: 'Chrome on Windows' }
      ]
    }
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'work', label: 'Work Details', icon: Building },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield }
  ]

  const handleEdit = (section) => {
    setEditData(profile[section])
    setIsEditing(true)
  }

  const handleSave = (section) => {
    setProfile({
      ...profile,
      [section]: editData
    })
    setIsEditing(false)
    setEditData({})
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({})
  }

  const handleInputChange = (field, value) => {
    setEditData({
      ...editData,
      [field]: value
    })
  }

  const handleNotificationToggle = (type) => {
    setEditData({
      ...editData,
      notifications: {
        ...editData.notifications,
        [type]: !editData.notifications[type]
      }
    })
  }

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900">Personal Information</h3>
        {!isEditing && (
          <button
            onClick={() => handleEdit('personal')}
            className="btn-secondary flex items-center space-x-2"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">First Name</label>
              <input
                type="text"
                value={editData.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Last Name</label>
              <input
                type="text"
                value={editData.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
              <input
                type="email"
                value={editData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
              <input
                type="tel"
                value={editData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={editData.dateOfBirth || ''}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Location</label>
              <input
                type="text"
                value={editData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Bio</label>
            <textarea
              value={editData.bio || ''}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="input-field"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button onClick={handleCancel} className="btn-secondary">
              Cancel
            </button>
            <button onClick={() => handleSave('personal')} className="btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Full Name</p>
                <p className="font-medium text-neutral-900">{profile.personal.firstName} {profile.personal.lastName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Email</p>
                <p className="font-medium text-neutral-900">{profile.personal.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Smartphone className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Phone</p>
                <p className="font-medium text-neutral-900">{profile.personal.phone}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Date of Birth</p>
                <p className="font-medium text-neutral-900">{profile.personal.dateOfBirth}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Location</p>
                <p className="font-medium text-neutral-900">{profile.personal.location}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Globe className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Timezone</p>
                <p className="font-medium text-neutral-900">{profile.personal.timezone}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!isEditing && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Bio</h4>
          <p className="text-neutral-600">{profile.personal.bio}</p>
        </div>
      )}
    </div>
  )

  const renderWorkDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900">Work Information</h3>
        {!isEditing && (
          <button
            onClick={() => handleEdit('work')}
            className="btn-secondary flex items-center space-x-2"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Employee ID</label>
              <input
                type="text"
                value={editData.employeeId || ''}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Department</label>
              <input
                type="text"
                value={editData.department || ''}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Position</label>
              <input
                type="text"
                value={editData.position || ''}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Start Date</label>
              <input
                type="date"
                value={editData.startDate || ''}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Manager</label>
              <input
                type="text"
                value={editData.manager || ''}
                onChange={(e) => handleInputChange('manager', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Team</label>
              <input
                type="text"
                value={editData.team || ''}
                onChange={(e) => handleInputChange('team', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Skills</label>
            <input
              type="text"
              value={editData.skills ? editData.skills.join(', ') : ''}
              onChange={(e) => handleInputChange('skills', e.target.value.split(',').map(s => s.trim()))}
              className="input-field"
              placeholder="Skill 1, Skill 2, Skill 3"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button onClick={handleCancel} className="btn-secondary">
              Cancel
            </button>
            <button onClick={() => handleSave('work')} className="btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Employee ID</p>
                <p className="font-medium text-neutral-900">{profile.work.employeeId}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Building className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Department</p>
                <p className="font-medium text-neutral-900">{profile.work.department}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <User className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Position</p>
                <p className="font-medium text-neutral-900">{profile.work.position}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Start Date</p>
                <p className="font-medium text-neutral-900">{profile.work.startDate}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <User className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Manager</p>
                <p className="font-medium text-neutral-900">{profile.work.manager}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Building className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Team</p>
                <p className="font-medium text-neutral-900">{profile.work.team}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!isEditing && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {profile.work.skills.map((skill, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-tempo-100 text-tempo-800">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900">Preferences</h3>
        {!isEditing && (
          <button
            onClick={() => handleEdit('preferences')}
            className="btn-secondary flex items-center space-x-2"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Theme</label>
              <select
                value={editData.theme || 'light'}
                onChange={(e) => handleInputChange('theme', e.target.value)}
                className="input-field"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Language</label>
              <select
                value={editData.language || 'en'}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="input-field"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">Notifications</label>
            <div className="space-y-3">
              {Object.entries(editData.notifications || {}).map(([type, enabled]) => (
                <label key={type} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => handleNotificationToggle(type)}
                    className="rounded border-neutral-300 text-tempo-600 focus:ring-tempo-500"
                  />
                  <span className="text-sm text-neutral-700 capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">Auto Features</label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={editData.autoStatus || false}
                  onChange={(e) => handleInputChange('autoStatus', e.target.checked)}
                  className="rounded border-neutral-300 text-tempo-600 focus:ring-tempo-500"
                />
                <span className="text-sm text-neutral-700">Auto-status updates</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={editData.holdTimerAlerts || false}
                  onChange={(e) => handleInputChange('holdTimerAlerts', e.target.checked)}
                  className="rounded border-neutral-300 text-tempo-600 focus:ring-tempo-500"
                />
                <span className="text-sm text-neutral-700">Hold timer alerts</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={editData.performanceReminders || false}
                  onChange={(e) => handleInputChange('performanceReminders', e.target.checked)}
                  className="rounded border-neutral-300 text-tempo-600 focus:ring-tempo-500"
                />
                <span className="text-sm text-neutral-700">Performance reminders</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button onClick={handleCancel} className="btn-secondary">
              Cancel
            </button>
            <button onClick={() => handleSave('preferences')} className="btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Palette className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Theme</p>
                <p className="font-medium text-neutral-900 capitalize">{profile.preferences.theme}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Globe className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Language</p>
                <p className="font-medium text-neutral-900">{profile.preferences.language === 'en' ? 'English' : profile.preferences.language}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Bell className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Notifications</p>
                <p className="font-medium text-neutral-900">
                  {Object.values(profile.preferences.notifications).filter(Boolean).length} enabled
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Settings className="text-neutral-400" size={20} />
              <div>
                <p className="text-sm text-neutral-500">Auto Features</p>
                <p className="font-medium text-neutral-900">
                  {Object.values(profile.preferences).filter(v => typeof v === 'boolean' && v).length} enabled
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderSecurity = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-neutral-900">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Key className="text-neutral-400" size={20} />
            <div>
              <p className="font-medium text-neutral-900">Two-Factor Authentication</p>
              <p className="text-sm text-neutral-500">Add an extra layer of security to your account</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              profile.security.twoFactorEnabled 
                ? 'bg-green-100 text-green-800' 
                : 'bg-neutral-100 text-neutral-800'
            }`}>
              {profile.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <button className="btn-secondary text-sm">
              {profile.security.twoFactorEnabled ? 'Manage' : 'Enable'}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Key className="text-neutral-400" size={20} />
            <div>
              <p className="font-medium text-neutral-900">Password</p>
              <p className="text-sm text-neutral-500">Last changed {profile.security.lastPasswordChange}</p>
            </div>
          </div>
          <button className="btn-secondary text-sm">Change Password</button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Globe className="text-neutral-400" size={20} />
            <div>
              <p className="font-medium text-neutral-900">Login History</p>
              <p className="text-sm text-neutral-500">View recent login activity</p>
            </div>
          </div>
          <button className="btn-secondary text-sm">View History</button>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-neutral-700 mb-3">Recent Login Activity</h4>
        <div className="space-y-2">
          {profile.security.loginHistory.map((login, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-neutral-900">{login.date}</p>
                  <p className="text-xs text-neutral-500">{login.location} • {login.device}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Profile Settings</h2>
          <p className="text-neutral-600 mt-1">Manage your personal information and preferences</p>
        </div>
      </div>

      {/* Profile Picture */}
      <div className="card">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-tempo-100 rounded-full flex items-center justify-center">
              <User className="text-tempo-600" size={48} />
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-tempo-600 rounded-full flex items-center justify-center hover:bg-tempo-700 transition-colors">
              <Camera className="text-white" size={16} />
            </button>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-neutral-900">
              {profile.personal.firstName} {profile.personal.lastName}
            </h3>
            <p className="text-neutral-600">{profile.work.position}</p>
            <p className="text-sm text-neutral-500">{profile.work.department}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-tempo-500 text-tempo-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="py-6">
          {activeTab === 'personal' && renderPersonalInfo()}
          {activeTab === 'work' && renderWorkDetails()}
          {activeTab === 'preferences' && renderPreferences()}
          {activeTab === 'security' && renderSecurity()}
        </div>
      </div>
    </div>
  )
}

export default Profile