import { useEffect, useRef } from 'react';

const useLazyLoadImage = (src: string) => {
    const imgRef = useRef<HTMLImageElement | null>(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && imgRef.current) {
              imgRef.current.src = src;
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '0px',
          threshold: 0.1,
        }
      );
  
      if (imgRef.current) {
        observer.observe(imgRef.current);
      }
  
      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }, [src]);
  
    return imgRef;
  };

export default useLazyLoadImage;