import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenCheck, Star } from 'lucide-react';
import CategorySelection from '../components/CategorySelection';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <BookOpenCheck size={48} className="text-blue-700" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-blue-900">中小企業診断士 問題集</h1>
        <p className="text-lg text-gray-600 mb-6">
          カテゴリごとに厳選された問題を解いて、実力を養いましょう
        </p>
        
        <div className="flex justify-center gap-4 mb-8">
          <Link
            to="/favorites"
            className="flex items-center gap-2 bg-amber-100 text-amber-800 px-5 py-2 rounded-lg border border-amber-200 hover:bg-amber-200 transition-colors"
          >
            <Star size={20} />
            <span>お気に入り問題</span>
          </Link>
        </div>
      </div>
      
      <CategorySelection />
    </div>
  );
};

export default Home;