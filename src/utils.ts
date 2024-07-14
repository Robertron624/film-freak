import { Media, Movie, TVShow, Person } from "./types";

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export const isMovie = (media: Media): media is Movie => media.media_type === "movie";
export const isTVShow = (media: Media): media is TVShow => media.media_type === "tv";
export const isPerson = (media: Media): media is Person =>
  media.media_type === "person";