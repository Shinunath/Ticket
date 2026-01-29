import React, { useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { moviecontext } from "../App";
import { NavLink, useNavigate } from "react-router-dom";

function Upmovie() {
  const { Mov } = useContext(moviecontext);
  const navigate = useNavigate();

  const upcomingmovies = Mov.filter((movie) => movie.released === false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <div className="flex justify-between w-full items-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold">UpComing Movies</h2>

        <NavLink
          to={"/UpComing"}
          className="px-3 py-1 rounded bg-amber-200 hover:bg-amber-300 text-sm sm:text-base"
        >
          View all
        </NavLink>
      </div>

      <div className="relative">
        {/* Previous Button */}
        <button
          ref={prevRef}
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 
                     w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 
                     items-center justify-center text-4xl md:text-5xl text-white"
          aria-label="Previous"
        >
          ‹
        </button>

        {/* Next Button */}
        <button
          ref={nextRef}
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 
                     w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 
                     items-center justify-center text-4xl md:text-5xl text-white"
          aria-label="Next"
        >
          ›
        </button>

        <Swiper
          spaceBetween={20}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          modules={[Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="mySwiper"
        >
          {upcomingmovies.map((v, i) => (
            <SwiperSlide key={v.id ?? i}>
              <div
                className="w-full h-[380px] sm:h-[420px] md:h-[450px] 
                           border rounded-b-lg cursor-pointer overflow-hidden
                           hover:shadow-lg transition"
                onClick={() => navigate(`/movies/${v._id}`)}
              >
                <div className="w-full h-[80%] relative">
                  <img
                    src={
                      v.poster.url ||
                      "https://via.placeholder.com/300x400?text=No+Image"
                    }
                    alt={v.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-2 left-2 bg-black/70 text-white 
                                  text-xs px-2 py-1 rounded">
                    <p>Release Date</p>
                    <p className="font-bold">
                      {new Date(v.releasedate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <p className="px-4 pt-2 font-bold text-sm sm:text-base truncate">
                  {v.name}
                </p>

                <div className="flex items-center px-4 gap-2 text-gray-500 
                                text-xs sm:text-sm font-bold pb-2 truncate">
                  <p>{v?.languages.join(", ")}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Upmovie;
