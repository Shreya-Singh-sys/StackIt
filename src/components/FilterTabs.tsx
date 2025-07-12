import React from 'react';

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  const filters = [
    { id: 'newest', label: 'Newest' },
    { id: 'unanswered', label: 'Unanswered' },
    { id: 'active', label: 'Active' },
    { id: 'votes', label: 'Most Votes' }
  ];

  return (
    <div className="flex space-x-1 mb-6 bg-white border border-slate-200 rounded-lg p-1">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === filter.id
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}