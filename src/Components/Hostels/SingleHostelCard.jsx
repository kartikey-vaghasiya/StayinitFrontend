import Pricing from "./Pricing"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { getFirstImage } from "../utils/utilityFunctions";

export default function HostelCard(props) {


    const navigate = useNavigate()

    // pricing and sharing ui component
    const pricingAndSharingDivArray = Array.isArray(props.pricingAndSharing) ?
        props.pricingAndSharing.map((x) => {
            return (
                <Pricing price={x.price} sharing={x.sharing} />
            )
        }) : []


    return (

        <section className="flex flex-col items-center px-[2rem] md:px-[6rem] relative ">

            <div className="flex flex-col w-full lg:items-start relative">

                {/* Title */}
                <div className="flex flex-row gap-1 justify-center leading-7 lg:items-center py-4">
                    <h1 className="text-l">
                        <a href="" target="_blank" rel="noopener noreferrer">
                            {props.name}  |
                        </a>
                    </h1>
                    <p className="text-xs flex items-center">
                        <a href="" target="_blank" rel="noopener noreferrer">
                            {props.locality} , {props.city}
                        </a>
                    </p>
                </div>

                {/* Photo And Pricing Big Div */}
                <div className="w-full flex flex-col items-center lg:items-start lg:flex-row gap-5 ">

                    {/* Flat Image */}
                    <div className="flex items-start justify-start flex-col w-auto h-auto min-w-[200px] max-w-[400px]">
                        <img loading="lazy" src={getFirstImage(props)} className="rounded-br-[3rem] object-cover lg:w-[500px] w-auto h-auto" />
                    </div>


                    {/* Pricing */}
                    <div className="flex items-center justify-start flex-col w-[100%] lg:w-[60%] ">
                        <div className="flex justify-center flex-col w-full h-auto min-w-[200px] max-w-[500px]">
                            <div className="text-teal-950 text-xs leading-3 tracking-wide self-start whitespace-nowrap ">
                                <h3>
                                    <a href="https://www.sonder.com/en-gb/destinations/london/LON-LEIN23-one/c33110" rel="noopener noreferrer" target="_blank">
                                        ROOM SHARING &amp; YEARLY FEES
                                    </a>
                                </h3>
                            </div>
                            {pricingAndSharingDivArray}
                            <Link to={`./${props.id}`} rel="noopener noreferrer">
                                <div className="lg:absolute bottom-5 right-5 bg-colorG text-[#FFFBF2] px-4 py-4 rounded-[3rem] md-down: my-5">
                                    <div className="text-base leading-6 self-center whitespace-nowrap">
                                        See what’s available
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}


// const [isWishListed, setIsWishlisted] = React.useState();
// const [wishlistID, setWishlistID] = React.useState();
// Hostel Card
// return (
//     <div className="flex flex-col border border-black px-10">
//         <Link to={`./${props.id}`}>
//             <div>
//                 <span className="pr-10">{props.name}</span>
//                 <span className="pr-10">{props.locality}</span>
//                 <a href="https://www.google.com/maps/@21.7448006,70.4431909,15z?entry=ttu">M</a>
//             </div>
//         </Link>

//         <div className="flex flex-row justify-between">
//             <div>
//                 <img className="w-[350px] object-fit" src={imageUrl} alt="flat" />
//             </div>
//             <div className="flex flex-col justify-center">
//                 <button onClick={addToWishlist}>{isWishListed ? "Removed to Wishlist" : "Add to wishlist"} </button>
//                 <div>
//                     <h3>Room Type & Rent</h3>
//                     {pricingAndSharingDivArray}
//                 </div>
//                 <Link to={`./${props.id}`}>See Whats Avilable</Link>
//             </div>
//         </div>
//     </div>
// )



    // // function: for adding to wishlist
    // const addToWishlist = async function () {

    //     // If Not Logged In Then Redirect to login page 
    //     if (!loginData.isLoggedIn) {
    //         navigate('/login')
    //     }

    //     // If Not in Wishlist....
    //     if (!isWishListed) {
    //         const wishlistData = {
    //             "likedProperty": props.id,
    //             "user": loginData.user
    //         }

    //         const token = localStorage.getItem('token')

    //         try {

    //             const options = {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'authorization': `Bearer ${token}`
    //                 },
    //                 body: JSON.stringify(wishlistData),
    //             };

    //             fetch('http://localhost:5000/api/v1/wishlist/', options)
    //                 .then(response => {
    //                     if (!response.ok) {
    //                         throw new Error('Network response was not ok');
    //                     }
    //                     return response.json();
    //                 })
    //                 .then(data => {
    //                     console.log(data);
    //                     setIsWishlisted(true)
    //                     setWishlistID(data.data._id)
    //                 })
    //                 .catch(error => {
    //                     console.error('Error:', error);
    //                 });

    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }

    //     // If it is already in wishlist...
    //     removeToWishlist()

    // }

    // // function: for removing to wishlist
    // const removeToWishlist = async function (id) {
    //     const token = localStorage.getItem('token')
    //     // deleting by fetch request
    //     const options = {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': `Bearer ${token}`
    //         },
    //     };


    //     fetch(`http://localhost:5000/api/v1/wishlist/${wishlistID}`, options)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log(data);
    //             // if success then isWishlisted == false
    //             setIsWishlisted(false)
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });

    // }