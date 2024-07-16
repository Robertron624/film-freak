//@ts-expect-error prevent build error
import React from 'react';
import { render } from '@testing-library/react';
import { Movie, TVShow, Person } from '../../../types';
import { MediaGridItem } from '../SearchResultGrid';

describe('MediaGridItem', () => {
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
  
    const mockTVShow: TVShow = {
        adult: false,
        backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
        episode_run_time: [45, 60],
        first_air_date: '2010-07-15',
        genres: [
            {
            id: 18,
            name: 'Drama',
            },
            {
            id: 10759,
            name: 'Action & Adventure',
            },
        ],
        id: 2,
        media_type: 'tv',
        name: 'Mock TV Show',
        overview: 'This is a mock TV show overview.',
        popularity: 45.0,
        poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
        vote_average: 8.3,
        vote_count: 14878,
        number_of_episodes: 10,
        number_of_seasons: 1,
        origin_country: ['US'],
        original_language: 'en',
        original_name: 'Mock TV Show',
        production_companies: [
            {
            id: 923,
            logo_path: '/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png',
            name: 'Legendary Entertainment',
            origin_country: 'US',
            },
            {
            id: 9996,
            logo_path: '/3tvBqYsBhxWeHlu62SIJ1el93O7.png',
            name: 'Syncopy',
            origin_country: 'GB',
            },
            {
            id: 174,
            logo_path: '/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png',
            name: 'Warner Bros. Pictures',
            origin_country: 'US',
            },
        ],
    }
  
    const mockPerson: Person = {
      id: 3,
      name: 'Mock Person',
      known_for_department: 'Acting',
      profile_path: '/mock.jpg',
      media_type: 'person',
      adult: false,
        popularity: 45.0,
        also_known_as: ['Mock Person 2'],
        biography: 'This is a mock person biography.',
        birthday: '1990-01-01',
        deathday: '',
        gender: 2,
        known_for: [mockMovie],
        place_of_birth: 'Los Angeles, California, USA',
        original_name: 'Mock Person',
    };
  
    it('renders movie media correctly', () => {
      const { getByText, getByAltText } = render(<MediaGridItem media={mockMovie} />);
  
        expect(getByAltText('Inception')).toBeInTheDocument();
        expect(getByText('Inception')).toBeInTheDocument(); // checking for movie title
        expect(getByText('Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \'inception\', the implantation of another person\'s idea into a target\'s subconscious.')).toBeInTheDocument(); // checking for movie overview
    });
  
    it('renders TV show media correctly', () => {
      const { getByText, getByAltText } = render(<MediaGridItem media={mockTVShow} />);
  
        expect(getByText('Mock TV Show')).toBeInTheDocument(); // checking for TV show title
        expect(getByText('This is a mock TV show overview.')).toBeInTheDocument(); // checking for TV show overview
        expect(getByAltText('Mock TV Show')).toBeInTheDocument(); // checking for TV show image
    });
  
    it('renders person media correctly', () => {
      const { getByText, getByAltText } = render(<MediaGridItem media={mockPerson} />);
  
        expect(getByText('Mock Person')).toBeInTheDocument(); // checking for person name
        expect(getByText('Actor')).toBeInTheDocument(); // checking for person department
        expect(getByAltText('Mock Person')).toBeInTheDocument(); // checking for person image
    });
  
    it('renders default values for missing overview', () => {
      const mediaWithoutOverview = {
        ...mockMovie,
        overview: '',
      };
  
      const { getByText } = render(<MediaGridItem media={mediaWithoutOverview} />);
  
      expect(getByText('Inception')).toBeInTheDocument(); // Verifica que el título esté presente aunque falte la descripción
      expect(getByText('No overview available')).toBeInTheDocument(); // Verifica que se muestre el texto predeterminado para la descripción faltante
    });

    it('renders default values for missing image', () => {
        const mediaWithoutImage = {
          ...mockMovie,
          poster_path: '',
        };
    
        const { getByText, getByAltText } = render(<MediaGridItem media={mediaWithoutImage} />);
    
        const notFoundImageSrc = '/images/no-image-available.png';
    
        expect(getByText('Inception')).toBeInTheDocument(); // Verifica que el título esté presente
        expect(getByAltText('Inception')).toHaveAttribute('data-src', notFoundImageSrc); // Verifica que el atributo data-src sea el esperado
      });
  });