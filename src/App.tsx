import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "./store";
import { fetchMovies, fetchTvShows } from "./slices/mediaSlice";

import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

import MediaCarousel from "./components/ui/MediaCarousel";

function App() {

  const dispatch = useDispatch<AppDispatch>();

  const {
    movies,
    loadingMovies,
    errorMovies,
    tvShows,
    loadingTvShows,
    errorTvShows,
    search,
  } = useSelector((state: RootState) => state.media);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchTvShows());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className='flex-1 py-4 w-11/12 mx-auto'>
        <p className="text-3xl text-red-600">
          Search term: {search}
        </p>
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
          <h2 className='text-2xl font-bold text-slate-300'>
            Featured TV Shows
          </h2>
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
