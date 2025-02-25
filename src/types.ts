
export type MediaType = "movie" | "tv" | "person";

interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export type MediaStatus = "Rumored" | "Planned" | "In Production" | "Post Production" | "Released" | "Canceled";


export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: BelongsToCollection;
  budget?: number;
  genres: Genre[];
  id: number;
  media_type: MediaType;
  original_language: string;
  original_title: string;
  origin_country: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  release_date: string;
  revenue: number;
  runtime: number;
  status: MediaStatus;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TVShow {
  adult: boolean;
  backdrop_path: string;
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  id: number;
  media_type: MediaType;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  vote_average: number;
  vote_count: number;
}

export type PersonKnowForDepartment = "Acting" | "Directing" | "Writing" | "Production" | "Crew" | "Visual Effects" | "Sound" | "Costume & Make-Up" | "Art" | "Editing" | "Camera" | "Creator" | "Lighting" | "Actors" | "Production Management" | "Costume Design" | "Directorial" | "Visual Effects Supervisor" | "Costume Supervisor" | "Makeup Artist" | "Hairstylist" | "Makeup & Hair" | "Costume Design" | "Costume Supervisor"
export interface Person {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string
  deathday: string
  gender: number
  id: number
  known_for: Movie[] | TVShow[]
  known_for_department: PersonKnowForDepartment
  media_type: MediaType
  name: string
  original_name: string
  place_of_birth: string
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