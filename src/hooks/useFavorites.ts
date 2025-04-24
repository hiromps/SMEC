import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (questionId: string) => {
    setFavorites((prev) => {
      if (prev.includes(questionId)) {
        return prev;
      }
      return [...prev, questionId];
    });
  };

  const removeFavorite = (questionId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== questionId));
  };

  const toggleFavorite = (questionId: string) => {
    if (favorites.includes(questionId)) {
      removeFavorite(questionId);
    } else {
      addFavorite(questionId);
    }
  };

  const isFavorite = (questionId: string): boolean => {
    return favorites.includes(questionId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
};