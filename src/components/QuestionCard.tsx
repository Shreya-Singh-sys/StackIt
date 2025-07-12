import React from 'react';
import { Eye, MessageCircle, ArrowUp } from 'lucide-react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onClick: () => void;
}

export function QuestionCard({ question, onClick }: QuestionCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
    >
      <div className="flex gap-6">
        {/* Stats */}
        <div className="flex flex-col items-center space-y-3 text-sm text-slate-600">
          <div className="flex items-center space-x-1 bg-slate-100 px-3 py-1 rounded">
            <ArrowUp size={16} />
            <span>{question.votes}</span>
          </div>
          <div className={`flex items-center space-x-1 px-3 py-1 rounded ${
            question.answers > 0 ? 'bg-green-100 text-green-700' : 'bg-slate-100'
          }`}>
            <MessageCircle size={16} />
            <span>{question.answers}</span>
          </div>
          <div className="flex items-center space-x-1 bg-slate-100 px-3 py-1 rounded">
            <Eye size={16} />
            <span>{question.views}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 mb-3 line-clamp-2">
            {question.title}
          </h3>
          
          <p className="text-slate-600 mb-4 line-clamp-2">
            {question.content}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-teal-100 text-teal-800 hover:bg-teal-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <img
                src={question.authorAvatar}
                alt={question.author}
                className="w-6 h-6 rounded-full"
              />
              <span>{question.author}</span>
              <span>•</span>
              <span>{question.timeAgo}</span>
            </div>
            {question.isAnswered && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                Answered
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}