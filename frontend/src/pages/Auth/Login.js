
import React from 'react'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo_login from '../../images/Boost your inmune system-bro.svg'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async (event) => {
        event.preventDefault();
        let item = { email, password }

        const res = await fetch('http://localhost:9000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        const data = await res.json();

        console.log(data);
    //    tester si role admin
        if (data.role === "admin") {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            window.location.href = "/";
        }
        else {
            alert("You are not an admin");
        }
    }
    return (
        <div>
            <div class="flex h-screen w-full items-center justify-center  bg-[#8DBFA9] bg-cover bg-no-repeat"  >
                <div class="rounded-xl bg-white bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                    <div class="text-white">
                        <div class="mb-8 flex flex-col items-center">
                            <img src={Logo_login} width="150" alt="" srcset="" />
                            <h1 class="mb-2 text-2xl">Healthy body</h1>
                            <span class="text-black">Enter Login Details</span>
                        </div>
                        <form onSubmit={login} >
                            <div class="mb-4 text-lg">
                                <input class="rounded-3xl border-none bg-[#8DBFA9] bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                                    type="text" name="name" placeholder="id@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div class="mb-4 text-lg">
                                <input class="rounded-3xl border-none bg-[#8DBFA9]  bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                                    type="Password" name="name" placeholder="*********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div class="mt-8 flex justify-center text-lg text-black">
                                <button type="submit" class="rounded-3xl bg-[#4A7B59]  bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-[#8DBFA9]"
                                >Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login