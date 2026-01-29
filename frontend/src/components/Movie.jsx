import React, { useContext } from 'react'
import { moviecontext } from '../App'
import { Link, useNavigate } from 'react-router-dom'

function Movie() {
  let { Mov } = useContext(moviecontext)
  let navigate = useNavigate()

  const releasedmovies = Mov.filter(movie => movie.released !== false)
  const upcomingmovies = Mov.filter((movie) => movie.released === false)

  return (
    <div className='p-4 sm:p-6 md:p-10'>
      <div className='flex justify-between w-full mb-4'>
        <h2 className='text-2xl sm:text-3xl font-bold'>Now Showing</h2>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {["Filter", "Top Selling", "English", "Hindi", "Romance", "Drama", "3D"].map((b) => (
          <button
            key={b}
            className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition 
                       text-sm sm:text-base"
          >
            {b}
          </button>
        ))}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {releasedmovies.map((v) => (
          <Link to={`/movies/${v._id}`} key={v._id}>
            <div className='border rounded-b-lg hover:shadow-lg transition overflow-hidden'>
              <img
                src={v.poster.url}
                alt={v.name}
                className='w-full h-[260px] sm:h-[340px] md:h-[380px] lg:h-[420px] object-cover'
              />

              <p className='px-4 pt-2 font-bold text-sm sm:text-base truncate'>
                {v.name}
              </p>

              <div className='flex flex-col px-4 pb-3 gap-1 text-gray-500 text-xs sm:text-sm font-bold'>
                <p className='truncate'>{v.genre}</p>

                <div className='flex items-center gap-2'>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                  <p className='truncate'>
                    {v.languages.slice(0, 2).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Movie
