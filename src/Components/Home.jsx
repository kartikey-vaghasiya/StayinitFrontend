import React, { createContext, useContext } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { AuthContextJSX } from "./utils/AuthContexJSX"
import Footer from "./Footer"


export default function Home() {
    return (
        <AuthContextJSX>
            <div className="h-[100vh] w-[100vw] bg-colorY overflow-x-hidden">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </AuthContextJSX>
    )
}