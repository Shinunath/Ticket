import React, { useContext } from 'react'
import { moviecontext } from '../App'
import { Link, useNavigate } from 'react-router-dom'

function Movie() {
  let { Mov, setMovie } = useContext(moviecontext)
  let navigate = useNavigate();
  const releasedmovies = Mov.filter(movie => movie.released !== false)
  const upcomingmovies = Mov.filter((movie) => movie.released === false);
  console.log('releasedmovies', releasedmovies);

  return (

    <div className='p-5 m-10 '>
      <div className='flex justify-between w-full'>
        <h2 className='text-3xl font-bold'>Now Showing</h2>
        {/* <p>View all</p> */}
      </div>
      <div className="flex flex-wrap gap-3 p-5">
        <button className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition">
          Filter
        </button>

        <button className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition">
          Top Selling
        </button>

        <button className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition">
          English
        </button>

        <button className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition">
          Hindi
        </button>

        <button className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition">
          Romance
        </button>

        <button className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition">
          Drama
        </button>

        <button className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition">
          3D
        </button>
      </div>

      <div className='flex gap-7 w-full flex-wrap p-3 '>
        {
          releasedmovies.map((v, i) => {
            return (
              <Link to={`/movies/${v._id}`} key={v?._id}>

                <div className='w-[280px] h-fit border rounded-b-lg '>
                  <img src={v.poster.url} alt="" className='w-[100%] h-[450px] object-cover' />
                  <p className='px-5 font-bold text-xl py-1'>{v.name}</p>
                  <div className='flex flex-col flex-wrapitems-center px-5 pb-2 gap-2 text-gray-500 text-[14px]  font-bold'>
                    <p className='whitespace-nowrap'>{v.genre}</p>
                    <span className="w-1.5 h-1.5 rounded-2xl bg-gray-500 self-center"></span>
                    <p className=''>{v?.languages.slice(0, 2).join(", ")}</p>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>


    </div>

  )
}

export default Movie
