import { useState, useEffect } from 'react';

interface MoviesPerPage {
  mobile: number;
  tablet: number;
  desktop: number;
}

const useMoviesPerPage = (moviesPerPage: MoviesPerPage): number => {
  const [itemsPerPage, setItemsPerPage] = useState(moviesPerPage.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(moviesPerPage.mobile);
      } else if (window.innerWidth < 1064) {
        setItemsPerPage(moviesPerPage.tablet);
      } else {
        setItemsPerPage(moviesPerPage.desktop);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [moviesPerPage]);

  return itemsPerPage;
};

export default useMoviesPerPage;
