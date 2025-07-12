import React, { useState } from 'react';
import { ArrowLeft, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { RichTextEditor } from '../components/RichTextEditor';
import { sampleQuestions, sampleAnswers } from '../data/sampleData';

interface QuestionDetailPageProps {
  questionId: string;
  onNavigateHome: () => void;
}

export function QuestionDetailPage({ questionId, onNavigateHome }: QuestionDetailPageProps) {
  const [newAnswer, setNewAnswer] = useState('');
  const question = sampleQuestions.find(q => q.id === questionId);
  const answers = sampleAnswers.filter(a => a.questionId === questionId);

  if (!question) {
    return <div>Question not found</div>;
  }

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Answer submitted:', newAnswer);
    setNewAnswer('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onNavigateHome}
        className="flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Questions
      </button>

      {/* Question */}
      <div className="bg-white rounded-lg border border-slate-200 mb-8">
        <div className="p-6">
          <div className="flex gap-6">
            {/* Vote Controls */}
            <div className="flex flex-col items-center">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
                <ChevronUp size={24} />
              </button>
              <span className="text-lg font-semibold text-slate-900 my-2">
                {question.votes}
              </span>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
                <ChevronDown size={24} />
              </button>
            </div>

            {/* Question Content */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 mb-4">
                {question.title}
              </h1>
              
              <div className="prose max-w-none mb-6 text-slate-700">
                {question.content}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center space-x-4">
                  <span>Asked {question.timeAgo}</span>
                  <span>Viewed {question.views} times</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <img
                    src={question.authorAvatar}
                    alt={question.author}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-medium">{question.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          {answers.length} Answer{answers.length !== 1 ? 's' : ''}
        </h2>

        <div className="space-y-6">
          {answers.map((answer) => (
            <div key={answer.id} className="bg-white rounded-lg border border-slate-200">
              <div className="p-6">
                <div className="flex gap-6">
                  {/* Vote Controls */}
                  <div className="flex flex-col items-center">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
                      <ChevronUp size={20} />
                    </button>
                    <span className="text-lg font-semibold text-slate-900 my-2">
                      {answer.votes}
                    </span>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
                      <ChevronDown size={20} />
                    </button>
                    {answer.isAccepted && (
                      <div className="mt-2 p-2 bg-green-100 text-green-600 rounded">
                        <Check size={20} />
                      </div>
                    )}
                  </div>

                  {/* Answer Content */}
                  <div className="flex-1">
                    <div className="prose max-w-none mb-4 text-slate-700">
                      {answer.content}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        {!answer.isAccepted && (
                          <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                            Accept Answer
                          </button>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-slate-500">
                        <span>{answer.timeAgo}</span>
                        <img
                          src={answer.authorAvatar}
                          alt={answer.author}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="font-medium">{answer.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Answer Form */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Answer</h3>
        
        <form onSubmit={handleSubmitAnswer}>
          <RichTextEditor
            value={newAnswer}
            onChange={setNewAnswer}
            placeholder="Write your answer here..."
          />
          
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post Answer
            </button>
            <button
              type="button"
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}