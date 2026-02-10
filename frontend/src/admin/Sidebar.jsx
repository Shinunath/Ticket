import axios from 'axios'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Sidebar() {
    let nav = useNavigate()
    let logout = async () => {
        let { data } = await axios.get("/api/admin/logout");

        if (data.success) {
            console.log(data.message);
            nav("/loginadmin")
        } else {
            console.log(data.message)
        }
    }
    return (
        <div className='w-80 bg-blue-600 h-screen flex flex-col p-6 gap-5 justify-start'>
            <div className="logo text-white text-3xl font-bold">
                Logo
            </div>
            <div className="flex flex-col gap-5 ">
                <NavLink className="p-2 transition-all duration-500 cursor-pointer text-white bg-gray-500 hover:text-blue-800 hover:bg-amber-100 text-xl font-medium" to="addmovie">AddMovie</NavLink>
                <NavLink className="p-2 transition-all duration-500 cursor-pointer text-white bg-gray-500 hover:text-blue-800 hover:bg-amber-100 text-xl font-medium" to="allmovies">AllMovie</NavLink>
                <NavLink className="p-2 transition-all duration-500 cursor-pointer text-white bg-gray-500 hover:text-blue-800 hover:bg-amber-100 text-xl font-medium" to="addtheatre">AddTheatre</NavLink>
                <NavLink className="p-2 transition-all duration-500 cursor-pointer text-white bg-gray-500 hover:text-blue-800 hover:bg-amber-100 text-xl font-medium" to="alltheatres">AllTheatre</NavLink>
                <NavLink className="p-2 transition-all duration-500 cursor-pointer text-white bg-gray-500 hover:text-blue-800 hover:bg-amber-100 text-xl font-medium" to="createshow">CreateShow</NavLink>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
