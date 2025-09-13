import React from 'react'

const SearchBar: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder="Search anything..." 
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-80 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
      />
    </div>
  )
}

export default SearchBar
