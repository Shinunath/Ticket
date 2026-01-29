import React from "react";

function Footer() {
  return (
    <footer className="bg-white mt-10 border-t border-gray-300 shadow-inner">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16">

        {/* Scroll to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute end-4 top-4 bg-amber-700 text-white p-3 rounded-full shadow-lg 
                     hover:bg-amber-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <div className="lg:flex lg:items-start lg:justify-between gap-10 text-center lg:text-left">

          {/* Brand */}
          <div>
            <h2
              className="text-3xl font-extrabold text-amber-800 tracking-wide"
              style={{ fontFamily: "Pacifico" }}
            >
              Ticket Wala
            </h2>

            <p className="mt-4 max-w-md mx-auto lg:mx-0 text-gray-600 leading-relaxed">
              Book your favorite movies, shows & events quickly and easily with Ticket Wala.
              Fast, simple & secure ticket booking.
            </p>
          </div>

          {/* Links */}
          <div className="mt-10 lg:mt-0">
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-6 sm:gap-10 text-gray-700">

              <li className="flex items-center gap-2 cursor-pointer hover:text-amber-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-7 9 7v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V9h6v12" />
                </svg>
                Home
              </li>

              <li className="flex items-center gap-2 cursor-pointer hover:text-amber-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M7 5l2 3M17 5l-2 3M7 19l2-3M17 19l-2-3" />
                </svg>
                Movies
              </li>

              <li className="flex items-center gap-2 cursor-pointer hover:text-amber-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 21V7l9-4 9 4v14H3z" />
                  <path d="M9 21v-6h6v6" />
                </svg>
                Theatres
              </li>

              <li className="flex items-center gap-2 cursor-pointer hover:text-amber-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8h3a3 3 0 0 0 6 0h3a3 3 0 0 0 6 0h3v8h-3a3 3 0 0 0-6 0h-3a3 3 0 0 0-6 0H3z" />
                </svg>
                Orders
              </li>

            </ul>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Ticket Wala — All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
