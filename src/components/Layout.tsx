import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-gray-100 text-gray-600 p-4 text-center text-sm">
        <p>© {new Date().getFullYear()} 中小企業診断士 問題集アプリ</p>
      </footer>
    </div>
  );
};

export default Layout;