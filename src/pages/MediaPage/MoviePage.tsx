import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useFetchMedia } from "../../hooks/useFetchMedia";
import { Movie } from "../../types";
import StarRating from "../../components/ui/StarRating";

function getYearFromDate(date: string) {
  // date format: yyyy-mm-dd, get the year
  return date.split("-")[0];
}

function formatRevenue(revenue: number) {
    return revenue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
    }


export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: movie,
    loading,
    error,
  } = useFetchMedia<Movie>(`https://api.themoviedb.org/3/movie/${id}`);

  if (loading)
    return (
      <div className='mt-16 flex justify-center'>
        <CircularProgress color='secondary' size={100} thickness={5} />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  console.log("movie", movie);

  return (
    <div className='grid grid-cols-2'>
      <div className='poster-container'>
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.title}
            width={500}
            height={750}
            className='md:w-[500px] md:h-[750px] w-64 h-[400px] object-cover'
          />
        </figure>
      </div>
      <div>
        <div>
          <h1 className='text-4xl font-bold text-white'>
            {movie?.title} ({getYearFromDate(movie?.release_date || "")})
          </h1>
          <div className='flex gap-1 mt-2'>
            {movie?.genres.map((genre) => {
              const isLastItem =
                movie.genres.indexOf(genre) === movie.genres.length - 1;

              return (
                <span key={genre.id} className='text-sm text-gray-400'>
                  {genre.name}
                    {!isLastItem && ","}
                </span>
              );
            })}
          </div>
        </div>
        <div className="mt-6">
            <h2 className='text-2xl font-bold text-white'>Overview</h2>
            <p className='text-gray-400 mt-2 text-xl'>{movie?.overview}</p>
        </div>
        <div className="flex flex-col mt-6">
            <div className="grid grid-cols-2 max-w-60">
                <span className='text-white font-bold'>Runtime: </span>
                <span className='text-gray-400'>{movie?.runtime} minutes</span>
            </div>
            <div className="grid grid-cols-2 max-w-60">
                <span className='text-white font-bold'>Language: </span>
                <span className='text-gray-400'>{movie?.original_language}</span>
            </div>
            <div className="grid grid-cols-2 max-w-60">
                <span className='text-white font-bold'>Popularity: </span>
                <span className='text-gray-400'>{movie?.popularity}</span>
            </div>
            <div className="grid grid-cols-2 max-w-60">
                <span className='text-white font-bold'>Country: </span>
                <span className='text-gray-400'>{movie?.origin_country[0]}</span>
            </div>
            <div className="grid grid-cols-2 max-w-60">
                <span className='text-white font-bold'>Global revenue: </span>
                <span className='text-gray-400'>{formatRevenue(movie?.revenue || 0)}</span>
            </div>
        </div>
        <div className="mt-5">
            <h2 className='text-2xl font-bold text-white'>Production Companies</h2>
            <div className="grid grid-cols-2 gap-2 mt-6">
                {movie?.production_companies.map((company) => (
                    <div key={company.id} className="flex items-center justify-center gap-2 flex-col bg-slate-200 rounded-md py-3">
                        <img
                            src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                            alt={company.name}
                            width={90}
                            height={90}
                            className='object-contain'
                        />
                    </div>
                ))}
            </div>
        </div>
        <div className="flex gap-2 items-center mt-6">
            <h3 className="text-2xl font-bold text-white">
                Rating
            </h3>
            <StarRating rating={movie?.vote_average || 0} />
        </div>
        <div className="mt-6">
            <h3 className="text-2xl font-bold text-white">
                Collection
            </h3>
            <div className="flex flex-col mt-4 gap-2">
                <img
                    src={`https://image.tmdb.org/t/p/w92${movie?.belongs_to_collection.poster_path}`}
                    alt={movie?.belongs_to_collection.name}
                    width={90}
                    height={90}
                    className='object-contain'
                />
                <p className="text-gray-400 max-w-20 text-center">{movie?.belongs_to_collection.name}</p>
            </div>
        </div>
      </div>
    </div>
  );
}
