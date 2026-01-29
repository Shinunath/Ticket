import React, { useState, useContext } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { moviecontext, theatrescontext } from '../App'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [opent, setOpent] = useState(false)
  const [order, setOrder] = useState(false)
  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)
  const [search, setSearch] = useState(false)
  const [profile, setProfile] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  let { Mov } = useContext(moviecontext)
  let { theatres } = useContext(theatrescontext)

  const navigate = useNavigate()
  const location = useLocation()
  const isHistoryPage = location.pathname === "/history"

  const [filter, setFilter] = useState("")
  const filtermovie = Mov.filter(m =>
    m.name.toLowerCase().includes(filter.toLowerCase())
  )

  const [formLoginData, setFormLogindata] = useState({
    email: "",
    password: ""
  })

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/user/login", formLoginData)
      if (data.success) {
        localStorage.setItem("token", data.token)
        setLogin(false)
        navigate("/history")
      }
    } catch (err) {
      console.error(err)
    }
  }

  let ordercheck = async () => {
    try {
      let token = localStorage.getItem("token")
      let { data } = await axios.get("/api/user/profile", {
        headers: { token }
      })
      if (data.success) navigate("/history")
      else setLogin(true)
    } catch {
      setLogin(true)
    }
  }

  return (
    <div className="sticky top-0 z-40 bg-white">

      {/* NAVBAR */}
      <nav className="w-full backdrop-blur-md bg-white/70 shadow-md border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* LOGO */}
          <div
            className="text-amber-800 text-3xl font-extrabold cursor-pointer"
            onClick={() => navigate('/')}
          >
            Ticket
          </div>

          {/* DESKTOP MENU */}
          {!isHistoryPage && (
            <div className="hidden md:flex items-center gap-10 text-lg font-medium text-gray-700">
              <NavLink to="/" className="hover:text-amber-700">Home</NavLink>

              <button
                onMouseEnter={() => { setOpent(false); setOpen(true) }}
                className="hover:text-amber-700"
              >
                Movies
              </button>

              <button
                onMouseEnter={() => { setOpen(false); setOpent(true) }}
                className="hover:text-amber-700"
              >
                Theatres
              </button>

              <button onClick={ordercheck} className="hover:text-amber-700">
                Orders
              </button>
            </div>
          )}

          {/* RIGHT ICONS */}
          <div className="hidden md:flex items-center gap-4">
            <input
              type="search"
              placeholder="🔍 Search"
              onClick={() => setSearch(true)}
              className="border px-4 py-2 rounded-lg"
            />
            <div
              className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center text-xl cursor-pointer"
              onClick={() => setProfile(true)}
            >
              🧑🏻
            </div>
          </div>

          {/* HAMBURGER */}
          <div className="md:hidden text-3xl cursor-pointer"
            onClick={() => setMobileMenu(!mobileMenu)}>
            ☰
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow-lg border-b">
          <div className="flex flex-col gap-4 px-6 py-4 text-lg font-medium">
            <NavLink to="/" onClick={() => setMobileMenu(false)}>Home</NavLink>

            <button onClick={() => {
              setMobileMenu(false)
              setOpen(true)
            }}>
              Movies
            </button>

            <button onClick={() => {
              setMobileMenu(false)
              setOpent(true)
            }}>
              Theatres
            </button>

            <button onClick={() => {
              setMobileMenu(false)
              ordercheck()
            }}>
              Orders
            </button>

            <button onClick={() => {
              setMobileMenu(false)
              setSearch(true)
            }}>
              Search
            </button>

            <button onClick={() => {
              setMobileMenu(false)
              setProfile(true)
            }}>
              Profile
            </button>
          </div>
        </div>
      )}

      {/* MOVIES DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex justify-center items-start mt-24">
          <DialogPanel className="bg-white p-6 rounded-lg w-full max-w-3xl">
            <DialogTitle className="text-xl font-bold mb-4">Now Playing</DialogTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Mov.map(v => (
                <div
                  key={v._id}
                  onClick={() => {
                    setOpen(false)
                    navigate(`/movies/${v._id}`)
                  }}
                  className="flex gap-3 cursor-pointer"
                >
                  <img src={v.poster.url} className="w-20 h-10 rounded" />
                  <div>
                    <p className="font-bold">{v.name}</p>
                    <p className="text-sm">{v.genre}</p>
                  </div>
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* SEARCH */}
      <Dialog open={search} onClose={() => setSearch(false)} className="relative z-50">
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md">
          <DialogPanel className="bg-white p-6 rounded-lg w-full max-w-3xl">
            <input
              className="w-full border p-2 rounded"
              placeholder="Search..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtermovie.map(v => (
                <div
                  key={v._id}
                  onClick={() => navigate(`/movies/${v._id}`)}
                  className="flex gap-3 cursor-pointer"
                >
                  <img src={v.poster.url} className="w-20 h-10 rounded" />
                  <p>{v.name}</p>
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* LOGIN */}
      <Dialog open={login} onClose={() => setLogin(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <DialogPanel className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <form onSubmit={submitHandler} className="space-y-4">
              <input
                type="email"
                className="w-full border p-2 rounded"
                placeholder="Email"
                onChange={(e) =>
                  setFormLogindata({ ...formLoginData, email: e.target.value })
                }
              />
              <input
                type="password"
                className="w-full border p-2 rounded"
                placeholder="Password"
                onChange={(e) =>
                  setFormLogindata({ ...formLoginData, password: e.target.value })
                }
              />
              <button className="w-full bg-amber-500 py-2 rounded">
                Login
              </button>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

    </div>
  )
}

export default Navbar
