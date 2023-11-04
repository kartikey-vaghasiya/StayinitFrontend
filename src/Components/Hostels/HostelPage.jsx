import React from "react"
import Pricing from "./Pricing";
import { useParams, Link } from "react-router-dom";
import AminitesText from "./AminitiesText";
import ImageCards from "../ImageCards";

export default function HostelInfo() {

    const [hostel, setHostel] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(true)
    const { id } = useParams();

    // To Get a Particular Hostel 
    React.useEffect(() => {

        async function fetchHostel() {
            await fetch(`http://localhost:5000/api/v1/hostel/${id}`)
                .then((response) => response.json())
                .then((result) => {
                    setHostel(result.data);
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }

        fetchHostel();

    }, [])

    // Getting All Attributes from Hostel
    const {
        hostel_name, pricingAndSharing, imageUrlArray, locality, city, forWhichGender, description, aminities, contactNum, contactMail, address, nearestLandmarks, locality_url
    } = hostel


    let nearestLandmarksDiv = []
    if (nearestLandmarks) {
        nearestLandmarksDiv = nearestLandmarks.map((x) => {

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

    // Creating Aminities Div
    const aminitesArr = []

    if (Object(aminities).acFacility === true) {
        aminitesArr.push(<AminitesText url={"ac.png"} name={"Air Conditioner"} />)
    }
    if (Object(aminities).liftFacility === true) {
        aminitesArr.push(<AminitesText url={"lift.png"} name={"Lift Avilable"} />)
    }
    if (Object(aminities).wifiFacility === true) {
        aminitesArr.push(<AminitesText url={"wifi.png"} name={"Free Wifi"} />)
    }
    if (Object(aminities).gymFacility === true) {
        aminitesArr.push(<AminitesText url={"gym.png"} name={"Gym Facility"} />)
    }
    if (Object(aminities).freeLaundry === true) {
        aminitesArr.push(<AminitesText url={"laundry.png"} name={"Free Laundry"} />)
    }
    if (Object(aminities).cctv === true) {
        aminitesArr.push(<AminitesText url={"cctv.png"} name={"CCTV"} />)
    }
    if (Object(aminities).cleaning === true) {
        aminitesArr.push(<AminitesText url={"cleaning.png"} name={"Room Cleaning"} />)
    }
    if (Object(aminities).securityGuard === true) {
        aminitesArr.push(<AminitesText url={"security.png"} name={"Security Guard"} />)
    }
    if (Object(aminities).filterWater === true) {
        aminitesArr.push(<AminitesText url={"water.png"} name={"Water Filter"} />)
    }


    // Creating Pricing And Sharing Div
    const pricingAndSharingDivArray = Array.isArray(pricingAndSharing) ?
        pricingAndSharing.map((x) => {
            return (
                <Pricing price={x.price} sharing={x.sharing} />
            )
        }) : []

    // Creating Image Url Div
    const imageUrlArrayDiv = imageUrlArray && imageUrlArray.length > 0 ? imageUrlArray.map((image) => {
        return (
            <div className="w-[300px]">
                <img src={image.url} alt="image" className="" />
            </div>
        )
    }) : []


    if (!isLoading) {
        return (
            <div className="lg:p-8 gap-5 flex flex-col items-center" >


                <ImageCards imageUrlArray={imageUrlArray} />

                <div className="w-full md-down: justify-items-center px-[2rem] grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

                    <div className="bg-colorY cursor-pointer rounded-[1rem] border shadow-sm border-[#F3EADC] p-6 flex flex-col items-start w-full h-auto min-w-[300px] max-w-[600px] relative gap-4 overflow-x-hidden">
                        <div className="flex flex-row flex-wrap gap-2 my-3 py-[0.5rem] px-10 w-full" >
                            {aminitesArr}
                        </div>
                    </div >

                    {/* Pricing */}
                    <div className=" cursor-pointer hover:bg-colorY2H rounded-[1rem] border shadow-sm border-[#F3EADC] p-6 flex flex-col items-start w-full h-auto min-w-[300px] max-w-[600px] relative">
                        <div className=" text-teal-950 text-xs leading-3 tracking-wide self-start whitespace-nowrap">
                            <h3>
                                <a href="https://www.sonder.com/en-gb/destinations/london/LON-LEIN23-one/c33110" rel="noopener noreferrer" target="_blank">
                                    ROOM BHK &amp; RENT
                                </a>
                            </h3>
                        </div>
                        <div className="flex-col items-start self-stretch flex w-full justify-between gap-5 mt-4">
                            {pricingAndSharingDivArray}
                        </div>
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

                </div >
            </div>
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
