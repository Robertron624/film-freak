import Grid from "@mui/material/Unstable_Grid2";

import { Media } from "../../types";

interface MediaGridItemProps {
  media: Media;
}

export const MediaGridItem = ({ media }: MediaGridItemProps) => {
  const title = 'title' in media ? media.title : media.name;

  const mediaUrl = 'release_date' in media ? `/movies/${media.id}` : `/tv/${media.id}`;

  const mediaPoster = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : '/images/no-image-available.png';

  const mediaOverview = media.overview ? media.overview : 'No overview available';

  return (
    <Grid xs={12} sm={6} md={4} lg={3}>
      <div className='movie-card w-11/12 text-slate-100 rounded-md bg-light-purple px-2 py-4 hover:scale-110 duration-700'>
        <a href={mediaUrl}>
          <img
            src={mediaPoster}
            alt={title}
            width={100}
            height={150}
            className='w-[100px] h-[150px] rounded-md object-contain mx-auto'
          />
          <div className='media-card-content text-center'>
            <h2 className='text-sm font-bold text-purple-700 mt-2 mb-3 text-accent text-ellipsis overflow-hidden max-h-14 line-clamp-1'>
              {title}
            </h2>
            <p className='text-xs text-slate-200 mb-2 text-ellipsis overflow-hidden h-12 line-clamp-3'>
              {mediaOverview}
            </p>
          </div>
        </a>
      </div>
    </Grid>
  );
};

interface SearchResultGridProps {
  results: Media[];
}
export default function SearchResultGrid({ results }: SearchResultGridProps) {
  return (
    <div>
      <Grid container spacing={4}>
        {results.map((media) => (
          <MediaGridItem key={media.id} media={media} />
        ))}
      </Grid>
    </div>
  );
}
