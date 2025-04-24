import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuizResult } from '../types';
import Advertisement from './Advertisement';

interface ScoreCardProps {
  result: QuizResult;
  onRetry: () => void;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ result, onRetry }) => {
  const navigate = useNavigate();
  const percentage = Math.round((result.correctCount / result.totalQuestions) * 100);
  
  const getMessage = () => {
    if (percentage >= 80) return 'すばらしい成績です！';
    if (percentage >= 60) return '合格ラインです！';
    return 'もう少し頑張りましょう！';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <h2 className="text-2xl font-bold mb-6">{result.category}の結果</h2>
      
      <div className="mb-8">
        <div className="text-5xl font-bold mb-2 text-blue-600">
          {percentage}%
        </div>
        <div className="text-gray-600">
          {result.correctCount} / {result.totalQuestions} 問正解
        </div>
      </div>
      
      <p className="text-lg mb-8">{getMessage()}</p>
      
      <Advertisement slot="1234567890" />
      
      <div className="space-y-4 mt-8">
        <button
          onClick={onRetry}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          もう一度挑戦する
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
        >
          カテゴリー選択に戻る
        </button>
      </div>
    </div>
  );
};

export default ScoreCard;