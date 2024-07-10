import "./App.css";
import { useState } from "react";
import { useGetMedia } from "./hooks/useGetMedia";

import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

import Carousel from "react-material-ui-carousel";
import { MediaCard } from "./components/ui/MediaCard";

import { Media } from "./types";
import { chunkArray } from "./utils";
import useItemsPerPage from "./hooks/useItemsPerPage";
import { CircularProgress } from "@mui/material";

interface CarouselProps {
  loading: boolean;
  error: boolean;
  media: Media[];
  moviesPerPage?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

function MediaCarousel({
  loading,
  error,
  media,
  moviesPerPage = { mobile: 1, tablet: 3, desktop: 4 },
}: CarouselProps) {
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

function App() {
  const {
    media: movies,
    loading: loadingMovies,
    error: errorMovies,
  } = useGetMedia("movie");
  const {
    media: tvShows,
    loading: loadingTvShows,
    error: errorTvShows,
  } = useGetMedia("tv");
  const [search, setSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);

  return (
    <>
      <Header />
      <main className='flex-1 py-4 w-11/12 mx-auto'>
        <section className='intro text-slate-200'>
          <h1 className='text-4xl text-center text-purple-700'>
            Welcome to{" "}
            <span className='text-accent text-5xl font-bold'>Film Freak</span>
          </h1>
          <p className='text-lg text-center text-gray-500'>
            The best place to find your favorite movies
          </p>
        </section>
        <section id='featured' className='mt-4'>
          <h2 className='text-2xl font-bold text-slate-300'>Featured Movies</h2>
          <MediaCarousel
            loading={loadingMovies}
            error={errorMovies}
            media={movies}
          />
        </section>
        <section id='featured' className='mt-4'>
          <h2 className='text-2xl font-bold text-slate-300'>Featured TV Shows</h2>
          <MediaCarousel
            loading={loadingTvShows}
            error={errorTvShows}
            media={tvShows}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
