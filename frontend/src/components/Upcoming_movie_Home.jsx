import React, { useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // optional CSS for nav
import { Pagination, Navigation } from "swiper/modules";
import { moviecontext } from "../App";
import { NavLink, useNavigate } from "react-router-dom";

function Upmovie() {
  const { Mov } = useContext(moviecontext);
  const navigate = useNavigate();

  const upcomingmovies = Mov.filter((movie) => movie.released === false);

  // refs for navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="p-5 m-10">
      <div className="flex justify-between w-full items-center mb-4">
        <h2 className="text-3xl font-bold">UpComing Movies</h2>
        <NavLink
          // onClick={() => navigate("/UpComing")}
          to={"/UpComing"}
          className="px-3 py-1 rounded bg-amber-200 hover:bg-amber-300"
        >
          View all
        </NavLink>
      </div>

      <div className="relative">

        <button
          ref={prevRef}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 shadow flex items-center justify-center text-7xl text-white  "
          aria-label="Previous"
        >
          ‹
        </button>

        <button
          ref={nextRef}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-20 h-20  shadow flex items-center justify-center  text-7xl text-white  "
          aria-label="Next"
        >
          ›
        </button>

        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {upcomingmovies.map((v, i) => (
            <SwiperSlide key={v.id ?? i}>
              <div
                className="w-full h-[450px] border rounded-b-lg cursor-pointer overflow-hidden"
                onClick={() => { navigate(`/movies/${v._id}`); }}>

                <div className="w-full h-[85%] object-cover relative">
                  <img
                    src={v.poster.url || "https://via.placeholder.com/300x400?text=No+Image"}
                    alt={v.name}
                    className="w-full h-full object-cover"
                  />
                  <div className=" absolute bottom-2 left-2 bg-black/70 text-white text-xs p-2  rounded ">
                    <p>Release Date</p>
                    <p className="font-bold">{new Date(v.releasedate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}</p>
                  </div>
                </div>
                <p className="px-5 font-bold text-xl py-1">{v.name}</p>
                <div className='flex items-center px-5 gap-2 text-gray-500 text-[14px]  font-bold'>

                  <p>{v?.languages.join(", ")}</p>

                </div>              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Upmovie;
