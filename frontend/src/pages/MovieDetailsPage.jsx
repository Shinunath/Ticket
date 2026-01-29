import { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom"
import { Dialog, DialogPanel } from '@headlessui/react'
import { endPoints } from '../constants/api.constants'
import ExGenre from '../components/Explore Genre '
import ExLAng from '../components/Explore Language'
import Upmovie from '../components/Upcoming_movie_Home'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import TimeCard from './TimeCard'

function MovieDetailsPage() {
  const [review] = useState([
    { platform: "Hungama News", review: "Amazing movie!", rating: 4.2 },
    { platform: "Times of India", review: "Great direction.", rating: 4.0 },
    { platform: "India Times", review: "Good storyline.", rating: 4.1 },
    { platform: "News 18", review: "Worth watching.", rating: 4.3 },
    { platform: "Filmfare", review: "Super acting!", rating: 4.0 },
  ])

  const { id } = useParams()
  const [view, setView] = useState(false)
  const [movie, setMovie] = useState(null)
  const [show, setShow] = useState([])
  const [loading, setLoading] = useState(true)

  const length = movie?.length

  const getMovie = async () => {
    try {
      let response = await fetch(endPoints.movies.get(id))
      const res = await response.json()
      if (res.success) {
        setMovie(res.data)
        getShow(res.data._id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getShow = async (movieId) => {
    let data = await fetch("/api/show/getshow/" + movieId)
    let res = await data.json()
    if (res.success) setShow(res.data)
  }

  useEffect(() => {
    if (id) getMovie()
    setTimeout(() => setLoading(false), 1200)
  }, [id])

  if (!movie) return <h2 className="text-center p-10 text-xl font-bold">Movie Not Found</h2>

  const now = new Date()

  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="p-4 md:p-10 max-w-5xl mx-auto space-y-8">

            {/* MOVIE HEADER */}
            <div className="flex flex-col sm:flex-row gap-6 p-5 bg-white rounded-xl shadow">
              <img
                src={movie.poster?.url}
                className="w-full sm:w-28 h-60 sm:h-40 object-cover rounded-lg shadow"
              />

              <div className="flex flex-col justify-between gap-4">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold">{movie.name}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {movie.genre} | {movie.languages?.join(", ")} | {Math.floor(length / 60)} hr {length % 60} min
                  </p>
                </div>

                <NavLink
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition"
                  onClick={() => setView(true)}
                >
                  View Details
                </NavLink>
              </div>
            </div>

            {/* AGE WARNING */}
            <div className="flex gap-4 p-5 bg-gray-100 rounded-xl shadow-sm">
              <div className="text-amber-500 font-bold text-3xl bg-white px-4 py-2 rounded-xl">A</div>
              <div>
                <p className="text-sm font-semibold">Movie suitable for adults (18+)</p>
                <p className="text-sm text-gray-600">Carry ID for verification</p>
              </div>
            </div>

            {/* DATES */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <p className="rotate-[-90deg] text-gray-500 font-semibold px-3 py-1 rounded-full bg-gray-200">
                {now.toLocaleString("default", { month: "short" })}
              </p>

              {show[0]?.showDates.map((d, i) => (
                <div key={i} className="px-4 py-2 bg-gray-100 rounded-xl shadow text-center">
                  <p className="text-xl font-bold">{new Date(d.date).getDate()}</p>
                </div>
              ))}
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-3">
              {["Filter", "After 10 PM", "Premium Seats"].map(b => (
                <button key={b} className="px-4 py-2 border rounded-xl hover:bg-gray-200">
                  {b}
                </button>
              ))}
            </div>

            {/* LEGEND */}
            <div className="bg-gray-100 flex flex-wrap gap-4 px-6 py-3 rounded-xl">
              <p className="flex items-center gap-2"><span className="w-3 h-3 bg-black rounded-full"></span> Available</p>
              <p className="flex items-center gap-2"><span className="w-3 h-3 bg-yellow-400 rounded-full"></span> Filling fast</p>
              <p className="flex items-center gap-2"><span className="w-3 h-3 bg-orange-500 rounded-full"></span> Almost full</p>
            </div>

            {/* THEATRES */}
            {show.map((v, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold">{v.theatre?.name}</p>
                    <p className="text-sm text-gray-500">{v.theatre?.location}, {v.theatre?.city}</p>
                  </div>
                  <span className="text-2xl">🤍</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {v.showTimings?.map((time, idx) => (
                    <TimeCard key={idx} time={time} />
                  ))}
                </div>
              </div>
            ))}

            <ExLAng />
            <ExGenre />
          </div>

          <Upmovie />

          {/* DETAILS MODAL */}
          <Dialog open={view} onClose={() => setView(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/40" />
            <div className="fixed inset-0 flex justify-center items-center p-4">
              <DialogPanel className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">

                <h2 className="text-2xl font-bold mb-2">🎬 Movie Details</h2>
                <h3 className="text-lg mb-4">{movie.name}</h3>

                <Swiper
                  slidesPerView={1}
                  spaceBetween={20}
                  pagination={{ clickable: true }}
                  modules={[Pagination]}
                  breakpoints={{ 640: { slidesPerView: 2 } }}
                >
                  {review.map((rev, i) => (
                    <SwiperSlide key={i} className="border rounded-xl p-4">
                      <p className="font-bold">{rev.platform}</p>
                      <p className="text-sm">{rev.review}</p>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <video controls src={movie.video?.url} className="w-full max-w-xl mt-6 rounded"></video>
              </DialogPanel>
            </div>
          </Dialog>
        </>
      )}
    </>
  )
}

export default MovieDetailsPage
