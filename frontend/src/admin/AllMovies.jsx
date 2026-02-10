import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("/api/movie/getmovies");
      console.log("API RESPONSE 👉", res.data);

      // ✅ HANDLE ALL POSSIBLE CASES
      if (Array.isArray(res.data)) {
        setMovies(res.data);
      } else if (Array.isArray(res.data.movies)) {
        setMovies(res.data.movies);
      } else if (Array.isArray(res.data.data)) {
        setMovies(res.data.data);
      } else if (Array.isArray(res.data.data?.movies)) {
        setMovies(res.data.data.movies);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error("API ERROR", err);
      setMovies([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🎬 All Movies</h1>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-60 bg-gray-200">
                {movie.poster?.url ? (
                  <img
                    src={movie.poster.url}
                    alt={movie.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4 space-y-2">
                <h2 className="text-lg font-bold truncate">
                  {movie.name}
                </h2>

                <p className="text-sm text-gray-500">
                  🎭 {Array.isArray(movie.genre) ? movie.genre.join(", ") : "N/A"}
                </p>

                <p className="text-sm text-gray-500">
                  ⏱ {movie.length || "--"} mins
                </p>

                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    movie.released
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {movie.released ? "Released" : "Upcoming"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
