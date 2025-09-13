import React, { useState } from 'react'

type Props = {
  categoryId: string
  onClose: () => void
  onAdd: (name: string, text: string) => void
  data?: any[]
  onToggleVisibility?: (categoryId: string, widgetId: string, visible: boolean) => void
}

const AddWidgetModal: React.FC<Props> = ({ categoryId, onClose, onAdd, data = [], onToggleVisibility }) => {
  const [activeTab, setActiveTab] = useState('CSPM')
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([])
  const [customWidgetName, setCustomWidgetName] = useState('')
  const [customWidgetText, setCustomWidgetText] = useState('')

  const tabs = ['CSPM', 'CWPP', 'Image', 'Ticket']
  
  const availableWidgets = {
    'CSPM': [
      { id: 'cloud-accounts', name: 'Cloud Accounts' },
      { id: 'cloud-account-risk', name: 'Cloud Account Risk Assessment' },
      { id: 'compliance-overview', name: 'Compliance Overview' },
      { id: 'security-posture', name: 'Security Posture' },
      { id: 'resource-inventory', name: 'Resource Inventory' }
    ],
    'CWPP': [
      { id: 'namespace-alerts', name: 'Top 5 Namespace Specific Alerts' },
      { id: 'workload-alerts', name: 'Workload Alerts' },
      { id: 'runtime-protection', name: 'Runtime Protection' },
      { id: 'threat-detection', name: 'Threat Detection' },
      { id: 'container-security', name: 'Container Security' }
    ],
    'Image': [
      { id: 'image-risk', name: 'Image Risk Assessment' },
      { id: 'image-security', name: 'Image Security Issues' },
      { id: 'vulnerability-scan', name: 'Vulnerability Scan Results' },
      { id: 'malware-detection', name: 'Malware Detection' },
      { id: 'license-compliance', name: 'License Compliance' }
    ],
    'Ticket': [
      { id: 'ticket-overview', name: 'Ticket Overview' },
      { id: 'ticket-status', name: 'Ticket Status' },
      { id: 'incident-management', name: 'Incident Management' },
      { id: 'resolution-time', name: 'Resolution Time Analytics' },
      { id: 'escalation-tracker', name: 'Escalation Tracker' }
    ]
  }

  const handleWidgetToggle = (widgetId: string) => {
    setSelectedWidgets(prev => 
      prev.includes(widgetId) 
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    )
  }

  const handleConfirm = () => {
    selectedWidgets.forEach(widgetId => {
      const widget = Object.values(availableWidgets).flat().find(w => w.id === widgetId)
      if (widget) {
        onAdd(widget.name, `Widget: ${widget.name}`)
      }
    })
  }

  const handleCustomWidgetAdd = () => {
    if (customWidgetName.trim() && customWidgetText.trim()) {
      onAdd(customWidgetName, customWidgetText)
      setCustomWidgetName('')
      setCustomWidgetText('')
    }
  }

  const getCurrentCategoryWidgets = () => {
    return data.find(cat => cat.id === categoryId)?.widgets || []
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
      <div className="bg-white h-full w-96 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Add Widget</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 text-sm text-gray-600">
            Personalise your dashboard by adding the following widget
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Widget List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-3">
              <h4 className="font-medium text-gray-800 mb-3">Predefined Widgets</h4>
              {availableWidgets[activeTab as keyof typeof availableWidgets]?.map(widget => (
                <label key={widget.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedWidgets.includes(widget.id)}
                    onChange={() => handleWidgetToggle(widget.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{widget.name}</span>
                </label>
              ))}
            </div>

            {/* Custom Widget Creation */}
            <div className="p-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">Create Custom Widget</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Widget Name"
                  value={customWidgetName}
                  onChange={(e) => setCustomWidgetName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Widget Text"
                  rows={3}
                  value={customWidgetText}
                  onChange={(e) => setCustomWidgetText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button 
                  onClick={handleCustomWidgetAdd}
                  disabled={!customWidgetName.trim() || !customWidgetText.trim()}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Custom Widget
                </button>
              </div>
            </div>

            {/* Existing Widgets Management */}
            {categoryId !== 'add-widget' && onToggleVisibility && (
              <div className="p-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-3">Manage Existing Widgets</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {getCurrentCategoryWidgets().map(widget => (
                    <label key={widget.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={widget.visible}
                        onChange={(e) => onToggleVisibility(categoryId, widget.id, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <span className="text-sm text-gray-700">{widget.name}</span>
                        <span className={`ml-2 text-xs ${widget.visible ? 'text-green-600' : 'text-gray-400'}`}>
                          ({widget.visible ? 'Visible' : 'Hidden'})
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex gap-3 justify-end">
          <button 
            onClick={onClose} 
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            disabled={selectedWidgets.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddWidgetModal
