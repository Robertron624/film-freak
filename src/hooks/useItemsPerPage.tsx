import { useState, useEffect } from 'react';

interface ItemsPerPageProps {
  mobile: number;
  tablet: number;
  desktop: number;
}

const useItemsPerPage = (cardPerPage: ItemsPerPageProps): number => {
  const [itemsPerPage, setItemsPerPage] = useState(cardPerPage.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(cardPerPage.mobile);
      } else if (window.innerWidth < 1064) {
        setItemsPerPage(cardPerPage.tablet);
      } else {
        setItemsPerPage(cardPerPage.desktop);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [cardPerPage]);

  return itemsPerPage;
};

export default useItemsPerPage;
