import React, { useMemo, useState } from 'react'
import { Category, Widget } from '../App'
import WidgetCard from './WidgetCard'
import AddWidgetModal from './AddWidgetModal'
import SearchBar from './SearchBar'

type Props = {
  data: Category[]
  setData: (d: Category[]) => void
}

const Dashboard: React.FC<Props> = ({ data, setData }) => {
  const [query, setQuery] = useState('')
  const [showModalFor, setShowModalFor] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!query) return data
    const q = query.toLowerCase()
    return data.map(cat => ({
      ...cat,
      widgets: cat.widgets.filter(w => w.name.toLowerCase().includes(q) || w.text.toLowerCase().includes(q))
    }))
  }, [data, query])

  function addWidget(categoryId: string, name: string, text: string) {
    const newWidget: Widget = { id: `w-${Date.now()}`, name, text, visible: true }
    const next = data.map(cat => cat.id === categoryId ? { ...cat, widgets: [newWidget, ...cat.widgets] } : cat)
    setData(next)
  }

  function removeWidget(categoryId: string, widgetId: string) {
    const next = data.map(cat => cat.id === categoryId ? { ...cat, widgets: cat.widgets.filter(w => w.id !== widgetId) } : cat)
    setData(next)
  }

  function toggleWidgetVisibility(categoryId: string, widgetId: string, visible: boolean) {
    const next = data.map(cat => cat.id === categoryId ? { ...cat, widgets: cat.widgets.map(w => w.id === widgetId ? { ...w, visible } : w) } : cat)
    setData(next)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      {/* <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Dashboard v2</h2>
          <nav className="space-y-1">
            <div className="text-blue-600 bg-blue-50 px-3 py-2 rounded text-sm font-medium">
              CNAPP Dashboard
            </div>
            <div className="text-gray-600 px-3 py-2 text-sm">
              CSPM Executive Dashboard
            </div>
            <div className="text-gray-600 px-3 py-2 text-sm">
              Cloud Accounts
            </div>
          </nav>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">CNAPP Dashboard</h1>
            <div className="flex items-center gap-4">
              <SearchBar value={query} onChange={setQuery} />
              <button 
                onClick={() => setShowModalFor('add-widget')} 
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Add Widget +
              </button>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Last 2 days</span>
                <button className="text-blue-600">⟲</button>
                <button className="text-gray-400">⋮</button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          <div className="space-y-6">
            {filtered.map(cat => (
              <section key={cat.id}>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">{cat.title}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {cat.widgets.filter(w => w.visible).map(w => (
                    <WidgetCard key={w.id} widget={w} onRemove={() => removeWidget(cat.id, w.id)} />
                  ))}
                  {/* Add Widget Card */}
                  <div 
                    onClick={() => setShowModalFor(cat.id)}
                    className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors min-h-[200px]"
                  >
                    <div className="text-gray-400 text-2xl mb-2">+</div>
                    <div className="text-gray-600 text-sm font-medium">Add Widget</div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {showModalFor && (
        <AddWidgetModal
          categoryId={showModalFor}
          onClose={() => setShowModalFor(null)}
          onAdd={(name, text) => { 
            // For custom widgets, add to the first category if 'add-widget' is selected
            const targetCategoryId = showModalFor === 'add-widget' ? data[0]?.id : showModalFor;
            if (targetCategoryId) {
              addWidget(targetCategoryId, name, text); 
            }
            setShowModalFor(null) 
          }}
          data={data}
          onToggleVisibility={toggleWidgetVisibility}
        />
      )}
    </div>
  )
}

export default Dashboard
