import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {

    const [userForm, setUserForm] = React.useState({})
    const [errMessage, setErrMessage] = React.useState("")

    const navigate = useNavigate();

    function handleInput(event) {
        const { name, value } = event.target;
        setUserForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }



    console.log(userForm)
    async function signup(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: userForm.firstname,
                lastname: userForm.lastname,
                username: userForm.username,
                password: userForm.password,
                confirmPassword: userForm.confirmPassword,
                email: userForm.email,
                phoneNumber: userForm.phoneNumber
            }),
        });

        const data = await response.json()
        if (data.success === true) {
            navigate('/login');
        } else {
            setErrMessage(data.message)
        }

    }

    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-1">
                <div className="flex items-center justify-center px-4 py-5 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
                    {/*  */}
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        {/*  */}
                        <h2 className="text-3xl leading-tight text-black sm:text-4xl">Sign up</h2>
                        <p className="mt-2 text-base text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                title=""
                                className="font-medium text-black transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>

                        {/* Signup form */}
                        <form onSubmit={signup} method="POST" className="mt-6">
                            <div className="space-y-5">
                                <div className='flex flex-row gap-3'>
                                    {/* First Name */}
                                    <div>
                                        <div className="mt-2">
                                            <input
                                                className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                                type="text"
                                                placeholder="Full Name"
                                                id="name"
                                                value={userForm.firstname}
                                                onChange={handleInput}
                                                name="firstname"
                                            ></input>
                                        </div>
                                    </div>
                                    {/* Last Name */}
                                    <div>
                                        <div className="mt-2">
                                            <input
                                                className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                                type="text"
                                                placeholder="Last Name"
                                                id="name"
                                                value={userForm.lastname}
                                                onChange={handleInput}
                                                name="lastname"
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                {/* Email */}
                                <div>
                                    <div className="mt-2">
                                        <input
                                            className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                            value={userForm.email}
                                            onChange={handleInput}
                                            name="email"
                                        ></input>
                                    </div>
                                </div>
                                {/* Password */}
                                <div className='flex flex-row gap-3 justify-center items-center'>
                                    <div>
                                        <div className="flex items-center justify-between">
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                                type="password"
                                                placeholder="Password"
                                                id="password"
                                                value={userForm.password}
                                                onChange={handleInput}
                                                name="password"
                                            ></input>
                                        </div>
                                    </div>
                                    {/* Confirm Password */}
                                    <div>
                                        <div className="mt-2">
                                            <input
                                                className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                                type="password"
                                                placeholder="Confirm Password"
                                                id="confirmPassword"
                                                value={userForm.confirmPassword}
                                                onChange={handleInput}
                                                name="confirmPassword"
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                {/* Username */}
                                <div>
                                    <div className="mt-2 flex items-center justify-between">
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                            type="text"
                                            placeholder="Username"
                                            id="username"
                                            value={userForm.username}
                                            onChange={handleInput}
                                            name="username"
                                        ></input>
                                    </div>
                                </div>
                                {/* Phonenumber */}
                                <div>
                                    <div className="mt-2 flex items-center justify-between">
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex w-full rounded-[3rem] border-2 border-[#d5bf9f] hover:bg-colorY2H px-3 py-3 text-sm placeholder:text-[#073937] focus:outline-none"
                                            type="tel"
                                            placeholder="Phone number"
                                            id="phoneNum"
                                            value={userForm.phoneNumber}
                                            onChange={handleInput}
                                            name="phoneNumber"
                                        ></input>
                                    </div>
                                </div>
                                {/* Create an Account */}
                                <div>
                                    <button type="submit" class="w-full">
                                        <div className="bg-colorG text-[#FFFBF2] px-4 py-4 rounded-[3rem] md-down: my-5">
                                            <div className="text-base leading-6 self-center whitespace-nowrap">
                                                Login
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div>
                            <h1 className='text-red-600'>{errMessage}</h1>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}
