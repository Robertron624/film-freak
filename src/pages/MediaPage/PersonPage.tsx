import { useParams } from "react-router-dom";
import { Person } from "../../types";
import { useFetchMedia } from "../../hooks/useFetchMedia";
import { CircularProgress } from "@mui/material";
import { PersonDetails, Poster } from "../../components/ui/MediaPageComponents";

export default function PersonPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: person,
    loading,
    error,
  } = useFetchMedia<Person>(`https://api.themoviedb.org/3/person/${id}`);

  if (loading)
    return (
      <div className='mt-16 flex justify-center'>
        <CircularProgress color='secondary' size={100} thickness={5} />
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
    {person && (
      <>
        <Poster
          imageUrl={person.profile_path}
          name={person.name}
        />
        <PersonDetails
          name={person.name}
          biography={person.biography}
          birthDate={person.birthday}
          placeOfBirth={person.place_of_birth}
          knownFor={person.known_for_department}
          deathDay={person.deathday}
        />
      </>
    )}
  </div>
  );
}
