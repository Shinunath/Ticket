import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Dialog, DialogPanel } from "@headlessui/react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"

import { endPoints } from "../constants/api.constants"
import ExGenre from "../components/Explore_Genre "
import ExLang from "../components/Language"
import Upmovie from "../components/Upcoming_movie_Home"
import TimeCard from "./TimeCard"

function MovieDetailsPage() {
  const { id } = useParams()

  const [movie, setMovie] = useState(null)
  const [show, setShow] = useState([])
  const [view, setView] = useState(false)
  const [loading, setLoading] = useState(true)

  const review = [
    { platform: "Hungama News", review: "Amazing movie!", rating: 4.2 },
    { platform: "Times of India", review: "Great direction.", rating: 4.0 },
    { platform: "India Times", review: "Good storyline.", rating: 4.1 },
    { platform: "News 18", review: "Worth watching.", rating: 4.3 },
    { platform: "Filmfare", review: "Super acting!", rating: 4.0 },
  ]

  const getShow = async (movieId) => {
    try {
      const data = await fetch("/api/show/getshow/" + movieId)
      const res = await data.json()
      if (res.success) setShow(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const getMovie = async () => {
    try {
      setLoading(true)
      const response = await fetch(endPoints.movies.get(id))
      const res = await response.json()
      if (res.success) {
        setMovie(res.data)
        await getShow(res.data._id)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) getMovie()
  }, [id])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    )
  }

  if (!movie) {
    return <h2 className="text-center p-10 text-xl font-bold">Movie Not Found</h2>
  }

  const length = movie.length || 0
  const now = new Date()

  return (
    <>
      <div className="p-4 sm:p-6 md:p-10 max-w-5xl mx-auto space-y-8">

        {/* MOVIE HEADER */}
        <div className="flex flex-col sm:flex-row gap-6 p-5 bg-white rounded-xl shadow">
          <img
            src={movie.poster?.url}
            alt={movie.name}
            className="w-full sm:w-28 h-72 sm:h-40 object-cover rounded-lg shadow"
          />

          <div className="flex flex-col justify-between gap-3 sm:gap-4">
            <div>
              <p className="text-2xl sm:text-3xl font-bold">{movie.name}</p>
              <p className="text-gray-500 text-sm mt-1">
                {movie.genre} | {movie.languages?.join(", ")} |{" "}
                {Math.floor(length / 60)} hr {length % 60} min
              </p>
            </div>

            <button
              onClick={() => setView(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-fit"
            >
              View Details
            </button>
          </div>
        </div>

        {/* AGE WARNING */}
        <div className="flex gap-4 p-5 bg-gray-100 rounded-xl shadow-sm">
          <div className="text-amber-500 font-bold text-3xl bg-white px-4 py-2 rounded-xl">
            A
          </div>
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

          {show[0]?.showDates?.map((d, i) => (
            <div
              key={i}
              className="px-4 py-2 bg-gray-100 rounded-xl shadow text-center min-w-[64px]"
            >
              <p className="text-xl font-bold">{new Date(d.date).getDate()}</p>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3">
          {["Filter", "After 10 PM", "Premium Seats"].map((b) => (
            <button
              key={b}
              className="px-4 py-2 border rounded-xl hover:bg-gray-200 text-sm sm:text-base"
            >
              {b}
            </button>
          ))}
        </div>

        {/* THEATRES */}
        {show.map((v, i) => (
          <div key={i} className="p-6 bg-white rounded-xl shadow space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="text-lg font-bold">{v.theatre?.name}</p>
                <p className="text-sm text-gray-500">
                  {v.theatre?.location}, {v.theatre?.city}
                </p>
              </div>
              <span className="text-2xl">🤍</span>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {v.showTimings?.map((time, idx) => (
                <TimeCard key={idx} time={time} />
              ))}
            </div>
          </div>
        ))}

        <ExLang />
        <ExGenre />
      </div>

      <Upmovie />

      {/* DETAILS MODAL */}
      <Dialog open={view} onClose={() => setView(false)} className="relative z-50">
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setView(false)}
        />
        <div className="fixed inset-0 flex justify-center items-start p-4 sm:p-6">
          <DialogPanel
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white z-10 pb-4">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">🎬 Movie Details</h2>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">{movie.name}</h3>

              <div className="flex gap-4 overflow-x-auto whitespace-nowrap bg-gray-100 rounded-xl h-10 p-2">
                {["Reviews", "Synopsis", "Cast", "Video", "Posters"].map((tab) => (
                  <p key={tab} className="text-sm font-semibold cursor-pointer">
                    {tab}
                  </p>
                ))}
              </div>
            </div>

            <div className="overflow-y-auto mt-6 pr-2">

              {/* REVIEWS */}
              <Swiper
                spaceBetween={20}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                }}
              >
                {review.map((rev, i) => (
                  <SwiperSlide key={i} className="border rounded-xl p-5">
                    <div className="flex justify-between">
                      <p className="font-bold">{rev.platform}</p>
                      <p>⭐ {rev.rating}</p>
                    </div>
                    <p className="mt-2 text-sm">{rev.review}</p>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* SYNOPSIS */}
              <section className="mt-10">
                <p>{movie.description}</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <p><b>Category:</b> {movie.category.join(", ")}</p>
                  <p><b>Language:</b> {movie.languages.join(", ")}</p>
                  <p><b>Rating:</b> {movie.rating}</p>
                </div>
              </section>

              {/* CAST */}
              <section className="mt-10">
                <p className="font-bold text-lg break-words">
                  {movie.castNames.join(", ")}
                </p>
              </section>

              {/* VIDEO */}
              <section className="mt-10 flex justify-center">
                <video
                  controls
                  src={movie.video?.url}
                  className="w-full max-w-xl rounded-lg"
                />
              </section>

              {/* POSTER */}
              <section className="mt-10">
                <img
                  src={movie.poster?.url}
                  className="w-full max-h-[450px] object-cover rounded-xl"
                />
              </section>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default MovieDetailsPage
