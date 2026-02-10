import React, { useState } from "react";
import axios from "axios";
import { setUserInStorage } from "../utils/storage";

const Login = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState({});

    const inputHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setResponse({ isLoading: true });
        try {
            const res = await axios.post("/api/user/login", formData);

            setMessage("✅ Login successful");
            setResponse({ ...res });
            onSuccess?.(res.data);
            const token = res.data.response.token;
            const user = res.data.response.user;
            console.log('useer', user);
            console.log('respinse', res);


            localStorage.setItem("token", res.data.response.token);
            setUserInStorage(res.data.response.user)
        } catch (error) {
            setResponse({ message: error.response?.data?.message || "Login failed" });
        }
    };

    return (
        <form
            onSubmit={submitHandler}
            className="px-6 py-6 space-y-4 max-w-md mx-auto"
        >
            <h2 className="text-xl font-semibold text-center">
                Login
            </h2>

            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={inputHandler}
                placeholder="Email Address"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
            />

            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={inputHandler}
                placeholder="Password"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
            />

            {response.message && (
                <p className="text-center text-sm text-gray-700 truncate">
                    {response.message}
                </p>
            )}

            <button
                type="submit"
                disabled={response.isLoading}
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-black font-semibold transition"
            >
                {response.isLoading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};

export default Login;
