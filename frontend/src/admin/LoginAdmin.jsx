import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function LoginAdmin() {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let nav = useNavigate()
    let submitHandler = async (e) => {
        e.preventDefault();
        try {
            let { data } = await axios.post("/api/admin/login", { email, password }, { withCredentials: true })
            if (data.success) {
                console.log(data.message)
                nav("/dashboard")
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error?.response?.message)
        }
    }
    return (
        <div>
            <form onSubmit={submitHandler} className="flex flex-col gap-5">
                <div className='flex flex-col'>
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Password</label>
                    <input type="text" placeholder='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

