import React from "react";
import MediaCarousel from "../MediaCarousel";
import { Movie, TVShow } from "../../../types";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import useItemsPerPage from "../../../hooks/useItemsPerPage";


// import { MediaCard } from "../MediaCard";
// import Carousel from "react-material-ui-carousel";

// import { chunkArray } from "../../utils";
// import useItemsPerPage from "../../hooks/useItemsPerPage";
// import { CircularProgress } from "@mui/material";

const mockMovies: Movie[] = [
  {
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
  },
  {
    adult: false,
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    media_type: "movie",
    original_title: "Mock Movie",
    origin_country: "US",
    id: 2,
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
  },
];

vi.mock('../../../hooks/useItemsPerPage', async () => {
  const actual = await vi.importActual('../../../hooks/useItemsPerPage');
  return {
    ...actual,
    default: vi.fn().mockReturnValue(4), // Default to desktop view
  };
});

// Mock the CircularProgress component
vi.mock("@mui/material/CircularProgress", () => ({
  default: () => <div data-testid='loading-spinner'>Loading...</div>,
}));

// Mock the Carousel component
vi.mock("@mui/material/Carousel", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='carousel'>{children}</div>
  ),
}));

// Mock the MediaCard component
vi.mock("./MediaCard", () => ({
  default: ({ media }: { media: Movie | TVShow }) => (
    <div data-testid={`media-card-${media.id}`}>
      {(media as Movie).title || (media as TVShow).name}
    </div>
  ),
}));

describe("MediaCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading spinner when loading", () => {
    render(<MediaCarousel loading={true} error={false} media={[]} />);
    expect(screen.getByTestId("loading-spinner")).toBeDefined();
  });

  it("renders error message when there is an error", () => {
    render(<MediaCarousel loading={false} error={true} media={[]} />);
    expect(
      screen.getByText("There was an error fetching the movies")
    ).toBeDefined();
  });

  it("renders media cards when data is loaded", () => {
    render(<MediaCarousel loading={false} error={false} media={mockMovies} />);
    mockMovies.forEach((movie) => {
      expect(screen.getByTestId(`media-card-${movie.id}`)).toBeDefined();
    });
  });

  it('renders "No movies found" when media array is empty', () => {
    render(<MediaCarousel loading={false} error={false} media={[]} />);
    expect(screen.getByText("No movies found")).toBeDefined();
  });

  it('uses custom moviesPerPage prop', () => {
    const useItemsPerPageMock = vi.mocked(useItemsPerPage);
    useItemsPerPageMock.mockReturnValue(2);
  
    render(
      <MediaCarousel
        loading={false}
        error={false}
        media={mockMovies}
        moviesPerPage={{ mobile: 1, tablet: 2, desktop: 2 }}
      />
    );
  
    expect(useItemsPerPageMock).toHaveBeenCalledWith({ mobile: 1, tablet: 2, desktop: 2 });
  });
});
