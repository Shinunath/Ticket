import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function MovieList() {
    let { key, value } = useParams();
    let [movies, setMovies] = useState([])
    let navigate = useNavigate()
    let getMovies = async () => {
        let { data } = await axios(`/api/movie/filtermovie/${key}/${value}`)
        console.log(data)
        setMovies([...data.data])
    }
    useEffect(() => {
        getMovies()
    }, [key, value])
    return (
        <div className='p-5 m-10 '>
            <div className='flex justify-between w-full'>
                <h2 className='text-3xl font-bold'>All {value} Movies</h2>
                {/* <p>View all</p> */}
            </div>
            <div className="flex flex-wrap gap-3 p-5">
                <button className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition">
                    Filter
                </button>

                <button className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition">
                    Top Selling
                </button>

                <button className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition">
                    English
                </button>

                <button className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition">
                    Hindi
                </button>

                <button className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition">
                    Romance
                </button>

                <button className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition">
                    Drama
                </button>

                <button className="px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition">
                    3D
                </button>
            </div>
            {/* 
            <div className='flex gap-5 w-full flex-wrap p-3 bg-amber-300 justify-items-start'>
                {
                    movies.map((v, i) => {
                        return (
                            <div className='w-[200px] h-[450px] border rounded-b-lg  ' onClick={() => { navigate(`/movies/${v._id}`); }}>
                                <img src={v.poster.url} alt="" className='w-full h-[85%] object-cover' />
                                <p className='px-5 font-bold text-xl py-1'>{v.name}</p>
                                <div className='flex items-center px-5 gap-2 text-gray-500 text-[14px]  font-bold'>
                                    <p className=''>{v.genre}</p>
                                    <span className="w-1.5 h-1.5 rounded-2xl bg-gray-500 "></span>
                                    <p>{v?.languages.slice(0, 2).join(", ")}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div> */}
        </div>
    )
}
