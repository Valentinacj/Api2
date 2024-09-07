import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (book) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((fav) => fav.key === book.key)) {
        return prevFavorites.filter((fav) => fav.key !== book.key);
      } else {
        return [...prevFavorites, book];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
