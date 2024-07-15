import { Media, Movie, TVShow, Person, PersonKnowForDepartment } from "./types";

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

export function getProffesionFromDepartment(department: PersonKnowForDepartment): string {

  const personProffesionMap = {
    Acting: "Actor",
    Directing: "Director",
    Writing: "Writer",
    Production: "Producer",
    Crew: "Crew",
    "Visual Effects": "Visual Effects",
    Sound: "Sound",
    "Costume & Make-Up": "Costume & Make-Up",
    Art: "Art",
    Editing: "Editor",
    Camera: "Cinematographer",
    Creator: "Creator",
    Lighting: "Lighting",
    Actors: "Actor",
    "Production Management": "Production Manager",
    "Costume Design": "Costume Designer",
    Directorial: "Director",
    "Visual Effects Supervisor": "Visual Effects Supervisor",
    "Costume Supervisor": "Costume Supervisor",
    "Makeup Artist": "Makeup Artist",
    Hairstylist: "Hairstylist",
    "Makeup & Hair": "Makeup & Hair",
  };

  return personProffesionMap[department] || department;
}