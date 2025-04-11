"use client"
import React, { createContext, ReactNode, useState } from 'react';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';


type TFavoriteContext = {
  favorites: number[];
  handleFavorites: (id: number) => void;
}

export const FavoritesContext = createContext({} as TFavoriteContext);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {

  const [favorites, setFavorites] = useState(() => {
    const myFavorites = localStorage.getItem('myFavorites');
    return myFavorites ? JSON.parse(myFavorites) : [];
  });

  const handleFavorites = (id: number) => {

    const stored = localStorage.getItem('myFavorites');
    const favoritesArray: number[] = stored ? JSON.parse(stored) : [];

    if (!favorites.includes(id)) {
      favoritesArray.push(id);
      localStorage.setItem('myFavorites', JSON.stringify(favoritesArray));
      setFavorites(favoritesArray);
      // Swal.fire({
      //   title: 'Added to your favorites!',
      //   icon: 'success',
      //   confirmButtonText: 'OK'
      // })
      toast.success('Added to your favorites!')

    }
    else if (favorites.includes(id)) {
      Swal.fire({
        title: "Remove from your favorites?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedFavorites = favoritesArray.filter(favId => favId !== id);
          localStorage.setItem('myFavorites', JSON.stringify(updatedFavorites));
          setFavorites(updatedFavorites);
          toast.success('Removed from your favorites!')

        }
      });
    }


  }

  return (
    <FavoritesContext.Provider value={{ favorites, handleFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

