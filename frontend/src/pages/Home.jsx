import React from 'react'
import Content from '../components/HomeHeroSlider.jsx'

import Movie from '../components/Movie.jsx'
import Upmovie from '../components/Upcoming_movie_Home.jsx'
import Lang from '../components/Explore Language.jsx'
import Genre from '../components/Explore Genre .jsx'

function Home() {
  return (
    <div className=''>
      <Content />
      <Movie />
      <Upmovie />
      <Lang />
      <Genre />
    </div>
  )
}

export default Home
