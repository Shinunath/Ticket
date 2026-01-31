import React, { useContext } from 'react'
import { moviecontext } from '../App'
import ExLAng from '../components/Language'
import ExGenre from '../components/Explore_Genre '
import { useNavigate } from 'react-router-dom'

function Upcoming() {
  let { Mov } = useContext(moviecontext)

  const upcomingmovies = Mov.filter(movie => movie.released === false)
  const releasedmovies = Mov.filter(movie => movie.released !== false)

  const navigate = useNavigate()

  return (
    <div>
      {/* ================= UPCOMING MOVIES ================= */}
      <div className='p-4 sm:p-6 md:p-10'>
        <h2 className='text-2xl sm:text-3xl font-bold mb-4'>Upcoming Movies</h2>

        <div className="flex flex-wrap gap-3 mb-6">
          {["Filter", "Top Selling", "English", "Hindi", "Romance", "Drama", "3D"].map((b) => (
            <button
              key={b}
              className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition text-sm sm:text-base"
            >
              {b}
            </button>
          ))}
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
          {upcomingmovies.map((v, i) => (
            <div
              key={i}
              className='border rounded-b-lg cursor-pointer hover:shadow-lg transition'
              onClick={() => navigate(`/movies/${v._id}`)}
            >
              <img
                src={v.poster.url}
                alt=""
                className='w-full h-[300px] sm:h-[340px] object-cover'
              />

              <p className='px-4 pt-2 font-bold text-sm sm:text-base'>
                {v.name}
              </p>

              <div className='flex items-center px-4 gap-2 text-gray-500 text-xs sm:text-sm py-2 font-bold'>
                <p>{v.genre}</p>
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                <p className='truncate'>{v.languages.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RELEASED MOVIES ================= */}
      <div className='p-4 sm:p-6 md:p-10'>
        <h2 className='text-2xl sm:text-3xl font-bold mb-6'>
          Book your Favourite Movie
        </h2>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
          {releasedmovies.map((v, i) => (
            <div
              key={i}
              className='border rounded-b-lg cursor-pointer hover:shadow-lg transition'
              onClick={() => navigate(`/movies/${v._id}`)}
            >
              <img
                src={v.poster.url}
                alt=""
                className='w-full h-[300px] sm:h-[340px] object-cover'
              />

              <p className='px-4 pt-2 font-bold text-sm sm:text-base'>
                {v.name}
              </p>

              <div className='flex items-center px-4 gap-2 text-gray-500 text-xs sm:text-sm py-2 font-bold'>
                <p>{v.genre}</p>
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                <p className='truncate'>{v.languages.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ExLAng />
      <ExGenre />
    </div>
  )
}

export default Upcoming
