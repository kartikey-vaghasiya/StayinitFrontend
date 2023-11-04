import React from "react"
import { Link } from "react-router-dom"
import { AuthContextJSX, useAuth } from './utils/AuthContexJSX'



export default function Home() {

    const inputStyleClass = "py-2 px-4 sm-down:w-full md:w-[10rem] focus:outline-none placeholder:text-[#073937] hover:bg-colorY2H focus:placeholder-[#FFFBF2] focus:bg-[#073937] focus:text-[#D8D4CD] bg-colorY2 rounded-[3rem] border border-[#D8D4CD]"
    const { loginData } = useAuth()
    return (
        <div className="bg-colorY text-[#073937] h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-8">Welcome to Stayinit</h1>
                <p className="text-xl mb-6">Your Easy Accommodation Solution</p>
                <p className="text-lg mb-8">Find the perfect place to stay for bachelors.</p>
                <div className="flex justify-center">
                    <Link to="/flats" className="text-sm bg-white hover:bg-[#FCF5EB] px-6 py-3 rounded-full lg:text-lg font-semibold transition duration-300 mx-2">
                        Explore Flats
                    </Link>
                    <Link to="/hostels" className="text-sm bg-white hover:bg-[#F3EADC] px-6 py-3 rounded-full lg:text-lg font-semibold transition duration-300 mx-2">
                        Discover Hostels
                    </Link>
                    <Link to="/ai" className="text-sm bg-white hover:bg-[#F3EADC] px-6 py-3 rounded-full lg:text-lg font-semibold transition duration-300 mx-2">
                        Discover AI Based Price Feature
                    </Link>
                </div>
            </div>
        </div>
    );
};
