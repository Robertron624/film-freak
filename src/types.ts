
export type MediaType = "movie" | "tv" | "person";
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: MediaType;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TVShow {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: MediaType;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export type PersonKnowForDepartment = "Acting" | "Directing" | "Writing" | "Production" | "Crew" | "Visual Effects" | "Sound" | "Costume & Make-Up" | "Art" | "Editing" | "Camera" | "Creator" | "Lighting" | "Actors" | "Production Management" | "Costume Design" | "Directorial" | "Visual Effects Supervisor" | "Costume Supervisor" | "Makeup Artist" | "Hairstylist" | "Makeup & Hair" | "Costume Design" | "Costume Supervisor"
export interface Person {
  adult: boolean
  gender: number
  id: number
  known_for: Movie[] | TVShow[]
  known_for_department: PersonKnowForDepartment
  media_type: MediaType
  name: string
  original_name: string
  popularity: number
  profile_path: string
}

export type Media = Movie | TVShow | Person;


export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type FilterTermSearch = "all" | "movie" | "tv" | "people";