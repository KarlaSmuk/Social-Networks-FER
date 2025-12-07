import { useEffect, useState } from "react";
import {
  fetchMovies,
  fetchGenres,
  searchMovies,
  type Movie,
  type Genre,
} from "../hooks/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const { token } = useAuth();
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [query, setQuery] = useState("");

  // Fetch movies on mount
  useEffect(() => {
    if (token) {
      loadMovies(token);
      fetchGenres(token).then(setGenres);
    }
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (!token) return;
    if (e) e.preventDefault();
    const genres = selectedGenres.map((g) => g.id);
    searchMovies(token, query, genres).then(setFilteredMovies);
  };

  const loadMovies = async (token: string) => {
    try {
      const data = await fetchMovies(token);
      setMovies(data);
      setFilteredMovies(data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleGenre = (genre: Genre) => {
    setSelectedGenres((prev) =>
      prev.some((g) => g.id === genre.id)
        ? prev.filter((g) => g.id !== genre.id)
        : [...prev, genre]
    );
  };

  if (!filteredMovies) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movies Dashboard</h1>

      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div>
          <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ padding: "8px", width: "250px", marginRight: "10px" }}
            />

            <button type="submit" style={{ padding: "8px 12px" }}>
              Search
            </button>
          </form>

          <div style={{ marginBottom: "20px" }}>
            <h4>Filter by genres:</h4>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: 8,
              }}
            >
              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => toggleGenre(g)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    background: selectedGenres.includes(g)
                      ? "#007bff"
                      : "white",
                    color: selectedGenres.includes(g) ? "white" : "black",
                    cursor: "pointer",
                  }}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          {filteredMovies.length === 0 ? (
            <p>No movies found for these filters.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.imdbID}
                  id={movie.imdbID}
                  className="border p-2 rounded shadow grid justify-center cursor-pointer"
                  onClick={() =>
                    navigate(`/movies/${movie.imdbID}`, { state: { movie } })
                  }
                >
                  <img
                    className="h-100 w-auto justify-self-center"
                    src={movie.poster}
                  />
                  <h2 className="font-semibold mt-2">{movie.title}</h2>
                  <p>Genres: {movie.genre}</p>
                  <p>Country: {movie.country}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
