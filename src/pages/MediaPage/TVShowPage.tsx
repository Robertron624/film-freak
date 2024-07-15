import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TVShow } from '../../types';
import { apiKey } from '../../constants';

export default function TVShowPage() {
  const { id } = useParams<{ id: string }>();
  const [tvShow, setTVShow] = useState<TVShow | null>(null);

  useEffect(() => {
    const fetchTVShow = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`);
      setTVShow(response.data);
    };
    fetchTVShow();
  }, [id]);

  if (!tvShow) return <div>Loading...</div>;

  return (
    <div>
      <h1>{tvShow.name}</h1>
      {/* Add more details */}
    </div>
  );
}
