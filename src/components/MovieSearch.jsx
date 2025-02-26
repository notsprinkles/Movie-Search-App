import { useState } from "react";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "5e313995"; // Replace with your API key

  const searchMovies = async () => {
    if (!query) return; // Don't search if input is empty
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found");
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch movies");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Search for a Movie</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter movie title..."
      />
      <button onClick={searchMovies}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} width="100" />
            <p>{movie.Title} ({movie.Year})</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
