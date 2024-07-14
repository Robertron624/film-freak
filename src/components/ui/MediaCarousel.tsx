
import Carousel from "react-material-ui-carousel";
import { MediaCard } from "./MediaCard";

import { Movie, TVShow } from "../../types";
import { chunkArray } from "../../utils";
import useItemsPerPage from "../../hooks/useItemsPerPage";
import { CircularProgress } from "@mui/material";

interface CarouselProps<T extends Movie | TVShow>  {
    loading: boolean;
    error: boolean;
    media: T[];
    moviesPerPage?: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
  }
  
export default function MediaCarousel<T extends Movie | TVShow>({
    loading,
    error,
    media,
    moviesPerPage = { mobile: 1, tablet: 3, desktop: 4 },
  }: CarouselProps<T>) {
    const itemsPerPage = useItemsPerPage(moviesPerPage);
  
    if (loading) {
      return (
        <div className='mt-16 flex justify-center'>
          <CircularProgress color='secondary' size={100} thickness={5} />
        </div>
      );
    }
  
    if (error) {
      return <p>There was an error fetching the movies</p>;
    }
  
    const pages = chunkArray(media, itemsPerPage);
  
    return (
      <Carousel
        animation='slide'
        height={400}
        swipe={true}
        autoPlay={false}
        navButtonsAlwaysVisible={true}
        className='carousel-movies'
      >
        {pages.length > 0 ? (
          pages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className='wrapper-movies flex items-center h-full gap-3 lg:gap-0'
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              {page.map((media) => (
                <MediaCard key={media.id} media={media} />
              ))}
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </Carousel>
    );
  }