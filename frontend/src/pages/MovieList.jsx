import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function MovieList() {
    let { key, value } = useParams();
    let [movies, setMovies] = useState([])
    let navigate = useNavigate()

    let getMovies = async () => {
        let { data } = await axios(`/api/movie/filtermovie/${key}/${value}`)
        setMovies([...data.data])
    }

    useEffect(() => {
        getMovies()
    }, [key, value])

    return (
        <div className='p-4 sm:p-6 md:p-10'>

            {/* Header */}
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                <h2 className='text-2xl sm:text-3xl font-bold'>
                    All {value} Movies
                </h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 py-4">
                {["Filter", "Top Selling", "English", "Hindi", "Romance", "Drama", "3D"].map((b) => (
                    <button
                        key={b}
                        className="px-4 py-2 text-sm sm:text-base bg-gray-100 border rounded-xl hover:bg-gray-200 transition"
                    >
                        {b}
                    </button>
                ))}
            </div>

            {/* Movie Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 w-full p-2'>
                {
                    movies.map((v, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(`/movies/${v._id}`)}
                            className='cursor-pointer border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white'
                        >
                            <img
                                src={v.poster.url}
                                alt=""
                                className='w-full h-[260px] sm:h-[300px] object-cover'
                            />

                            <div className='p-3'>
                                <p className='font-bold text-base sm:text-lg truncate'>
                                    {v.name}
                                </p>

                                <div className='flex items-center gap-2 text-gray-500 text-sm font-semibold mt-1 flex-wrap'>
                                    <p>{v.genre}</p>
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                                    <p>{v?.languages.slice(0, 2).join(", ")}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
