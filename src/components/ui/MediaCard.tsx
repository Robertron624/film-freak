import React from "react";
import { Movie, TVShow } from "../../types";
import { isMovie } from "../../utils";
import useLazyLoadImage from "./useLazyLoadImage";


interface MediaCardProps {
  media: Movie | TVShow;
}

export const MediaCard = ({ media }: MediaCardProps) => {

  const title = isMovie(media) ? media.title : media.name; // Title for Movie and TVShow
  const mediaUrl = isMovie(media) ? `/movies/${media.id}` : `/tv-shows/${media.id}`; // URL for Movie and TVShow

  const mediaPoster = media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}` : '/images/no-image-available.png';
  const mediaOverview = media.overview ? media.overview : 'No overview available';

  const imgRef = useLazyLoadImage(mediaPoster);

  return (
    <div className='w-[240px] text-slate-100 rounded-md bg-light-purple px-2 py-4'
      id={`media-card-${media.id}`} data-testid={`media-card-${media.id}`}
    >
      <a href={mediaUrl}>
        <img
          ref={imgRef}
          src={mediaPoster}
          alt={title}
          width={100}
          height={150}
          className='w-[100px] h-[150px] rounded-md object-contain mx-auto'
          data-src={mediaPoster}
        />
        <div className='media-card-content text-center'>
          <h2 className='text-sm font-bold text-purple-700 mt-2 mb-3  text-accent text-ellipsis overflow-hidden max-h-14 line-clamp-1'>
            {title}
          </h2>
          <p className='text-xs text-slate-200 mb-2 text-ellipsis overflow-hidden h-12 line-clamp-3'>
            {mediaOverview}
          </p>
        </div>
      </a>
    </div>
  );
};
