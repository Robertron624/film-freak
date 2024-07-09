import "./App.css";
import { useState } from "react";
import { useMovies } from "./hooks/useMovies";

import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

import Carousel from "react-material-ui-carousel";
import { MovieCard } from "./components/ui/MovieCard";

import { Movie } from "./types";
import { chunkArray } from "./utils";
import useMoviesPerPage from "./hooks/useMoviesPerPage";


interface CarouselWrapperProps {
  loading: boolean;
  error: boolean;
  movies: Movie[];
  moviesPerPage?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

function CarouselWrapper({ loading, error, movies, moviesPerPage={mobile:1, tablet: 3, desktop: 4} }: CarouselWrapperProps) {

  const itemsPerPage = useMoviesPerPage(moviesPerPage);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error fetching the movies</p>;
  }

  const pages = chunkArray(movies, itemsPerPage);

  return (
    <Carousel
      animation='slide'
      height={400}
      swipe={true}
      autoPlay={false}
      navButtonsAlwaysVisible={true}
      className="carousel-movies"
    >
      {pages.length > 0
        ? pages.map((page, pageIndex) => (
            <div key={pageIndex} className="wrapper-movies flex items-center h-full gap-3 lg:gap-0" style={{ display: 'flex', justifyContent: 'space-around' }}>
              {page.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ))
        : <p>No movies found</p>}
    </Carousel>
  );
}

function App() {
  const { movies, loading, error } = useMovies();
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
          <CarouselWrapper loading={loading} error={error} movies={movies} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
