import React, { useState } from 'react'

export default function TimeCard({ time }) {
    let [timePop, setTimePop] = useState(false)

    return (
        <div
            className='border relative border-gray-500 px-4 sm:px-6 md:px-8 py-2 rounded cursor-pointer'
            onMouseLeave={() => setTimePop(false)}
            onMouseEnter={(e) => {
                e.preventDefault();
                setTimePop(true)
            }}
        >
            <p className='font-semibold text-sm sm:text-base text-center'>
                {new Date(time.time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </p>

            {timePop && (
                <div className='absolute left-1/2 -translate-x-1/2 top-11 z-20 bg-gray-200 rounded shadow-md flex flex-wrap gap-3 px-3 py-2 min-w-[180px] max-w-[90vw]'>
                    {time.seatCategories.map((v, i) => (
                        <div
                            key={i}
                            className='px-2 py-1 text-center'
                        >
                            <p className='text-xs sm:text-sm font-light whitespace-nowrap'>
                                {v.categoryName}
                            </p>
                            <p className='text-sm sm:text-base font-medium'>
                                ₹{v.price}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
