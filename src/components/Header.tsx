import React from 'react';
import { BookOpenCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <BookOpenCheck size={24} />
          <span>中小企業診断士 問題集</span>
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link to="/" className="hover:text-blue-200 transition-colors">
                ホーム
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-blue-200 transition-colors">
                お気に入り
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;