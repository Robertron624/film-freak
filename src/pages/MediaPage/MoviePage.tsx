import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useFetchMedia } from "../../hooks/useFetchMedia";
import { Movie } from "../../types";
import { Poster, MediaDetails } from "../../components/ui/MediaPageComponents";

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
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2'>
      <Poster
        imageUrl={movie?.poster_path || ""}
        title={movie?.title || ""}
      />
      <MediaDetails
        title={movie?.title || ""}
        releaseDate={movie?.release_date || ""}
        genres={movie?.genres || []}
        overview={movie?.overview || ""}
        runtime={movie?.runtime}
        language={movie?.original_language || ""}
        country={movie?.origin_country[0] || ""}
        revenue={movie?.revenue}
        productionCompanies={movie?.production_companies || []}
        rating={movie?.vote_average || 0}
        voteCount={movie?.vote_count || 0}
        collectionName={movie?.belongs_to_collection?.name || ""}
        collectionImageUrl={movie?.belongs_to_collection?.poster_path || ""}
      />
    </div>
  );
}
