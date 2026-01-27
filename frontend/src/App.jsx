import React, { createContext, useEffect, useState } from 'react'
import Navbar from './Layout/Navbar.jsx'
import Footer from './Layout/Footer.jsx'
import Upcoming from './pages/Upcoming_movie_inner.jsx'
import Home from './pages/Home.jsx'
import Movie from './pages/MovieDetailsPage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import History from './pages/History.jsx'
export const theatrescontext = createContext();
export const moviecontext = createContext();
import "./App.css"
import MovieList from './pages/MovieList.jsx'
import { endPoints } from './constants/api.constants.js'

function App() {
  let [open, setOpen] = useState([])
  const [Mov, setMovie] = useState([]);
  const fetchMovies = async () => {

    const res = await fetch(endPoints.movies.list);
    const data = await res.json();
    setMovie(data.data);
  };

  useEffect(() => {

    fetchMovies();
  }, []);
  let [theatres, setTheatres] = useState([])
  const fetchTheatres = async () => {
    const res = await fetch("/api/theatres/gettheatres")
    const data = await res.json();
    setTheatres(data.data)
  };
  useEffect(() => {

    fetchTheatres();
  }, [])

  return (

    <div>

      <moviecontext.Provider value={{ Mov, setMovie }}>
        <theatrescontext.Provider value={{ theatres, setTheatres }}>
          <BrowserRouter>
            {/* {!location.pathname.includes("/history") && <Navbar/>} */}
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />}> </Route>
              <Route path='/history' element={<History />}></Route>
              <Route path='/UpComing' element={<Upcoming />}></Route>
              <Route path='/movies/list/:key/:value' element={<MovieList />}></Route>
              <Route path="/movies/:id" element={<Movie />} />

            </Routes>


          </BrowserRouter>
        </theatrescontext.Provider>
      </moviecontext.Provider>


      {!location.pathname.includes("history") && <Footer />}
    </div>
  )
}

export default App
