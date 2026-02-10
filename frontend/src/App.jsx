import React, { createContext, useEffect, useState } from 'react'
import Navbar from './Layout/Navbar.jsx'
import Footer from './Layout/Footer.jsx'
import Upcoming from './pages/Upcoming_movie_inner.jsx'
import Home from './pages/Home.jsx'
import Movie from './pages/MovieDetailsPage.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import History from './pages/History.jsx'
export const theatrescontext = createContext();
export const moviecontext = createContext();
import "./App.css"
import MovieList from './pages/MovieList.jsx'
import { endPoints } from './constants/api.constants.js'
import ProtectedRoute from './admin/ProtectedRoute.jsx'
import Dashboard from './admin/Dashboard.jsx'
import Dash from './admin/Dash.jsx'
import AddMovie from './admin/AddMovie.jsx'
import AddTheatres from './admin/AddTheatres.jsx'
import AllTheatres from './admin/AllTheatres.jsx'
import AllMovies from './admin/AllMovies.jsx'
import CreateShow from './admin/CreateShow.jsx'
import LoginAdmin from './admin/LoginAdmin.jsx'

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
    const res = await fetch(`/api/theatres/gettheatres`)
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

          {!location.pathname.includes("dashboard") && <Navbar />}

          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/history' element={<History />} />
            <Route path='/UpComing' element={<Upcoming />} />
            <Route path='/movies/list/:key/:value' element={<MovieList />} />
            <Route path='/movies/:id' element={<Movie />} />
            <Route path='/loginadmin' element={<LoginAdmin />}></Route>


            {/* dashboard routes */}
            <Route path='/dashboard' element={<ProtectedRoute > <Dashboard /></ProtectedRoute>}>
              <Route index element={<Dash />}></Route>
              <Route path='addmovie' element={<AddMovie />}></Route>
              <Route path='addtheatre' element={<AddTheatres />}></Route>
              <Route path='alltheatres' element={<AllTheatres />}></Route>
              <Route path='allmovies' element={<AllMovies />}></Route>
              <Route path='createshow' element={<CreateShow />}></Route>
            </Route>
          </Routes>


          {!location.pathname.includes("history") && <Footer />}

        </theatrescontext.Provider>
      </moviecontext.Provider>
    </div>

  )
}

export default App
