import React, { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Link, 
  Image,
  Smile,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [activeTools, setActiveTools] = useState<string[]>([]);

  const tools = [
    { id: 'bold', icon: Bold, command: 'bold' },
    { id: 'italic', icon: Italic, command: 'italic' },
    { id: 'underline', icon: Underline, command: 'underline' },
    { id: 'strikethrough', icon: Strikethrough, command: 'strikeThrough' },
    { id: 'separator1', icon: null, command: null },
    { id: 'bulletList', icon: List, command: 'insertUnorderedList' },
    { id: 'numberedList', icon: ListOrdered, command: 'insertOrderedList' },
    { id: 'separator2', icon: null, command: null },
    { id: 'link', icon: Link, command: 'createLink' },
    { id: 'image', icon: Image, command: 'insertImage' },
    { id: 'emoji', icon: Smile, command: 'insertEmoji' },
    { id: 'separator3', icon: null, command: null },
    { id: 'alignLeft', icon: AlignLeft, command: 'justifyLeft' },
    { id: 'alignCenter', icon: AlignCenter, command: 'justifyCenter' },
    { id: 'alignRight', icon: AlignRight, command: 'justifyRight' }
  ];

  const executeCommand = (command: string) => {
    if (command === 'createLink') {
      const url = prompt('Enter URL:');
      if (url) {
        document.execCommand(command, false, url);
      }
    } else if (command === 'insertImage') {
      const url = prompt('Enter image URL:');
      if (url) {
        document.execCommand(command, false, url);
      }
    } else if (command === 'insertEmoji') {
      const emoji = prompt('Enter emoji:');
      if (emoji) {
        document.execCommand('insertText', false, emoji);
      }
    } else {
      document.execCommand(command, false);
    }
  };

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-slate-50 border-b border-slate-300 p-2 flex items-center space-x-1">
        {tools.map((tool) => {
          if (!tool.icon) {
            return <div key={tool.id} className="w-px h-6 bg-slate-300 mx-1" />;
          }

          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => tool.command && executeCommand(tool.command)}
              className={`p-2 rounded hover:bg-slate-200 transition-colors ${
                activeTools.includes(tool.id) ? 'bg-slate-200' : ''
              }`}
            >
              <Icon size={16} className="text-slate-600" />
            </button>
          );
        })}
      </div>

      {/* Editor */}
      <div
        contentEditable
        className="min-h-[200px] p-4 focus:outline-none prose max-w-none"
        style={{ whiteSpace: 'pre-wrap' }}
        onInput={(e) => onChange(e.currentTarget.textContent || '')}
        suppressContentEditableWarning
      >
        {!value && (
          <div className="text-slate-400 pointer-events-none">
            {placeholder || 'Write your content here...'}
          </div>
        )}
      </div>
    </div>
  );
}