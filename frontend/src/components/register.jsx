import React, { useState } from "react";
import axios from "axios";

const Register = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobileNumber: "",
        address: "",
        interest: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const inputhandler = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "email"
                    ? value.toLowerCase()
                    : name === "name"
                        ? value.trimStart()
                        : value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const payload = {
                ...formData,
                mobileNumber: Number(formData.mobileNumber), // ✅ FIX
            };

            await axios.post("/api/user/register", payload);

            setMessage("✅ Registration successful. Redirecting to OTP verification...");

            setTimeout(() => {
                onSuccess(formData.email);
            }, 1000);

        } catch (error) {
            console.log("REGISTER ERROR:", error.response?.data);
            setMessage(error.response?.data?.message || "❌ Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submitHandler} className="px-6 space-y-4">

            <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="name"
                value={formData.name}
                onChange={inputhandler}
                placeholder="Full Name"
                minLength={2}
                required
            />

            <input
                type="email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="email"
                value={formData.email}
                onChange={inputhandler}
                placeholder="Email Address"
                required
            />

            <input
                type="password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="password"
                value={formData.password}
                onChange={inputhandler}
                placeholder="Password (min 6 chars)"
                minLength={6}
                required
            />

            <input
                type="tel"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={inputhandler}
                placeholder="Mobile Number"
                pattern="[0-9]{10}"
                required
            />

            <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="address"
                value={formData.address}
                onChange={inputhandler}
                placeholder="Address (optional)"
            />

            <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                name="interest"
                value={formData.interest}
                onChange={inputhandler}
            >
                <option value="">Favourite Genre (optional)</option>
                <option>Action</option>
                <option>Comedy</option>
                <option>Romance</option>
                <option>Thriller</option>
                <option>Horror</option>
            </select>

            {message && (
                <p className="text-sm text-center text-gray-700 truncate">
                    {message}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-black font-semibold transition"
            >
                {loading ? "Registering..." : "Register"}
            </button>
        </form>
    );
};

export default Register;
