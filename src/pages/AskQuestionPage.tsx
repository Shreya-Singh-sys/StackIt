import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { RichTextEditor } from '../components/RichTextEditor';
import { TagInput } from '../components/TagInput';

interface AskQuestionPageProps {
  onNavigateHome: () => void;
}

export function AskQuestionPage({ onNavigateHome }: AskQuestionPageProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Question submitted:', { title, description, tags });
    onNavigateHome();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={onNavigateHome}
          className="flex items-center text-slate-600 hover:text-slate-900 mb-4 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Questions
        </button>
        <h1 className="text-3xl font-bold text-slate-900">Ask a Question</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's your question? Be specific and imagine you're asking another person"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-sm text-slate-500 mt-2">
            Be specific and imagine you're asking a question to another person
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>
          <RichTextEditor
            value={description}
            onChange={setDescription}
            placeholder="Include all the information someone would need to answer your question"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tags
          </label>
          <TagInput
            tags={tags}
            onTagsChange={setTags}
            placeholder="Add tags (e.g., React, JavaScript, CSS)"
          />
          <p className="text-sm text-slate-500 mt-2">
            Add up to 5 tags to describe what your question is about
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onNavigateHome}
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post Question
          </button>
        </div>
      </form>
    </div>
  );
}