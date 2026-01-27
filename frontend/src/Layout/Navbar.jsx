import React, { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useContext } from 'react'
import { moviecontext, theatrescontext } from '../App';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import History from '../pages/History'
function Navbar() {
  const [open, setOpen] = useState(false)
  const [opent, setOpent] = useState(false)
  const [order, setOrder] = useState(false)
  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)
  const [search, setSearch] = useState(false)
  const [profile, setProfile] = useState(false)
  let { Mov, setMovie } = useContext(moviecontext)
  let [filter, setFilter] = useState("");
  let { theatres, setMovietheatres } = useContext(theatrescontext)
  const navigate = useNavigate();
  const releasedmov = Mov?.filter(movie => movie.released === true)
  const filtermovie = Mov.filter((m) =>
    m.name.toLowerCase().includes(filter.toLowerCase())
  );
  const location = useLocation();

  const isHistoryPage = location.pathname === "/history";

  const [formLoginData, setFormLogindata] = useState({
    email: "",
    password: ""
  });
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    address: "",
    interest: ""
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/login",
        { ...formLoginData }
      );
      console.log(data);
      if (data.success) {
        localStorage.setItem("token", data.token);
        setLogin(false);
        navigate("/history")
      } else {
        console.log(data.message)
      }

    } catch (err) {
      console.error(err, err?.response?.data);
    }
  };
  const submitRegisterHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:4000/api/user/register",
        { ...formData }
      );
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const inputhandler = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  let ordercheck = async () => {
    try {
      let token = localStorage.getItem("token");
      let { data } = await axios.get("http://localhost:4000/api/user/profile", {
        headers: {
          token: token
        }
      })
      if (data.success) {
        navigate("/history")
      } else {
        setLogin(true)
      }
    } catch (error) {
      console.log(error?.response?.data)
      setLogin(true)
    }
  }
  return (
    <div className='sticky top-0 z-40 bg-white' >

      <nav className=" top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <div
            className="text-amber-800 text-3xl font-extrabold cursor-pointer hover:scale-105 transition"
            onClick={() => navigate('/')}
          >
            Ticket
          </div>
          {!isHistoryPage ? (
            <>
              <div className="hidden md:flex items-center gap-10 text-lg font-medium text-gray-700">
                <NavLink className="hover:text-amber-700 cursor-pointer transition"
                  // onClick={() => navigate('/')}
                  to={"/"}>
                  Home
                </NavLink>
                <NavLink className="hover:text-amber-700 cursor-pointer transition"

                  onMouseEnter={() => {
                    setOpent(false)
                    setOpen(true)
                  }}
                >
                  Movies
                </NavLink>
                <NavLink className="hover:text-amber-700 cursor-pointer transition"
                  onMouseEnter={() => {
                    setOpen(false)
                    setOpent(true)
                  }}>Theatres
                </NavLink>
                <button className="hover:text-amber-700 cursor-pointer transition"
                  onClick={ordercheck}>Orders
                </button>
              </div>
              <div className="flex items-center gap-5">
                <input
                  type="search"
                  placeholder="🔍 Search movies or cinemas"
                  onClick={() => setSearch(true)}
                  className="border border-gray-300 px-4 py-2 w-72 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <div
                  className="w-11 h-11 rounded-full bg-gray-200 flex justify-center items-center text-2xl cursor-pointer hover:bg-gray-300 transition"
                  onClick={() => setProfile(true)}>🧑🏻</div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-700 tracking-wide">
                Review Your Orders
              </h2>

              <div
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center
      text-3xl cursor-pointer hover:bg-gray-200 transition"
                onClick={() => setProfile(true)}
              >
                🧑🏻
              </div>
            </>
          )}
        </div>
      </nav>

      {/* movies */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}


        className="relative z-10"
      >
        <div
          className="fixed backdrop-blur-md inset-0 flex my-20 justify-center p-4 pointer-events-none h-screen"
        >
          <div
            className="pointer-events-auto"
            onMouseEnter={() => {
              setOpen(true)
            }}
            onMouseLeave={() => setOpen(false)}
          >
            <DialogPanel className="bg-white rounded-lg w-screen max-w-4xl p-6">
              <DialogTitle className="text-xl font-bold mb-4">Now Playing</DialogTitle>
              <div className="flex flex-wrap gap-4 ">

                {/* {releasedmov.map((v, i) => { */}

                {Mov.map((v, i) => {
                  return (
                    <div className="flex w-[45%] gap-3 items-center" onClick={() => {
                      setOpen(false);
                      navigate(`/movies/${v._id}`)
                    }}>
                      <img
                        src={v.poster.url}
                        alt="Teri Ishk Mein"
                        className="w-20 rounded size-fit h-10"
                      />
                      <div>
                        <p className="font-bold">{v.name}</p>
                        <p>{v.genre} {v?.languages?.join(", ")}</p>
                      </div>

                    </div>
                  )
                })}


              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Login */}
      <Dialog open={login} onClose={() => setLogin(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl bg-white shadow-xl border border-gray-200"
          >
            <h1 className="text-center text-3xl font-extrabold text-amber-700 mt-6">
              Ticket Wala
            </h1>

            <p className="text-center text-gray-500 text-sm mb-6">
              Login
            </p>

            <form onSubmit={submitHandler} className="px-6 space-y-4">


              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="email"
                value={formLoginData.email}
                onChange={(e) => {
                  setFormLogindata({ ...formLoginData, "email": e.target.value })
                }}
                placeholder="Email Address"
                required
              />

              <input
                type="password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="password"
                value={formLoginData.password}
                onChange={(e) => {
                  setFormLogindata({ ...formLoginData, "password": e.target.value })
                }}
                placeholder="Password"
                required
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6 mb-6">
              Don't have an account?{" "}
              <span className="text-amber-600 cursor-pointer font-semibold" onClick={() => {
                setLogin(false);
                setRegister(true)
              }}>
                Register
              </span>
            </p>
          </DialogPanel>
        </div>
      </Dialog>
      {/* Register */}
      <Dialog open={register} onClose={() => setRegister(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl bg-white shadow-xl border border-gray-200"
          >
            <h1 className="text-center text-3xl font-extrabold text-amber-700 mt-6">
              Ticket Wala
            </h1>

            <p className="text-center text-gray-500 text-sm mb-6">
              Create your account
            </p>

            <form onSubmit={submitRegisterHandler} className="px-6 space-y-4">
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="name"
                value={formData.name}
                onChange={inputhandler}
                placeholder="Full Name"
                required
              />

              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="email"
                value={formData.email}
                onChange={inputhandler}
                placeholder="Email Address"
                required
              />

              <input
                type="password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="password"
                value={formData.password}
                onChange={inputhandler}
                placeholder="Password"
                required
              />

              <input
                type="tel"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={inputhandler}
                placeholder="Mobile Number"
                required
              />

              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="address"
                value={formData.address}
                onChange={inputhandler}
                placeholder="Address"
              />

              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="interest"
                value={formData.interest}
                onChange={inputhandler}
                required
              >
                <option value="">Favourite Genre</option>
                <option>Action</option>
                <option>Comedy</option>
                <option>Romance</option>
                <option>Thriller</option>
                <option>Horror</option>
              </select>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition"
              >
                Register
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6 mb-6">
              Already have an account?{" "}
              <span className="text-amber-600 cursor-pointer font-semibold" onClick={() => {
                setRegister(false)
                setLogin(true)
                setLogin(true)
              }}>
                Login
              </span>
            </p>
          </DialogPanel>
        </div>
      </Dialog>


      {/* theatres */}
      <Dialog
        open={opent}
        onClose={() => {
          setOpent(false);

        }
        }

        onMous
        className="relative z-10"
      >
        <div
          className="fixed inset-0 flex my-20 justify-center p-4 pointer-events-none backdrop-blur-md h-full"
        >
          <div
            className="pointer-events-auto"
            onMouseEnter={() => {
              setOpent(true);

            }

            }
            onMouseLeave={() => setOpent(false)}
          >
            <DialogPanel className="bg-white rounded-lg w-screen max-w-4xl p-6">
              <DialogTitle className="text-xl font-bold mb-4">Theatres </DialogTitle>
              <div className="flex flex-wrap gap-10 justify-center">
                {theatres.map((v, i) => {
                  return (
                    <div className='w-[45%]'>
                      {v.name},{v.location},{v.city}
                      <hr />
                    </div>
                  )
                })}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Orders */}
      <Dialog open={order} onClose={() => setOrder(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl bg-white shadow-xl border border-gray-200"
          >
            <h1 className="text-center text-3xl font-extrabold text-amber-700 mt-6">
              Ticket Wala
            </h1>

            <p className="text-center text-gray-500 text-sm mb-6">
              Create your account
            </p>

            <form onSubmit={submitHandler} className="px-6 space-y-4">
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="name"
                value={formData.name}
                onChange={inputhandler}
                placeholder="Full Name"
                required
              />

              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="email"
                value={formData.email}
                onChange={inputhandler}
                placeholder="Email Address"
                required
              />

              <input
                type="password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="password"
                value={formData.password}
                onChange={inputhandler}
                placeholder="Password"
                required
              />

              <input
                type="tel"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={inputhandler}
                placeholder="Mobile Number"
                required
              />

              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="address"
                value={formData.address}
                onChange={inputhandler}
                placeholder="Address"
              />

              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="interest"
                value={formData.interest}
                onChange={inputhandler}
                required
              >
                <option value="">Favourite Genre</option>
                <option>Action</option>
                <option>Comedy</option>
                <option>Romance</option>
                <option>Thriller</option>
                <option>Horror</option>
              </select>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition"
              >
                Register
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6 mb-6">
              Already have an account?{" "}
              <span className="text-amber-600 cursor-pointer font-semibold">
                Login
              </span>
            </p>
          </DialogPanel>
        </div>
      </Dialog>




      {/* search */}
      <Dialog
        open={search}
        onClose={() => setSearch(false)}
        className="relative z-10"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="pointer-events-auto">
            <DialogPanel className="bg-white rounded-lg w-screen max-w-4xl p-6">

              {/* Search Input */}
              <input
                type="search"
                className="border w-[90%] p-2 rounded-md"
                placeholder="🔍 Search for movies, cinemas and more"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />

              <DialogTitle className="text-xl font-bold my-4">
                Trending
              </DialogTitle>

              <div className="flex flex-wrap gap-4">
                {filtermovie.length === 0 ? (
                  <p className="text-gray-500">No results found</p>
                ) : (
                  filtermovie.map((v) => (
                    <div
                      key={v.id}
                      className="flex w-[45%] gap-3 items-center cursor-pointer"
                      onClick={() => navigate(`/movies/${v._id}`)}
                    >
                      <img
                        src={v.poster.url}
                        className="w-20 h-10 rounded object-cover"
                        alt={v.name}
                      />
                      <div>
                        <p className="font-bold">{v.name}</p>
                        <p className="text-sm">{v.genre} • {v.languages}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </DialogPanel>
          </div>
        </div>
      </Dialog>


      {/* profile */}
      <Dialog
        open={profile}
        onClose={() => setProfile(false)}
        className="relative z-50"
      >
        <div
          className=" fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={() => setProfile(false)}
        />


        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl bg-white shadow-xl border border-gray-200"
          >
            <h1 className="text-center text-3xl font-extrabold text-amber-700 mt-6">
              Ticket Wala
            </h1>

            <p className="text-center text-gray-500 text-sm mb-6">
              Create your account
            </p>

            <form onSubmit={submitHandler} className="px-6 space-y-4">
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="name"
                value={formData.name}
                onChange={inputhandler}
                placeholder="Full Name"
                required
              />

              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="email"
                value={formData.email}
                onChange={inputhandler}
                placeholder="Email Address"
                required
              />

              <input
                type="password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="password"
                value={formData.password}
                onChange={inputhandler}
                placeholder="Password"
                required
              />

              <input
                type="tel"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={inputhandler}
                placeholder="Mobile Number"
                required
              />

              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="address"
                value={formData.address}
                onChange={inputhandler}
                placeholder="Address"
              />

              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="interest"
                value={formData.interest}
                onChange={inputhandler}
                required
              >
                <option value="">Favourite Genre</option>
                <option>Action</option>
                <option>Comedy</option>
                <option>Romance</option>
                <option>Thriller</option>
                <option>Horror</option>
              </select>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition"
              >
                Register
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6 mb-6">
              Already have an account?{" "}
              <span className="text-amber-600 cursor-pointer font-semibold">
                Login
              </span>
            </p>
          </DialogPanel>
        </div>
      </Dialog>

    </div>
  )
}

export default Navbar



