import React, { createContext, useState } from 'react';

export const ReadBooksContext = createContext();

export const ReadBooksProvider = ({ children }) => {
  const [readBooks, setReadBooks] = useState([]);

  const toggleRead = (book) => {
    if (readBooks.find(readBook => readBook.key === book.key)) {
      setReadBooks(readBooks.filter(readBook => readBook.key !== book.key));
    } else {
      setReadBooks([...readBooks, book]);
    }
  };

  return (
    <ReadBooksContext.Provider value={{ readBooks, toggleRead }}>
      {children}
    </ReadBooksContext.Provider>
  );
};
