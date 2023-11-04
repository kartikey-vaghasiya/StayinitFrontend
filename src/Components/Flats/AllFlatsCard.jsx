import React from "react"
import SingleFlatCard from "./SingleFlatCard"
import FlatFilters from "./FlatFilters"

export default function AllFlatsCard() {

    const [flats, setFlats] = React.useState([])
    const [filters, setFilters] = React.useState({})

    // data fetching
    React.useEffect(() => {

        async function fetchFlatData() {
            try {
                const response = await fetch('http://localhost:5000/api/v1/flat/');

                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }

                const result = await response.json();
                setFlats(result.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchFlatData()

    }, [])

    // filtering flats
    const filteredFlats = flats.filter((singleFlat) => {

        const {
            property_name, property_price, property_bhk, property_sqft, property_devloper, property_locality, property_city, furnitureType
        } = singleFlat

        console.log(filters.bhk, property_bhk)
        const exp =
            (filters.city ? property_city.toLowerCase().includes(filters.city.toLowerCase()) : true) &&
            (filters.locality ? property_locality.toLowerCase().includes(filters.locality.toLowerCase()) : true) &&
            (filters.name ? property_name.toLowerCase().includes(filters.name.toLowerCase()) : true) &&
            (filters.devloper ? property_devloper.toLowerCase().includes(filters.devloper.toLowerCase()) : true) &&
            (filters.minPrice ? Number(filters.minPrice) <= Number(property_price) : true) &&
            (filters.maxPrice ? Number(filters.maxPrice) >= Number(property_price) : true) &&
            (filters.minSqft ? Number(filters.minSqft) <= Number(property_sqft) : true) &&
            (filters.maxSqft ? Number(filters.maxSqft) >= Number(property_sqft) : true) &&
            (filters.bhk ? Number(filters.bhk) === Number(property_bhk) : true) &&
            (filters.furnitureType ? filters.furnitureType === furnitureType : true)

        return exp;

    })


    // filterd flatcards
    const flatCards = filteredFlats.map((flat) => {
        return (
            <SingleFlatCard
                user="localstorage mathi id levani"
                id={flat._id}
                name={flat.property_name}
                price={flat.property_price}
                bhk={flat.property_bhk}
                sqft={flat.property_sqft}
                devloper={flats.property_devloper}
                locality={flat.property_locality}
                city={flat.property_city}
                locality_url={flat.locality_url}
                imageUrlArray={flat.imageUrlArray}
                furnitureType={flat.furnitureType}
            />
        )
    })

    // returning ui component or loading... component
    if (flats.length > 0) {
        return (
            <div className="">
                <FlatFilters setFilters={setFilters} filters={filters} />
                <div className="">
                    {flatCards}
                </div>
            </div>
        )
    } else {
        return (
            <div className="h-[100vh] w-[100vw] flex justify-center items-center">
                <h1>Loading...</h1>
            </div>
        )
    }
}