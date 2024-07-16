import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiKey } from '../constants';

interface MediaState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetchMedia<T>(url: string) {
  const [state, setState] = useState<MediaState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, {
          params: {
            api_key: apiKey,
          },
        });
        setState({ data: response.data, loading: false, error: null });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setState({ data: null, loading: false, error: error.message });
        } else {
          setState({ data: null, loading: false, error: 'An unexpected error occurred' });
        }
      }
    };

    fetchData();
  }, [url]);

  return state;
}
