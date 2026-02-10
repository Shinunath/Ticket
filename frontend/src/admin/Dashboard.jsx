import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
export default function Dashboard() {
    return (
        <div className='flex w-full h-full'>
            <Sidebar />
            <div className="main w-full p-6 overflow-auto ">
                <Outlet />
            </div>
        </div>
    )
}
