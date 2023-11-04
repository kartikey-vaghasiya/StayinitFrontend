import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './utils/AuthContexJSX';

export default function Login() {

    const [loginCredentials, setLoginCredentials] = React.useState({})
    const navigate = useNavigate();
    const { loginContextFunction } = useAuth()
    const [errMessage, setErrMessage] = React.useState("")

    function handleInput(event) {
        const { name, value } = event.target;
        setLoginCredentials((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    async function login(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:5000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usernameOrEmail: loginCredentials.usernameOrEmail,
                password: loginCredentials.password,
            }),
        });

        const data = await response.json()
        const token = data.token

        // Setting token in localstorage
        localStorage.setItem('token', token);

        if (data.success === true) {
            loginContextFunction(data);
            navigate('/');
        } else {
            setErrMessage(data.message)
        }

    }

    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-1">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl leading-tight text-black sm:text-4xl">Sign in</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link
                                to="/signup"
                                title=""
                                className="font-semibold text-black transition-all duration-200 hover:underline"
                            >
                                Create a free account
                            </Link>
                        </p>
                        {/* Login Form */}
                        <form onSubmit={login} method="POST" className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                            type="email"
                                            placeholder="Email"
                                            name="usernameOrEmail"
                                            onChange={handleInput}
                                            value={loginCredentials.usernameOrEmail}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                        <a
                                            href="#"
                                            title=""
                                            className="text-sm font-semibold text-black hover:underline"
                                            name="password"
                                        >
                                            {' '}
                                            Forgot password?{' '}
                                        </a>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            value={loginCredentials.password}
                                            onChange={handleInput}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" class="w-full">
                                        <div className="bg-colorG text-[#FFFBF2] px-4 py-4 rounded-[3rem] md-down: my-5">
                                            <div className="text-base leading-6 self-center whitespace-nowrap">
                                                Login
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div>
                                    <h1 className='text-red-600'>{errMessage}</h1>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
