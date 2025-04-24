import React from 'react';
import CategoryCard from './CategoryCard';
import type { CategoryType } from '../types';

const categories: CategoryType[] = [
  '財務・会計',
  '運営管理',
  'マーケティング',
  '経済学・経済政策',
  '企業経営理論',
  '総合テスト'
];

const CategorySelection: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">カテゴリを選択</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;