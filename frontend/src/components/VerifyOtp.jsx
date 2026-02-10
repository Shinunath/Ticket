import React, { useEffect, useState } from "react";
import axios from "axios";

const VerifyOtp = ({ email, onSuccess }) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30); // 10 minutes
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState({});

  // countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // format time mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // verify otp
  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("VERIFY OTP DATA:", { email, otp });
    setResponse({ isLoading: true });
    try {
      const response = await axios.post("/api/user/verify-otp", {
        email,
        otp,
      });
      setResponse({ data: response.data });
      onSuccess();
    } catch (error) {
      setResponse({ ...error.response?.data });
      setMessage(error.response?.data?.message || "OTP verification failed");
    }
  };


  // resend otp
  const resendOtpHandler = async () => {
    setResendLoading(true);
    setMessage("");

    try {
      await axios.post("/api/user/resend-otp", { email });
      setMessage("📩 OTP resent successfully");
      setTimeLeft(30); // reset timer
    } catch (error) {
      setMessage(
        error.response?.data?.message || "❌ Failed to resend OTP"
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="px-6 py-6 space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-center">
        Verify OTP
      </h2>

      <p className="text-sm text-center text-gray-600 truncate">
        OTP sent to {email}
      </p>

      <input
        type="text"
        maxLength={6}
        className="w-full text-center tracking-widest px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />

      <div className="text-center text-sm text-gray-600">
        {timeLeft > 0 ? (
          <>OTP expires in <span className="font-semibold">{formatTime(timeLeft)}</span></>
        ) : (
          <span className="text-red-500">OTP expired</span>
        )}
      </div>

      <button
        type="submit"
        disabled={response.isLoading || timeLeft <= 0}
        className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-black font-semibold transition"
      >
        {response.isLoading ? "Verifying..." : "Verify OTP"}
      </button>

      <button
        type="button"
        onClick={resendOtpHandler}
        disabled={timeLeft > 0 || resendLoading || response.isLoading}
        className="w-full py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 transition"
      >
        {resendLoading ? "Resending..." : "Resend OTP"}
      </button>

      {response.message && (
        <p className="text-center text-sm text-gray-700 truncate">
          {response.message}
        </p>
      )}
    </form>
  );
};

export default VerifyOtp;
