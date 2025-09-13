import React, { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import initialData from './data/widgets.json'

export type Widget = {
  id: string
  name: string
  text: string
  visible: boolean
}

export type Category = {
  id: string
  title: string
  widgets: Widget[]
}

const App: React.FC = () => {
  const [data, setData] = useState<Category[]>(() => {
    // load from localStorage or initialData
    try {
      const raw = localStorage.getItem('dashboard-data')
      if (raw) return JSON.parse(raw)
    } catch (e) {}
    return initialData as Category[]
  })

  useEffect(() => {
    localStorage.setItem('dashboard-data', JSON.stringify(data))
  }, [data])

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard data={data} setData={setData} />
    </div>
  )
}

export default App
