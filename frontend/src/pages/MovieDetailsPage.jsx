import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { moviecontext, theatrescontext } from '../App'
import { Dialog, DialogPanel } from '@headlessui/react'
import { API_BASE_URL, endPoints } from '../constants/api.constants'
import ExGenre from '../components/Explore Genre ';
import ExLAng from '../components/Explore Language';
import Upmovie from '../components/Upcoming_movie_Home';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../App.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import TimeCard from './TimeCard';
function MovieDetailsPage() {
  let [review, setReview] = useState([
    { platform: "Hungama News", review: "Amazing movie!", rating: 4.2 },
    { platform: "Times of India", review: "Great direction.", rating: 4.0 },
    { platform: "India Times", review: "Good storyline.", rating: 4.1 },
    { platform: "News 18", review: "Worth watching.", rating: 4.3 },
    { platform: "Filmfare", review: "Super acting!", rating: 4.0 },
    { platform: "Times of India", review: "Great direction.", rating: 4.0 },

  ])
  const { id } = useParams();


  let [view, setView] = useState(false)
  let [movie, setMovie] = useState(null)
  let [show, setShow] = useState([])
  let [loading, setLoading] = useState(true)

  // to change minutes to hour and minutes
  const length = movie?.length
  console.log("length", length)

  let getMovie = async () => {
    try {
      let response = await fetch(
        endPoints.movies.get(id)
      );

      const res = await response.json();

      if (!res.success) {
        console.error(res.message);
        return;
      }
      setMovie(res.data);
      getShow(res.data._id);

    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getMovie();
    }
  }, [id]);
  let getShow = async (movieId) => {
    let data = await fetch("/api/show/getshow/" + movieId);
    let res = await data.json();
    if (res.success) {
      setShow([...res.data])
      console.log("show", res.data)
    }
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1200);
  }, []);

  if (!movie) return <h2 className='text-2xl text-center p-10 font-bold'>Movie Not Found</h2>;
  const now = new Date();
  console.log('movie', movie);


  return (
    <>
      {loading ? <div className='w-full h-screen flex items-center justify-center'>
        <div className="loader"></div>
      </div> :
        <>

          <div className="p-10 max-w-5xl mx-auto space-y-8">
            <div className="flex gap-6 p-5 bg-white rounded-xl  shadow">

              <img
                src={movie?.poster?.url}
                alt=""
                className="w-28 h-40 object-cover rounded-lg shadow"
              />

              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-3xl font-bold">{movie.name}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {movie.genre} | {movie?.languages?.join?.(",  ")} |   Length: {Math.floor(length / 60)} hr {length % 60} min
                  </p>
                </div>
                <NavLink
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow text-center hover:bg-blue-700 transition "
                  onClick={() => setView(true)}>
                  View Details
                </NavLink>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-gray-100 rounded-xl shadow-sm">
              <div className="text-amber-500 font-bold text-3xl bg-white rounded-xl px-4 py-2 shadow">
                A
              </div>

              <div>
                <p className="text-[14px] font-semibold">
                  Movie suitable for adults (18+ Years) only
                </p>
                <p className="text-[14px] text-gray-600">
                  Please carry your ID with birth date for verification.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <p style={{ rotate: "-90deg" }} className=" text-gray-500 font-semibold px-3 py-1 rounded-full bg-gray-200">
                {now.toLocaleString("default", { month: "short" })}
              </p>

              {show[0]?.showDates.map((d, i) => (
                <div
                  key={i}
                  className="px-4 py-2 bg-gray-100 rounded-xl shadow text-center hover:bg-blue-100 cursor-pointer"
                >
                  <p className="text-xl font-bold">{new Date(d.date).getDate()}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              {["Filter", "After 10 PM", "Premium Seats"].map((b) => (
                <button
                  key={b}
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-200 transition"
                >
                  {b}
                </button>
              ))}
            </div>

            <div className="bg-gray-100 flex justify-start gap-8 px-6 py-3 rounded-xl shadow">
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-black rounded-full"></span> Available
              </p>
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span> Filling fast
              </p>
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span> Almost full
              </p>
            </div>
            {show.map((v, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-5">
                    <image
                      src={v?.theatre?.url}
                      alt=""
                      className="w-14 h-14 rounded-full border shadow"
                    />
                    <div>
                      <p className="text-xl font-bold">{v?.theatre?.name} , {v?.theatre?.location} , {v?.theatre?.city}</p>
                      <p className="text-sm text-gray-500">Non-cancellable</p>
                    </div>
                  </div>

                  <p className="text-2xl cursor-pointer">🤍</p>
                </div>

                <div className='flex gap-5 '>
                  {
                    v.showTimings?.map((time, index) => (
                      <TimeCard key={index} time={time} />
                    ))
                  }
                </div>
              </div>
            ))}
            <ExLAng />

            <ExGenre />
          </div>
          <Upmovie />
          <Dialog open={view} onClose={() => setView(false)} className="relative z-50 ">

            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm " onClick={() => setView(false)} />

            <div className="fixed inset-0 flex justify-center items-start p-6  ">
              <DialogPanel
                className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-[100%] max-h-[85vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >

                <div className="top-0 bg-white z-10 pb-4" >
                  <h2 className="text-3xl font-bold mb-2 text-gray-900">
                    🎬 Movie Details
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    {movie.name}
                  </h3>

                  <div className="flex justify-between bg-gray-100 rounded-xl h-10 p-2 ">
                    {["Reviews", "Synopsis", "Cast", "Video", "Posters"].map((tab) => (
                      <p
                        key={tab}
                        className="text-sm font-semibold text-gray-600 cursor-pointer hover:text-blue-600 transition px-2"
                      >
                        {tab}
                      </p>
                    ))}
                  </div>
                </div>


                <div className="overflow-y-auto mt-6 pr-2">


                  <section className="mb-10">
                    <h3 className="text-xl font-bold mb-4">⭐ Reviews</h3>

                    <Swiper
                      slidesPerView={2}
                      spaceBetween={20}
                      pagination={{ clickable: true }}
                      modules={[Pagination]}
                      className="w-full"
                    >
                      {review?.map((rev, index) => (
                        <SwiperSlide
                          key={index}
                          className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                        >
                          <div className="flex justify-between items-center">
                            <p className="font-bold text-gray-700">{rev.platform}</p>
                            <p className="text-yellow-500 font-semibold">⭐ {rev.rating}</p>
                          </div>
                          <p className="mt-3 text-gray-600 text-sm">{rev.review}</p>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <style>
                      {`
            .swiper-pagination {
              margin-top: 20px !important;
            }
          `}
                    </style>
                  </section>

                  <section className="mb-10">
                    <h3 className="text-xl font-bold mb-4">📌 Synopsis</h3>
                    <div className="bg-gray-50 p-5 rounded-xl shadow-inner">
                      <p className="text-gray-700 leading-relaxed">{movie.description}</p>

                      <div className="mt-5  grid-cols-3 gap-4 text-sm text-gray-700 flex flex-col" >
                        <p><span className="font-bold">🎬 Category:</span> {movie?.category.join(", ")}</p>
                        <p><span className="font-bold">🌐 Language:</span> {movie?.languages.join(", ")}</p>
                        <p><span className="font-bold">⭐ Rating:</span> {movie.rating}</p>
                      </div>
                    </div>
                  </section>

                  <section className="mb-10">
                    <h3 className="text-xl font-bold mb-4">🎭 Cast</h3>

                    <div className="flex flex-wrap gap-6">
                      <p className='font-bold text-xl'>{movie?.castNames.join(" ")}</p>
                    </div>
                  </section>

                  <section className="mb-10">
                    <h3 className="text-xl font-bold mb-4">🎥 Trailer</h3>

                    <div className="">
                      <video controls src={movie?.video?.url} className='w-[600px]'></video>
                    </div>
                  </section>

                  <section className="mb-6">
                    <h3 className="text-xl font-bold mb-4">🖼 Posters & Wallpapers</h3>

                    <img
                      src={movie?.poster.url}
                      className="rounded-xl shadow-lg w-[400px]  object-cover"
                      alt=""
                    />
                  </section>
                </div>
              </DialogPanel>
            </div>
          </Dialog></>}
    </>
  );
}

export default MovieDetailsPage;


