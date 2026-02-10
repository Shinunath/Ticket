import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { NavLink } from 'react-router-dom';
import axios from 'axios';


function ExGenre() {
  const [genre, setGenre] = useState([]);

  const fetchGenres = async () => {
    try {
      const res = await axios.get('/api/movies');
      setGenre(res.data.data || []);
    } catch (error) {
      console.log("Error while fetching genre data", error);
      setGenre([]);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div className="m-4 sm:m-6 md:m-10">
      <h2 className="text-xl sm:text-2xl font-bold px-3 mb-3">
        Explore Latest Movies in Indore by Genre
      </h2>

      <Swiper slidesPerView="auto" spaceBetween={12}>
        {genre.map((v, i) => (
          <SwiperSlide key={i} className="!w-auto">
            <NavLink
              to={`/movies/list/category/${v.lan}`}
              className="flex items-center gap-2 border bg-gray-100 
                         px-4 py-2 rounded-2xl hover:bg-gray-200"
            >
              🎬 {v.genre} Movies
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


export default ExGenre;
