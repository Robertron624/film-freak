import { Movie } from "../../types";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className='movie-card max-w-[240px] text-slate-100 rounded-md bg-light-purple px-2 py-4'>
      <a href={`/movies/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={100}
          height={150}
          className='w-[100px] h-[150px] rounded-md object-cover mx-auto'
        />
        <div className='movie-card-content'>
          <h2 className='text-sm font-bold text-purple-700 mt-2 mb-3 text-center text-accent text-ellipsis overflow-hidden max-h-14 line-clamp-1'>
            {movie.title}
          </h2>
          <p className='text-xs text-slate-200 mb-2 text-ellipsis overflow-hidden max-h-14 line-clamp-3'>
            {movie.overview}
          </p>
        </div>
      </a>
    </div>
  );
};
