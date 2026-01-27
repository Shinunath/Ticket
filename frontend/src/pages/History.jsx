import React, { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

function History() {

  const [profile, setProfile] = useState(false)
  return (
    <div className='h-screen'>
      {/* <nav className="w-full bg-white shadow-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

    <div className="text-amber-700 text-3xl font-extrabold cursor-pointer">
      Ticket Wala
    </div>

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

  </div>
</nav> */}

      <div className='w-full h-[87%] text-center flex flex-col items-center justify-center text-4xl'>
        <img src="https://images.openai.com/thumbnails/url/iilVPXicu5mVUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw4K8vfNSnd2rLL0KgvJzM9L9QpPdc90r4wszfN0raxIcTRMrsw2CfBw9i-pyLJM8_MOUysGAJbeJx4?utm_source=chatgpt.com" alt="" className='w-[20%]' />
        No Booking Yet
      </div>

      <Dialog
        open={profile}
        onClose={() => setProfile(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={() => setProfile(false)}
        />

        <div className="fixed inset-0 flex justify-end">
          <DialogPanel
            className="w-[340px] h-full bg-white shadow-2xl p-6 rounded-l-3xl 
                        transform transition-all duration-300 animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-3xl font-semibold mb-6">Profile</h1>

            <div className="flex items-center gap-4 mb-8">
              <p className="w-14 h-14 rounded-full bg-indigo-500 flex justify-center 
                             items-center text-white text-2xl font-semibold">
                U
              </p>

              <div>
                <h2 className="text-lg font-bold">User</h2>
                <h3 className="text-gray-600 text-sm">Email</h3>
              </div>
            </div>

            <div className="shadow-md rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition">
              <div className="flex justify-between items-center text-sm">
                <h3 className="font-medium">View All Booking</h3>
                <span>➪</span>
              </div>
            </div>

            <p className="mt-8 mb-2 text-sm font-bold text-gray-700">Support</p>

            <div className="shadow-md rounded-xl">
              <div className="flex justify-between items-center h-12 px-4 cursor-pointer hover:bg-gray-50">
                <h3>Frequently Asked Questions</h3>
                <span>➪</span>
              </div>
              <hr />
              <div className="flex justify-between items-center h-12 px-4 cursor-pointer hover:bg-gray-50">
                <h3>Contact Us</h3>
                <span>➪</span>
              </div>
            </div>

            <p className="mt-8 mb-2 text-sm font-bold text-gray-700">More</p>

            <div className="shadow-md rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
              <h3>Terms and Conditions</h3>
              <span>➪</span>
            </div>

            <div className="shadow-md rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 mt-3">
              <h3 className="text-red-600 font-semibold">Logout</h3>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

export default History
