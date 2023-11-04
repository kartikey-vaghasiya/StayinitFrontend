import React, { useState } from 'react';
import { AuthContextJSX, useAuth } from './utils/AuthContexJSX'
import { useParams, Link, useNavigate } from "react-router-dom";

const inputStyleClass =
    'py-2 px-4 w-full focus:outline-none placeholder:text-[#073937] hover:bg-colorY2H focus:placeholder-[#FFFBF2] focus:bg-[#073937] focus:text-[#D8D4CD] bg-colorY2 rounded-[3rem] border border-[#D8D4CD]';

const AI = () => {

    const navigate = useNavigate()
    const { loginData } = useAuth()

    function roundToNearestThousand(number) {
        return Math.round(number / 1000) * 1000;
    }

    const [prediction, setPrediction] = React.useState()



    const [formData, setFormData] = useState({
        property_sqft: 1285,
        property_bhk: 12,
        property_city: 'ahmedabad',
        property_locality: 'bopal',
        is_furnished: 'furnished',
        property_project: 'applewoods',
        num_of_baths: 2,
        bachelors_or_family: 'bachelors/family',
        floornumber: 6,
        totalfloor: 14,
        property_pricenan: 0,
        property_bhknan: 0,
        property_sqftnan: 0,
        num_of_bathsnan: 0,
        floornumbernan: 0,
        totalfloornan: 0
    });

    async function fetchPrediction() {


        const p_proj = formData.property_project.toLowerCase().replace(" ", "_")
        const p_city = formData.property_city.toLowerCase()
        const p_loc = formData.property_locality.toLowerCase()
        const p_isfun = formData.is_furnished.toLowerCase()


        if (loginData.isLoggedIn) {
            const response = await fetch('http://localhost:8000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    property_sqft: formData.property_sqft,
                    property_bhk: formData.property_bhk,
                    property_city: p_city,
                    property_locality: p_loc,
                    is_furnished: p_isfun,
                    property_project: p_proj,
                    num_of_baths: formData.num_of_baths,
                    bachelors_or_family: "bachelors",
                    floornumber: formData.floornumber,
                    totalfloor: formData.totalfloor || formData.atWhichFloor,
                    property_pricenan: 0,
                    property_bhknan: 0,
                    property_sqftnan: 0,
                    num_of_bathsnan: 0,
                    floornumbernan: 0,
                    totalfloornan: 0
                }),
            });

            const data = await response.json()


            setPrediction(data.prediction)
        }

        else {
            navigate("/login")
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    return (
        <div className="md:px-[10rem] mt-6 sm-down: px-12 mx-auto">
            <form onSubmit={handleSubmit} className=''>
                <div className="mb-4 ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property_sqft">
                        Property Sqft
                    </label>
                    <input
                        className={inputStyleClass}
                        type="number"
                        name="property_sqft"
                        value={formData.property_sqft}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property_bhk">
                        Property BHK
                    </label>
                    <input
                        className={inputStyleClass}
                        type="number"
                        name="property_bhk"
                        value={formData.property_bhk}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property_city">
                        Property City
                    </label>
                    <input
                        className={inputStyleClass}
                        type="text"
                        name="property_city"
                        value={formData.property_city}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property_locality">
                        Property Locality
                    </label>
                    <input
                        className={inputStyleClass}
                        type="text"
                        name="property_locality"
                        value={formData.property_locality}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="is_furnished">
                        Is Furnished
                    </label>
                    <select
                        className={inputStyleClass}
                        name="is_furnished"
                        value={formData.is_furnished}
                        onChange={handleChange}
                        required
                    >
                        <option value="furnished">Furnished</option>
                        <option value="unfurnished">Not Furnished</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property_project">
                        Property Project
                    </label>
                    <input
                        className={inputStyleClass}
                        type="text"
                        name="property_project"
                        value={formData.property_project}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="num_of_baths">
                        Number of Baths
                    </label>
                    <input
                        className={inputStyleClass}
                        type="number"
                        name="num_of_baths"
                        value={formData.num_of_baths}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bachelors_or_family">
                        Suitable for
                    </label>
                    <select
                        className={inputStyleClass}
                        name="bachelors_or_family"
                        value={formData.bachelors_or_family}
                        onChange={handleChange}
                        required
                    >
                        <option value="bachelors/family">Bachelors/Family</option>
                        <option value="family">Family</option>
                        <option value="bachelors">Bachelors</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="floornumber">
                        Floor Number
                    </label>
                    <input
                        className={inputStyleClass}
                        type="number"
                        name="floornumber"
                        value={formData.floornumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalfloor">
                        Total Floor
                    </label>
                    <input
                        className={inputStyleClass}
                        type="number"
                        name="totalfloor"
                        value={formData.totalfloor}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <button
                        onClick={fetchPrediction}
                        className="bg-[#073937] mb-6 cursor-pointer rounded-[2rem] text-white py-2 px-4 focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Let's see prediction
                    </button>

                </div>
            </form >
            <div className='mb-6 '>
                {prediction ? (
                    <div className='bg-[#78e7ab] mb-6 rounded-[2rem] text-black py-2 px-4 focus:outline-none focus:shadow-outline'>
                        {`Price Should be between ${roundToNearestThousand(prediction - (prediction * 0.07))} - ${roundToNearestThousand(prediction + (prediction * 0.07))} Rupees`}
                    </div>
                ) : (
                    <div className='text-green-500 text-text-xs'></div>
                )}
            </div>
        </div >
    );
};

export default AI;
