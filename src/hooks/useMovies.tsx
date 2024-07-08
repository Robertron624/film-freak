// Hook to retrieve movies from the API
import { baseApiUrl, apiKey } from "../constants";
import { useEffect, useState } from "react";
import axios from "axios";

import { Movie } from "../types";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<Movie[]>(`${baseApiUrl}/popular`, {
            params: {
                api_key: apiKey,
            },
        });

        setMovies(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};
