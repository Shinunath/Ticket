import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { moviecontext } from '../App';
import { useNavigate } from 'react-router-dom';

export default function Content1() {
  let { Mov } = useContext(moviecontext);
  let navigate = useNavigate();

  return (
    /* 🔥 HIDDEN on tablet & mobile, visible only on lg+ */
    <div className="hidden lg:block">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {Mov.map((v, i) => (
          <SwiperSlide
            key={i}
            onClick={() => navigate(`/movies/${v._id}`)}
            className="w-[80%] h-[420px] xl:h-[480px] 
                       bg-cover bg-center my-5 cursor-pointer 
                       rounded-2xl overflow-hidden"
            style={{
              backgroundImage: `url(${v.poster.url})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              opacity: '1',
            }}
          >
            <div className="flex w-full h-full text-white bg-black/30 rounded-2xl">
              {/* LEFT CONTENT */}
              <div className="w-1/2 flex flex-col justify-center items-center gap-4 text-center px-6">
                <h1 className="text-3xl xl:text-5xl font-bold">
                  {v.name}
                </h1>

                <h2 className="text-lg xl:text-2xl">
                  {v.genre} | {v.category}
                </h2>

                <button className="bg-gray-900 px-6 py-2 rounded 
                                   font-bold hover:bg-black transition">
                  Book me
                </button>
              </div>

              {/* RIGHT POSTER */}
              <div className="w-1/2 flex justify-center items-center">
                <img
                  src={v.poster.url}
                  className="w-[60%] h-[85%] object-cover rounded-2xl shadow-2xl"
                  alt={v.name}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
