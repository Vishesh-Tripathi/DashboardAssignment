import React from 'react'
import { Widget } from '../App'

const WidgetCard: React.FC<{ widget: Widget; onRemove: () => void }> = ({ widget, onRemove }) => {
  // Sample chart component for demonstration
  const renderChart = (widgetName: string) => {
    if (widgetName.toLowerCase().includes('cloud account') && !widgetName.toLowerCase().includes('risk')) {
      return (
        <div className="flex items-center justify-center h-32">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeDasharray="50, 50"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-gray-800">2</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>
      )
    } else if (widgetName.toLowerCase().includes('risk') || widgetName.toLowerCase().includes('assessment')) {
      return (
        <div className="flex items-center justify-center h-32">
          <div className="relative w-28 h-28">
            <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                strokeDasharray="17, 83"
                strokeLinecap="round"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeDasharray="7, 93"
                strokeDashoffset="-17"
                strokeLinecap="round"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#6b7280"
                strokeWidth="3"
                strokeDasharray="1, 99"
                strokeDashoffset="-24"
                strokeLinecap="round"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="75, 25"
                strokeDashoffset="-25"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-gray-800">9659</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>
      )
    } else if (widgetName.toLowerCase().includes('image')) {
      return (
        <div className="h-32 flex items-center justify-center">
          <div className="space-y-2 w-full">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">1470</span>
              <span className="text-xs text-gray-500">Total Vulnerabilities</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 h-3 rounded-full" style={{width: '30%'}}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span className="text-red-600">Critical (9)</span>
              <span className="text-orange-500">High (150)</span>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="h-32 flex items-center justify-center text-gray-400 text-sm">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <div>No Graph data available!</div>
          </div>
        </div>
      )
    }
  }

  const renderLegend = (widgetName: string) => {
    if (widgetName.toLowerCase().includes('cloud account') && !widgetName.toLowerCase().includes('risk')) {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Connected (2)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-600">Not Connected (2)</span>
          </div>
        </div>
      )
    } else if (widgetName.toLowerCase().includes('risk') || widgetName.toLowerCase().includes('assessment')) {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Failed (1689)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Warning (681)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-sm text-gray-600">Not available (36)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Passed (7253)</span>
          </div>
        </div>
      )
    } else if (widgetName.toLowerCase().includes('image')) {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Critical (9)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600">High (150)</span>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative min-h-[250px]">
      <button 
        onClick={onRemove} 
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs border border-gray-200 hover:border-red-300"
      >
        ✕
      </button>
      
      <h3 className="font-semibold text-gray-800 mb-4 pr-8">{widget.name}</h3>
      
      <div className="flex items-start gap-4">
        <div className="flex-1">
          {renderChart(widget.name)}
        </div>
        <div className="flex-shrink-0">
          {renderLegend(widget.name)}
        </div>
      </div>
    </div>
  )
}

export default WidgetCard
