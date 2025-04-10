import React, { createContext, ReactNode, useState } from 'react';

export const FavoritesContext = createContext([null]);

export const FavoritesProvider = ({ children }: {children: ReactNode}) => {
  const [value, setValue] = useState('Hello, Next.js!');

  return (
    <FavoritesContext.Provider value={1}>
      {children}
    </FavoritesContext.Provider>
  );
};

