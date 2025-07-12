import React, { useState } from 'react';
import { QuestionCard } from '../components/QuestionCard';
import { FilterTabs } from '../components/FilterTabs';
import { Pagination } from '../components/Pagination';
import { sampleQuestions } from '../data/sampleData';

interface HomePageProps {
  onNavigateToQuestion: (id: string) => void;
}

export function HomePage({ onNavigateToQuestion }: HomePageProps) {
  const [activeFilter, setActiveFilter] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">All Questions</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Ask Question
        </button>
      </div>

      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div className="space-y-4 mb-8">
        {sampleQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onClick={() => onNavigateToQuestion(question.id)}
          />
        ))}
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={5}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}