import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { TVShow } from '../../types';

import { useFetchMedia } from '../../hooks/useFetchMedia';
import { Poster, MediaDetails } from '../../components/ui/MediaPageComponents';

export default function TVShowPage() {
  const { id } = useParams<{ id: string }>();

  const { data: tvShow, loading, error } = useFetchMedia<TVShow>(
    `https://api.themoviedb.org/3/tv/${id}`
  );

  if (loading)
    return (
      <div className='mt-16 flex justify-center'>
        <CircularProgress color='secondary' size={100} thickness={5} />
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2'>
      <Poster imageUrl={tvShow?.poster_path || ''} title={tvShow?.name || ''} />
      <MediaDetails
        title={tvShow?.name || ''}
        releaseDate={tvShow?.first_air_date || ''}
        genres={tvShow?.genres || []}
        overview={tvShow?.overview || ''}
        runtime={tvShow?.episode_run_time[0]}
        language={tvShow?.original_language || ''}
        country={tvShow?.origin_country[0] || ''}
        productionCompanies={tvShow?.production_companies || []}
        rating={tvShow?.vote_average || 0}
        voteCount={tvShow?.vote_count || 0}
        numberOfEpisodes={tvShow?.number_of_episodes || 0}
        numberOfSeasons={tvShow?.number_of_seasons || 0}
      />
    </div>
  );
}
