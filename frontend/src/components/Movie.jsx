import React, { useContext, useEffect, useState } from 'react'
import { moviecontext } from '../App'
import { Link, useNavigate } from 'react-router-dom'
// import Movie from '../components/Movie'
import axios from 'axios'
import '../App.css'


function Movie() {
  // let { Mov } = useContext(moviecontext)
  let navigate = useNavigate()
  let { Mov, setMovie } = useContext(moviecontext)
  const releasedmovies = Mov.filter(movie => movie.released !== false);
  const [filter, setfilter] = useState({ langauage: null, category: null })

  // const releasedmovies = Mov.filter(movie => movie.released !== false)
  const upcomingmovies = Mov.filter((movie) => movie.released === false)
  let FilterMovie = async () => {
    try {
      let { data } = await axios(`/api/movie/filtermovie-query/?langauage=${filter.langauage}&category=${filter.category}`)
      setMovie([...data.data])
    } catch (error) {
      console.log(error)

    }
  }
  console.log(filter)
  useEffect(() => {
    FilterMovie()
  }, [filter])

  return (
    <div className='p-4 sm:p-6 md:p-10'>
      <div className='flex justify-between w-full mb-4'>
        <h2 className='text-2xl sm:text-3xl font-bold'>Now Showing</h2>
      </div>
      <div className="flex flex-wrap gap-3 py-5">
        <button className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          Filter
        </button>

        <button onClick={() => {
          setfilter({ ...filter, langauage: "English" })

        }} className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          English
        </button>

        <button onClick={() => {
          setfilter({ ...filter, langauage: "Hindi" })

        }} className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          Hindi
        </button>

        <button onClick={() => {
          setfilter({ ...filter, category: "action" })

        }} className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          Action
        </button>

        <button onClick={() => {
          setfilter({ ...filter, category: "biography" })

        }} className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          Biography
        </button>

        <button className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          3D
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {releasedmovies.map((v) => (
          <Link to={`/movies/${v._id}`} key={v._id}>
            <div className='border-gray-300 border rounded-b-lg hover:shadow-lg transition overflow-hidden'>
              <img
                src={v.poster.url}
                alt={v.name}
                className='w-full h-[260px] sm:h-[340px] md:h-[380px] lg:h-[420px] object-cover'
              />

              <p className='px-4 pt-2 font-bold text-sm sm:text-base truncate'>
                {v.name}
              </p>

              <div className='px-4 pb-3 gap-1 text-gray-500 text-xs sm:text-sm font-bold flex flex-row'>
                <p className='truncate'>{v.genre}</p>

                <div className='flex items-center gap-2'>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                  <p className='w-48 truncate'>
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
