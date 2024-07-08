import { Movie } from "../../types";

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <div className="movie-card">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <div className="movie-card-content">
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
            </div>
        </div>
    );
};