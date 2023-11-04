import './index.css';
import React from 'react';
import ReactDOM from "react-dom/client"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import { ThemeProvider } from "@material-tailwind/react";

import AllHostelsCard from './Components/Hostels/AllHostelsCard';
import Home from './Components/Home'
import HostelPage from './Components/Hostels/HostelPage';
import FlatPage from './Components/Flats/FlatPage';
import HomePage from './Components/HomePage'
import AllFlatsCard from './Components/Flats/AllFlatsCard';
import Login from './Components/Login'
import Signup from './Components/Signup'
import AI from './Components/AI'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Home />}>
    <Route index element={<HomePage />} />
    <Route path="/hostels" element={<AllHostelsCard />} />
    <Route path="/hostels/:id" element={<HostelPage />} />
    <Route path="/flats" element={<AllFlatsCard />} />
    <Route path="/flats/:id" element={<FlatPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/ai" element={<AI />} />
  </Route>
))

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
