import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, // 財務・会計
  Settings, // 運営管理
  ShoppingBag, // マーケティング
  BarChart, // 経済学・経済政策
  Building2, // 企業経営理論
  GraduationCap // 総合テスト
} from 'lucide-react';
import type { CategoryType } from '../types';

interface CategoryCardProps {
  category: CategoryType;
}

const getCategoryIcon = (category: CategoryType) => {
  switch (category) {
    case '財務・会計':
      return <BookOpen size={24} />;
    case '運営管理':
      return <Settings size={24} />;
    case 'マーケティング':
      return <ShoppingBag size={24} />;
    case '経済学・経済政策':
      return <BarChart size={24} />;
    case '企業経営理論':
      return <Building2 size={24} />;
    case '総合テスト':
      return <GraduationCap size={24} />;
    default:
      return <BookOpen size={24} />;
  }
};

const getCategoryColor = (category: CategoryType) => {
  switch (category) {
    case '財務・会計':
      return 'bg-blue-500 hover:bg-blue-600';
    case '運営管理':
      return 'bg-green-500 hover:bg-green-600';
    case 'マーケティング':
      return 'bg-purple-500 hover:bg-purple-600';
    case '経済学・経済政策':
      return 'bg-amber-500 hover:bg-amber-600';
    case '企業経営理論':
      return 'bg-indigo-500 hover:bg-indigo-600';
    case '総合テスト':
      return 'bg-rose-500 hover:bg-rose-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();
  const categoryColor = getCategoryColor(category);
  const icon = getCategoryIcon(category);

  const handleClick = () => {
    navigate(`/question/${encodeURIComponent(category)}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`${categoryColor} text-white rounded-lg p-6 shadow-md transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center gap-3 w-full h-40`}
    >
      <div className="text-3xl">{icon}</div>
      <div className="font-bold text-lg">{category}</div>
    </button>
  );
};

export default CategoryCard;