import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { AskQuestionPage } from './pages/AskQuestionPage';
import { QuestionDetailPage } from './pages/QuestionDetailPage';
import { NotificationProvider } from './context/NotificationContext';

type Page = 'home' | 'ask' | 'question';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  const navigateToHome = () => setCurrentPage('home');
  const navigateToAsk = () => setCurrentPage('ask');
  const navigateToQuestion = (id: string) => {
    setSelectedQuestionId(id);
    setCurrentPage('question');
  };

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-slate-50">
        <Navigation 
          onNavigateHome={navigateToHome}
          onNavigateAsk={navigateToAsk}
          currentPage={currentPage}
        />
        
        <main>
          {currentPage === 'home' && (
            <HomePage onNavigateToQuestion={navigateToQuestion} />
          )}
          {currentPage === 'ask' && (
            <AskQuestionPage onNavigateHome={navigateToHome} />
          )}
          {currentPage === 'question' && selectedQuestionId && (
            <QuestionDetailPage 
              questionId={selectedQuestionId}
              onNavigateHome={navigateToHome}
            />
          )}
        </main>
      </div>
    </NotificationProvider>
  );
}

export default App;