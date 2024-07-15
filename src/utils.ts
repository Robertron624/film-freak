import { Media, Movie, TVShow, Person } from "./types";

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export function isMovie(media: Media): media is Movie {
  return (media as Movie).title !== undefined;
}

export function isTVShow(media: Media): media is TVShow {
  return (media as TVShow).name !== undefined && (media as TVShow).poster_path !== undefined;
}

export function isPerson(media: Media): media is Person {
  return (media as Person).profile_path !== undefined;
}