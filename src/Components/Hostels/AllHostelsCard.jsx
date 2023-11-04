import React from "react"
import SingleHostelCard from "./SingleHostelCard"
import HostelFilters from "./HostelFilters"

export default function HostelListing() {

    const [hostels, setHostels] = React.useState([])
    const [filters, setFilters] = React.useState({})

    console.log(hostels)
    // Fetching Hostels from DB
    React.useEffect(() => {

        async function fetchHostelData() {
            try {
                const response = await fetch('http://localhost:5000/api/v1/hostel/');

                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }

                const result = await response.json();
                setHostels(result.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchHostelData()

    }, [])


    // Getting Hostel Cards 
    const filteredHostels = hostels.filter((singleHostel) => {

        const {
            hostel_name, pricingAndSharing, locality, city, forWhichGender, aminities
        } = singleHostel

        let minPrice = Infinity;
        let maxPrice = 0;

        minPrice = pricingAndSharing.reduce((singlePrice) => {
            return (Math.min(minPrice, singlePrice.price))
        })

        maxPrice = pricingAndSharing.reduce((singlePrice) => {
            return (Math.max(maxPrice, singlePrice.price))
        })

        const exp =
            (filters.ac ? filters.ac === aminities.acFacility : true) &&
            (filters.wifi ? filters.wifi === aminities.wifiFacility : true) &&
            (filters.gym ? filters.gym === aminities.gymFacility : true) &&
            (filters.laundry ? filters.laundry === aminities.freeLaundry : true) &&
            (filters.city ? city.toLowerCase().includes(filters.city.toLowerCase()) : true) &&
            (filters.locality ? locality.toLowerCase().includes(filters.locality.toLowerCase()) : true) &&
            (filters.name ? hostel_name.toLowerCase().includes(filters.name.toLowerCase()) : true) &&
            (((filters.BoysOrGirls !== "None" && filters.BoysOrGirls)) ? forWhichGender === filters.BoysOrGirls : true) &&
            (filters.minPrice ? filters.minPrice <= maxPrice : true) &&
            (filters.maxPrice ? filters.maxPrice >= minPrice : true)

        return exp;

    })



    const hostelCards = filteredHostels.map((hostel) => {

        return (
            <SingleHostelCard
                user="localstorage mathi id levani"
                id={hostel._id}
                name={hostel.hostel_name}
                pricingAndSharing={hostel.pricingAndSharing}
                locality={hostel.locality}
                city={hostel.city}
                price={hostel.property_price}
                sqft={hostel.property_sqft}
                imageUrlArray={hostel.imageUrlArray}
            />
        )
    })
    // List of Hostel Cards
    if (hostels.length > 0) {
        return (
            <div className="overflow-x-hidden">
                <HostelFilters setFilters={setFilters} filters={filters} />
                {hostelCards}
            </div>
        )
    } else {
        return (
            <div className="flex flex-col h-[100vh] w-[100vw] justify-center items-center">
                <h1>Loading...</h1>
            </div>
        )
    }
}