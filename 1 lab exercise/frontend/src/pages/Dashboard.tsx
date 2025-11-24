import { useEffect, useState } from "react";
import { fetchMovies, type Movie } from "../hooks/api";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const { token } = useAuth();

  // Fetch movies on mount
  useEffect(() => {
    if (token) loadMovies(token);
  }, []);

  const loadMovies = async (token: string) => {
    try {
      const data = await fetchMovies(token);
      setMovies(data);
      setFilteredMovies(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movies Dashboard</h1>

      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredMovies.map((movie) => (
            <div
              key={movie.imdbID}
              id={movie.imdbID}
              className="border p-2 rounded shadow grid justify-center"
            >
              <img className="h-100 w-auto" src={movie.poster} />
              <h2 className="font-semibold mt-2">{movie.title}</h2>
              <p>Genres: {movie.genre}</p>
              <p>Country: {movie.country}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
