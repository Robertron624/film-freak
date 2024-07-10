// Hook to retrieve media (movies and tv shows) from the API
import { baseApiUrl, apiKey } from "../constants";
import { useEffect, useState } from "react";
import axios from "axios";

import { ApiResponse, Media } from "../types";

export const useGetMedia = (mediaType: "movie" | "tv") => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {

        const url = `${baseApiUrl}/${mediaType}/popular`;

        const response = await axios.get<ApiResponse<Media>>(url, {
            params: {
                api_key: apiKey,
            },
        });

        setMedia(response.data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [mediaType]);

  return { media, loading, error };
};
