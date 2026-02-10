function ProfileModal({ onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      ></div>

      {/* Right Drawer */}
      <div className="
        fixed top-0 right-0 h-full w-[360px] bg-white z-50
        p-4 shadow-xl
        animate-slideIn
      ">
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-3">
          <button
            onClick={onClose}
            className="text-xl font-semibold"
          >
            ←
          </button>
          <h3 className="text-lg font-semibold">Profile</h3>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4 my-6">
          <div className="w-12 h-12 rounded-full bg-violet-200 flex items-center justify-center text-xl font-semibold">
            U
          </div>
          <div>
            <h4 className="font-medium">User</h4>
            <p className="text-sm text-gray-600">+91 9174025077</p>
          </div>
        </div>

        {/* Bookings */}
        <div className="mb-6">
          <div className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 transition rounded-xl px-4 py-3 cursor-pointer">
            📄 <span className="font-medium">View all bookings</span>
          </div>
        </div>

        {/* Support */}
        <div className="mb-6">
          <h5 className="text-sm text-gray-500 mb-2">Support</h5>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 transition rounded-xl px-4 py-3 cursor-pointer">
              ❓ <span>Frequently Asked Questions</span>
            </div>

            <div className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 transition rounded-xl px-4 py-3 cursor-pointer">
              📞 <span>Contact Us</span>
            </div>
          </div>
        </div>

        {/* More */}
        <div>
          <h5 className="text-sm text-gray-500 mb-2">More</h5>

          <div className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 transition rounded-xl px-4 py-3 cursor-pointer">
            📃 <span>Terms & Conditions</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileModal;
