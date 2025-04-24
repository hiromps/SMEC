import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import questionsData from '../data/questions.json';
import type { Question } from '../types';

const FavoritesPage: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const favoriteQuestions = questionsData.filter((q: Question) => 
    favorites.includes(q.id)
  );

  if (favoriteQuestions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <div className="my-12">
          <Star size={48} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-4">お気に入りはまだありません</h1>
          <p className="text-gray-600 mb-8">
            問題を解きながら、復習したい問題に★マークを付けてください。
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            問題を解く
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">お気に入り問題一覧</h1>
      <p className="mb-6 text-gray-600">
        お気に入りに登録した問題: {favoriteQuestions.length}問
      </p>

      <div className="space-y-4">
        {favoriteQuestions.map((question: Question) => (
          <div 
            key={question.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="bg-blue-900 text-white p-3 flex justify-between items-center">
              <h3 className="font-medium text-sm">{question.category}</h3>
              <button
                onClick={() => toggleFavorite(question.id)}
                className="text-amber-400 focus:outline-none transition-transform hover:scale-110"
              >
                <Star size={20} fill="#FBBF24" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-800 mb-4 line-clamp-2">{question.question}</p>
              <div className="flex justify-end">
                <Link
                  to={`/question/${encodeURIComponent(question.category)}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  このカテゴリの問題を解く →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;