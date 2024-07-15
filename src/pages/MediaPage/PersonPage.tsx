import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiKey } from '../../constants';
import { Person } from '../../types';

export default function PersonPage() {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const fetchPerson = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`);
      setPerson(response.data);
    };
    fetchPerson();
  }, [id]);

  if (!person) return <div>Loading...</div>;

  return (
    <div>
      <h1>{person.name}</h1>
      {/* Add more details */}
    </div>
  );
}
