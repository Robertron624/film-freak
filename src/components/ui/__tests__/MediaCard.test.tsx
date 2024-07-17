//@ts-expect-error need to add React to global scope
import React from "react";
import  MediaCard from "../MediaCard";
import { Movie } from "../../../types";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

const mockMovie: Movie = {
  adult: false,
  backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
  media_type: "movie",
  original_title: "Mock Movie",
  origin_country: "US",
  id: 1,
  title: "Inception",
  tagline: "Your mind is the scene of the crime.",
  overview:
    "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: 'inception', the implantation of another person's idea into a target's subconscious.",
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
  ],
  release_date: "2010-07-15",
  vote_average: 8.3,
  poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  runtime: 148,
  status: "Released",
  budget: 160000000,
  revenue: 825532764,
  video: false,
  vote_count: 14878,
  original_language: "en",
  popularity: 45.0,
  production_companies: [
    {
      id: 923,
      logo_path: "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png",
      name: "Legendary Entertainment",
      origin_country: "US",
    },
    {
      id: 9996,
      logo_path: "/3tvBqYsBhxWeHlu62SIJ1el93O7.png",
      name: "Syncopy",
      origin_country: "GB",
    },
    {
      id: 174,
      logo_path: "/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png",
      name: "Warner Bros. Pictures",
      origin_country: "US",
    },
  ],
};

describe("MediaCard", () => {
  it("renders a MediaCard with a movie", () => {
    render(<MediaCard media={mockMovie} />);
    
    // should render an image with source of the poster
    expect(screen.getByAltText("Inception")).toBeInTheDocument();
    // should render the title
    expect(screen.getByText("Inception")).toBeInTheDocument();
    // should render the overview
    expect(screen.getByText("Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: 'inception', the implantation of another person's idea into a target's subconscious.")).toBeInTheDocument();
  });
});
