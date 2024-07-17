import { Suspense, useEffect, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../store";
import { fetchMovies, fetchTvShows } from "../slices/mediaSlice";

const MediaCarousel = lazy(() => import("../components/ui/MediaCarousel"));

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    movies,
    loadingMovies,
    errorMovies,
    tvShows,
    loadingTvShows,
    errorTvShows,
  } = useSelector((state: RootState) => state.media);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchTvShows());
  }, [dispatch]);

  return (
    <>
      <section className='intro text-slate-200'>
        <h1 className='text-4xl text-center text-purple-700'>
          Welcome to{" "}
          <span className='text-accent text-5xl font-bold'>Film Freak</span>
        </h1>
        <p className='text-lg text-center text-gray-500'>
          The best place to find your favorite movies
        </p>
      </section>
      <section id='featured-movies' className='mt-8'>
        <h2 className='text-2xl font-bold text-slate-300 lg:text-left text-center mb-6'>
          Featured Movies
        </h2>
        <div className='min-h-[322px]'>
          <Suspense fallback={<div>Loading...</div>}>
            <MediaCarousel
              loading={loadingMovies}
              error={errorMovies}
              media={movies}
            />
          </Suspense>
        </div>
      </section>
      <section id='featured-tv' className='mt-8'>
        <h2 className='text-2xl font-bold text-slate-300 lg:text-left text-center mb-6'>
          Featured TV Shows
        </h2>
        <div className='min-h-[322px]'>
          <Suspense fallback={<div>Loading...</div>}>
            <MediaCarousel
              loading={loadingTvShows}
              error={errorTvShows}
              media={tvShows}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default Home;
