import React from "react"
import { useParams, Link, useNavigate } from "react-router-dom";
import FlatInfoCard from "./FlatInfoCard";
import ImageCards from "../ImageCards";
import { AuthContextJSX, useAuth } from '../utils/AuthContexJSX'

export default function FlatInfo() {

    function roundToNearestThousand(number) {
        return Math.round(number / 1000) * 1000;
    }


    const navigate = useNavigate()
    const { loginData } = useAuth()
    const [flat, setFlat] = React.useState({})
    const [isLoaading, setIsLoading] = React.useState(true)
    const { id } = useParams();
    const [prediction, setPrediction] = React.useState()

    async function fetchPrediction(flat) {


        const p_proj = flat.property_name.toLowerCase().replace(" ", "_")
        const p_city = flat.property_city.toLowerCase()
        const p_loc = flat.property_locality.toLowerCase()
        const p_isfun = flat.furnitureType.toLowerCase()

        const d = JSON.stringify({
            property_sqft: flat.property_sqft,
            property_bhk: flat.property_bhk,
            property_city: p_city,
            property_locality: p_loc,
            is_furnished: p_isfun,
            property_project: p_proj,
            num_of_baths: flat.num_of_baths,
            bachelors_or_family: "bachelors",
            floornumber: flat.atWhichFloor,
            totalfloor: flat.totalfloor || flat.atWhichFloor,
            property_pricenan: 0,
            property_bhknan: 0,
            property_sqftnan: 0,
            num_of_bathsnan: 0,
            floornumbernan: 0,
            totalfloornan: 0
        })


        console.log(d)

        if (loginData.isLoggedIn) {
            const response = await fetch('http://localhost:8000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    property_sqft: flat.property_sqft,
                    property_bhk: flat.property_bhk,
                    property_city: p_city,
                    property_locality: p_loc,
                    is_furnished: p_isfun,
                    property_project: p_proj,
                    num_of_baths: flat.num_of_baths,
                    bachelors_or_family: "bachelors",
                    floornumber: flat.atWhichFloor,
                    totalfloor: flat.totalfloor || flat.atWhichFloor,
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

    // To Get a Particular Hostel 
    React.useEffect(() => {

        async function fetchHostel() {
            await fetch(`http://localhost:5000/api/v1/flat/${id}`)
                .then((response) => response.json())
                .then((result) => {
                    setFlat(result.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }

        fetchHostel();

    }, [])

    // Getting All Attributes from Hostel
    const {
        property_name, property_price, property_bhk, property_sqft, property_devloper, property_locality, property_city, atWhichFloor, totalFloor, nearestLandmark, description, num_of_baths, num_of_balconies, furnitureType, imageUrlArray,
        address, contactMail, contactNum, locality_url, _id
    } = flat


    // Creating Nearest Landmark Div
    let nearestLandmarksDiv = []
    if (nearestLandmark) {
        nearestLandmarksDiv = nearestLandmark.map((x) => {

            const km = x.split("km from")[0]
            const location = x.split("km from")[1]
            return (
                <div className="items-start self-stretch flex w-full justify-between gap-5 mt-4">
                    <div className="text-teal-950 text-l leading-5 tracking-normal self-stretch">
                        <span className="text-xs">from </span>
                        <span className="font-bold">{location}</span>
                    </div>
                    <div className="text-teal-950 text-l font-bold leading-5 tracking-normal self-stretch whitespace-nowrap">
                        {km} km
                    </div>
                </div>
            )
        })
    }

    // Creating Image Url Div
    const imageUrlArrayDiv = imageUrlArray && imageUrlArray.length > 0 ? imageUrlArray.map((image) => {
        return (
            <div className="w-[500px]">
                <img src={image.url} alt="image" className="" />
            </div>
        )
    }) : []

    if (!isLoaading) {
        return (
            <div className="mt-4 gap-16 flex flex-col">

                <ImageCards imageUrlArray={imageUrlArray} />
                <div className="md-down: justify-items-center p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">



                    {/* Flat Information */}
                    <div className=" cursor-pointer hover:bg-colorY2H rounded-[1rem] border shadow-sm border-[#F3EADC] p-6 flex items-center flex-col w-full h-auto min-w-[300px] max-w-[600px]">
                        <div className="text-teal-950 text-xs leading-3 tracking-wide self-start whitespace-nowrap">
                            <h3>
                                <a href="" rel="noopener noreferrer" target="_blank">
                                    Flat Information
                                </a>
                            </h3>
                        </div>
                        <FlatInfoCard property={'Sqft'} value={property_sqft} />
                        <FlatInfoCard property={'Devloper'} value={property_devloper} />
                        <FlatInfoCard property={'Floor'} value={atWhichFloor} />
                        <FlatInfoCard property={'Balconies'} value={num_of_balconies} />
                        <FlatInfoCard property={'Furniture Type'} value={furnitureType} />
                        <FlatInfoCard property={'Num of Baths'} value={num_of_baths} />
                    </div>

                    {/* Description */}
                    <div className="cursor-pointer hover:bg-colorY2H p-6  flex rounded-[1rem] border shadow-sm border-[#F3EADC] flex-col w-full h-auto min-w-[300px] max-w-[600px]">
                        <div className="text-teal-950 text-xs leading-3 tracking-wide self-start whitespace-nowrap">
                            <h3>
                                <a href="" target="_blank">
                                    Description
                                </a>
                            </h3>
                        </div>
                        <p className="py-2 my-2">{description}</p>
                    </div>

                    {/* Pricing */}
                    <div className=" cursor-pointer hover:bg-colorY2H rounded-[1rem] border shadow-sm border-[#F3EADC] p-6 flex flex-col items-start w-full h-auto min-w-[300px] max-w-[600px] relative">
                        <div className="text-teal-950 text-xs leading-3 tracking-wide self-start whitespace-nowrap">
                            <h3>
                                <a href="https://www.sonder.com/en-gb/destinations/london/LON-LEIN23-one/c33110" rel="noopener noreferrer" target="_blank">
                                    ROOM BHK &amp; RENT
                                </a>
                            </h3>
                        </div>
                        <div className="items-start self-stretch flex w-full justify-between gap-5 mt-4">
                            <div className="text-teal-950 text-l leading-5 tracking-normal self-stretch">{property_bhk} BHK Room</div>
                            <div className="text-teal-950 text-l font-bold leading-5 tracking-normal self-stretch whitespace-nowrap">
                                <span className="">from </span>
                                <span className="font-bold">&#8377; {property_price}</span>
                            </div>
                        </div>
                        {
                            prediction ?
                                (
                                    <div className='mt-6 bg-[#78e7ab] mb-6 rounded-[2rem] text-black py-2 px-4 focus:outline-none focus:shadow-outline'>
                                        {`Price Should be between ${roundToNearestThousand(prediction - (prediction * 0.07))} - ${roundToNearestThousand(prediction + (prediction * 0.07))} Rupees`}
                                    </div>
                                ) : (
                                    <button onClick={() => fetchPrediction(flat)} className="">
                                        <div className=" text-[#FFFBF2] bg-colorG px-3 py-3 md-down: my-5 rounded-[1rem]">
                                            <div className="text-base text-center leading-6 self-center whitespace-nowrap">
                                                See Expected Price
                                            </div>
                                        </div>
                                    </button>
                                )}
                    </div>

                    {/* Nearest Landmarks */}
                    <div className=" cursor-pointer hover:bg-colorY2H rounded-[1rem] border shadow-sm border-[#F3EADC] p-6 flex items-center flex-col w-full h-auto min-w-[300px] max-w-[600px]">
                        <div className="text-teal-950 text-xs leading-3 tracking-wide self-start whitespace-nowrap">
                            <h3>
                                <a href="" rel="noopener noreferrer" target="_blank">
                                    Nearest Landmarks
                                </a>
                            </h3>
                        </div>
                        {nearestLandmarksDiv}
                    </div>

                    {/* Contact Details */}
                    <div className=" cursor-pointer hover:bg-colorY2H rounded-[1rem] border shadow-sm border-[#F3EADC] p-6 flex items-center flex-col w-full h-auto min-w-[300px] max-w-[600px]">
                        <div className="text-teal-950 text-xs leading-3 tracking-wide self-start whitespace-nowrap">
                            <h3>
                                <a href="https://www.sonder.com/en-gb/destinations/london/LON-LEIN23-one/c33110" rel="noopener noreferrer" target="_blank">
                                    Contact Details
                                </a>
                            </h3>
                        </div>
                        <div className="items-start self-stretch flex w-full justify-between gap-5 mt-4">
                            <div className="text-teal-950 text-l leading-5 tracking-normal self-stretch">Contact Number</div>
                            <div className="text-teal-950 text-l font-bold leading-5 tracking-normal self-stretch whitespace-nowrap">
                                <span className="font-bold">{contactNum}</span>
                            </div>
                        </div>
                        <div className="items-start self-stretch flex w-full justify-between gap-5 mt-4">
                            <div className="text-teal-950 text-l leading-5 tracking-normal self-stretch">Mail</div>
                            <div className="text-teal-950 text-l font-bold leading-5 tracking-normal self-stretch whitespace-nowrap">
                                <span className="font-bold">{contactMail}</span>
                            </div>
                        </div>
                        <div className="items-start self-stretch flex w-full justify-between gap-5 mt-4">
                            <div className="text-teal-950 text-l leading-5 tracking-normal self-stretch">Address</div>
                            <div className="text-teal-950 text-l font-bold leading-5 tracking-normal self-stretch whitespace-nowrap">
                                <span className="font-bold">{address}</span>
                            </div>
                        </div>
                        <div className="items-start self-stretch flex w-full justify-between gap-5 mt-4">
                            <div className="text-teal-950 text-l leading-5 tracking-normal self-stretch">Location URL</div>
                            <div className="text-teal-950 text-l font-bold leading-5 tracking-normal self-stretch whitespace-nowrap">
                                <a href={locality_url} className="font-bold">View On GoogleMap</a>
                            </div>
                        </div>

                    </div>

                </div>

            </div >
        )
    } else {
        return (
            <div className="flex flex-col h-[100%] justify-center items-center">
                <img src="/gifs/Pacman.gif" alt="" width="25px" />
                <h1>Loading...</h1>
            </div>
        )
    }
}
