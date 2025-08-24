import './App.css'
import axios from 'axios'
import { useState } from 'react'

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await axios.get(`http://localhost:3000/api/movies/search?name=${query}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        🎬 Flick List
      </h1>

      <div className="flex w-full max-w-md items-center space-x-2">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="flex-grow px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="mt-6 w-full max-w-md">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="p-4 mb-3 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
            <p className="text-sm text-gray-600">{movie.release_date}</p>
            <p className="text-gray-700 mt-2 line-clamp-2">{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
