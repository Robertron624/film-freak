// Poster.tsx
import React from "react";
import StarRating from "./StarRating";

import {
  MediaStatus,
  PersonKnowForDepartment,
  ProductionCompany,
} from "../../types";

interface PosterProps {
  imageUrl: string;
  title?: string;
  name?: string;
  width?: number;
  height?: number;
}

export const Poster: React.FC<PosterProps> = ({
  imageUrl,
  title,
  width = 500,
  height = 750,
}) => (
  <div className='poster-container'>
    <figure>
      <img
        src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
        alt={title}
        width={width}
        height={height}
        className='md:w-[500px] md:h-[750px] w-64 h-[400px] mx-auto md:mx-0 rounded-md'
      />
    </figure>
  </div>
);

interface MediaDetailsProps {
  title: string;
  releaseDate: string;
  genres: { id: number; name: string }[];
  overview: string;
  runtime?: number;
  language: string;
  country: string;
  revenue?: number;
  budget?: number;
  productionCompanies: ProductionCompany[];
  rating: number;
  voteCount: number;
  collectionName?: string;
  collectionImageUrl?: string;
  numberOfEpisodes?: number;
  numberOfSeasons?: number;
  status?: MediaStatus;
}

export const MediaDetails: React.FC<MediaDetailsProps> = ({
  title,
  releaseDate,
  genres,
  overview,
  runtime,
  language,
  country,
  revenue,
  budget,
  productionCompanies,
  rating,
  voteCount,
  collectionName,
  collectionImageUrl,
  numberOfEpisodes,
  numberOfSeasons,
    status,
}) => {
  function getYearFromDate(date: string) {
    return date.split("-")[0];
  }

  function formatRevenue(revenue: number) {
    return revenue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  return (
    <div>
      <div>
        <h1 className='text-4xl font-bold text-white'>
          {title} ({getYearFromDate(releaseDate) || "TBA"})
          {status && (
            <span>
                {" "}
                - <span className='text-gray-400'>{status}</span>
            </span>
          )}
        </h1>
        <div className='flex gap-1 mt-2'>
          {genres.map((genre) => {
            const isLastItem = genres.indexOf(genre) === genres.length - 1;
            return (
              <span key={genre.id} className='text-sm text-gray-400'>
                {genre.name}
                {!isLastItem && ","}
              </span>
            );
          })}
        </div>
      </div>
      <div className='mt-6'>
        <h2 className='text-2xl font-bold text-white'>Overview</h2>
        <p className='text-gray-400 mt-2 text-xl'>{overview}</p>
      </div>
      <div className='flex flex-col mt-6 max-w-xl'>
        {runtime ? (
          <div className='grid grid-cols-2'>
            <span className='text-white font-bold'>Runtime: </span>
            <span className='text-gray-400'>{runtime} minutes</span>
          </div>
        ) : (
          <p className='font-bold'>No runtime available</p>
        )}
        <div className='grid grid-cols-2'>
          <span className='text-white font-bold'>Language: </span>
          <span className='text-gray-400'>{language}</span>
        </div>
        <div className='grid grid-cols-2'>
          <span className='text-white font-bold'>Country: </span>
          <span className='text-gray-400'>{country}</span>
        </div>
        {revenue ? (
          <div className='grid grid-cols-2'>
            <span className='text-white font-bold'>Global revenue: </span>
            <span className='text-gray-400'>{formatRevenue(revenue)}</span>
          </div>
        ) : (
          <p className='font-bold'>No revenue available</p>
        )}
        {budget ? (
          <div className='grid grid-cols-2'>
            <span className='text-white font-bold'>Budget: </span>
            <span className='text-gray-400'>{formatRevenue(budget)}</span>
          </div>
        ) : (
            <p className='font-bold'>No budget available</p>
        )}
        {numberOfEpisodes && (
          <>
            <div className='grid grid-cols-2'>
              <span className='text-white font-bold'>Number of episodes: </span>
              <span className='text-gray-400'>{numberOfEpisodes}</span>
            </div>
            <div className='grid grid-cols-2'>
              <span className='text-white font-bold'>Number of seasons: </span>
              <span className='text-gray-400'>{numberOfSeasons}</span>
            </div>
          </>
        )}
      </div>
      <div className='mt-5'>
        <h2 className='text-2xl font-bold text-white'>Production Companies</h2>
        <div className='grid grid-cols-2 gap-2 mt-6'>
          {productionCompanies.map((company) => {
            const hasLogo = company.logo_path !== null;

            return (
              <div
                key={company.id}
                className='flex items-center justify-center gap-2 flex-col bg-slate-200 rounded-md py-3'
              >
                {hasLogo ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                    alt={company.name}
                    width={96}
                    height={96}
                    className='object-contain'
                  />
                ) : (
                  <span className='text-dark-purple font-bold'>
                    {company.name}
                  </span>
                )}
                <span className='text-dark-purple'>
                  {company.origin_country}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className='flex gap-2 items-center mt-6'>
        <h3 className='text-2xl font-bold text-white'>Rating</h3>
        <StarRating rating={rating} />
        <span className='text-sm text-gray-400'>{voteCount} votes</span>
      </div>
      {collectionName && collectionImageUrl && (
        <div className='mt-6'>
          <h3 className='text-2xl font-bold text-white'>Collection</h3>
          <div className='flex flex-col mt-4 gap-2'>
            <img
              src={`https://image.tmdb.org/t/p/w92${collectionImageUrl}`}
              alt={collectionName}
              width={90}
              height={90}
              className='object-contain'
            />
            <p className='text-gray-400 max-w-20 text-center'>
              {collectionName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

interface PersonDetailsProps {
  name: string;
  biography: string;
  birthDate: string;
  placeOfBirth: string;
  knownFor: PersonKnowForDepartment;
  deathDay?: string;
}

export const PersonDetails: React.FC<PersonDetailsProps> = ({
  name,
  biography,
  birthDate,
  placeOfBirth,
  knownFor,
  deathDay,
}) => {
  function getYearFromDate(date: string) {
    return date.split("-")[0];
  }

  return (
    <div>
      <div>
        <h1 className='text-4xl font-bold text-white'>{name}</h1>
        <div className='mt-2 text-gray-400'>
          <span>
            Born: {getYearFromDate(birthDate)} in {placeOfBirth}
          </span>
        </div>
      </div>
      <div className='mt-6'>
        <h2 className='text-2xl font-bold text-white'>Biography</h2>
        <p className='text-gray-400 mt-2 text-xl leading-8 overflow-auto h-96 md:h-[32rem]'>
          {biography}
        </p>
      </div>
      <div className='mt-8 flex flex-col gap-3'>
        <p className='font-bold'>
          Profession: <span className='font-normal'>{knownFor}</span>
        </p>
        <p className='font-bold'>
          Still active:{" "}
          <span className='font-normal'>{deathDay ? "No" : "Yes"}</span>
        </p>
      </div>
    </div>
  );
};
