import React, { useState } from 'react'

export default function TimeCard({ time }) {
    let [timePop, setTimePop] = useState(false)
    return (
        <div className='border relative border-gray-500  px-8 py-2 rounded  ' onMouseLeave={() => { setTimePop(false) }} onMouseEnter={(e) => {
            e.preventDefault();
            setTimePop(true)
        }}  >
            <p className='font-semibold'> {new Date(time.time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
            {timePop && <div className='absolute flex gap-2 bg-gray-200 z-10 top-11'>
                {time.seatCategories.map((v, i) => {
                    return <div className='top-11  px-3 py-2'>
                        <p className=' font-thin'>{v.categoryName}</p>
                        <p className=' font-medium'> ₹{v.price}</p>
                    </div>
                })}
            </div>}
        </div>
    )
}
