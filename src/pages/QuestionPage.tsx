import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import ScoreCard from '../components/ScoreCard';
import { useFavorites } from '../hooks/useFavorites';
import questionsData from '../data/questions.json';
import { Question, CategoryType, QuizResult } from '../types';
import { shuffleArray } from '../utils';

const QUESTIONS_PER_CATEGORY = 12;

const QuestionPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = category ? decodeURIComponent(category) as CategoryType : null;
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showScore, setShowScore] = useState(false);
  
  useEffect(() => {
    if (!category) {
      navigate('/');
      return;
    }

    let filteredQuestions = [];
    if (decodedCategory === '総合テスト') {
      // For comprehensive test, take 2-3 questions from each category
      const categories = ['財務・会計', '運営管理', 'マーケティング', '経済学・経済政策', '企業経営理論'];
      filteredQuestions = categories.flatMap(cat => {
        const categoryQuestions = questionsData.filter((q: Question) => q.category === cat);
        return shuffleArray(categoryQuestions).slice(0, Math.ceil(QUESTIONS_PER_CATEGORY / categories.length));
      });
    } else {
      filteredQuestions = questionsData.filter(
        (q: Question) => q.category === decodedCategory
      );
    }

    if (filteredQuestions.length === 0 && category !== 'favorites') {
      navigate('/');
      return;
    }

    const selectedQuestions = shuffleArray(filteredQuestions).slice(0, QUESTIONS_PER_CATEGORY);
    setQuestions(selectedQuestions);
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setShowScore(false);
  }, [category, decodedCategory, navigate]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRetry = () => {
    let filteredQuestions = [];
    if (decodedCategory === '総合テスト') {
      const categories = ['財務・会計', '運営管理', 'マーケティング', '経済学・経済政策', '企業経営理論'];
      filteredQuestions = categories.flatMap(cat => {
        const categoryQuestions = questionsData.filter((q: Question) => q.category === cat);
        return shuffleArray(categoryQuestions).slice(0, Math.ceil(QUESTIONS_PER_CATEGORY / categories.length));
      });
    } else {
      filteredQuestions = questionsData.filter(
        (q: Question) => q.category === decodedCategory
      );
    }
    
    const selectedQuestions = shuffleArray(filteredQuestions).slice(0, QUESTIONS_PER_CATEGORY);
    setQuestions(selectedQuestions);
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setShowScore(false);
  };

  if (!currentQuestion && !showScore) {
    return (
      <div className="text-center p-12">
        <p className="text-xl mb-4">質問が見つかりませんでした</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          ホームに戻る
        </button>
      </div>
    );
  }

  if (showScore) {
    const result: QuizResult = {
      correctCount: correctAnswers,
      totalQuestions: QUESTIONS_PER_CATEGORY,
      category: decodedCategory!
    };
    return (
      <div className="max-w-2xl mx-auto">
        <ScoreCard result={result} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{decodedCategory || 'お気に入り問題'}</h1>
        <p className="text-gray-600">
          問題 {currentIndex + 1} / {QUESTIONS_PER_CATEGORY}
        </p>
      </div>

      <QuestionCard
        question={currentQuestion}
        onNext={handleNext}
        onAnswer={handleAnswer}
        isFavorite={isFavorite(currentQuestion.id)}
        onToggleFavorite={() => toggleFavorite(currentQuestion.id)}
      />
    </div>
  );
};

export default QuestionPage;