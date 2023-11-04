import React from "react"

export default function FlatFilters(props) {


    // state for bhk counter and function for increment and decrement bhk's value
    const [bhk, setBhk] = React.useState(0)
    function increamentBHK() {


        setBhk((prev) => {
            return prev + 1
        });

        props.setFilters((prev) => ({
            ...prev,
            "bhk": bhk + 1
        }))
    }
    function decrementBHK() {

        setBhk((prev) => {
            return prev - 1
        });

        props.setFilters((prev) => ({
            ...prev,
            "bhk": bhk - 1
        }))
    }

    // state for "show filters" and "hide filters"
    const [toggleFilter, setToggleFilter] = React.useState(false)
    function toggleFilterDiv() {
        setToggleFilter((prev) => { return !prev })
    }

    // function: for handling "change in value" of "filters"
    // function: for clearing all filters to default
    function handleFilters(event) {
        const { name, type, checked, value } = event.target
        props.setFilters((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }
    function clearAllFilters() {
        props.setFilters({
            "city": "",
            "name": "",
            "locality": "",
            "bhk": "",
            "FurnitureType": "None",
            "minPrice": "",
            "maxPrice": "",
            "minSqft": "",
            "maxSqft": "",
        })
    }

    // css for filters
    const inputStyleClass = "py-2 px-4 w-full md:w-[10rem] focus:outline-none placeholder:text-[#073937] hover:bg-colorY2H focus:placeholder-[#FFFBF2] focus:bg-[#073937] focus:text-[#D8D4CD] bg-colorY2 rounded-[3rem] border border-[#D8D4CD]"
    const inputStyleClassForFurniture = "py-2 px-4 w-[100%] md:w-[10rem] focus:outline-none placeholder:text-[#073937] bg-colorY2 rounded-[3rem] border border-[#D8D4CD]"

    // returing ui component
    const filterDiv = toggleFilter ?
        (

            <div className="flex flex-row justify-center items-center mb-2 px-[2rem] md:px-[6rem] ">
                <div className="flex sm:flex-row justify-center items-center flex-wrap gap-2 my-3 py-[0.5rem] w-full bg-colorY" >
                    <div className={inputStyleClass + "text-red-600 text-center"}>
                        <button onClick={toggleFilterDiv} className="cursor-pointer"> {toggleFilter ? "Hide Filters" : "Show Filters"} </button>
                    </div>
                    <button className={inputStyleClass + " text-red-600 sm-down:px-4"} onClick={clearAllFilters}>Clear</button>


                    <input type="text" name="city" id="city" className={inputStyleClass} placeholder="City" value={props.filters.city} onChange={handleFilters} />

                    <input type="text" name="name" id="name" placeholder="Flat Name" className={inputStyleClass} value={props.filters.name} onChange={handleFilters} />

                    <input type="text" name="locality" id="locality" placeholder="Locality" className={inputStyleClass} value={props.filters.locality} onChange={handleFilters} />

                    <div className={inputStyleClass + ' flex flex-row gap-4 justify-center items-center'}>
                        <div>BHK</div>
                        <button className="text-xl bold" onClick={decrementBHK}>-</button>
                        <div className="" value={props.filters.bhk} > {bhk || 0} </div>
                        < button className="text-xl bold" onClick={increamentBHK}>+</button>
                    </div>
                    <select className={inputStyleClassForFurniture + " cursor-pointer text-[#073937] bg-colorY2"} name="furnitureType" id="furniture" onChange={handleFilters} value={props.filters.FurnitureType}>
                        <option value="None">Select</option>
                        <option value="Furnished">Furnished</option>
                        <option value="Unfurnished">Unfurnished</option>
                        <option value="Semifurnished">SemiFurnished</option>
                    </select>

                    <input className={inputStyleClass} type="number" placeholder="Min Price" name="minPrice" id="minPrice" onChange={handleFilters} value={props.filters.minPrice} />
                    <input className={inputStyleClass} type="number" placeholder="Max Price" name="maxPrice" id="maxPrice" onChange={handleFilters} value={props.filters.maxPrice} />
                    <input className={inputStyleClass} type="number" placeholder="Min Sqft" name="minSqft" id="minSqft" onChange={handleFilters} value={props.filters.minSqft} />
                    <input className={inputStyleClass} type="number" placeholder="Max Sqft" name="maxSqft" id="maxSqft" onChange={handleFilters} value={props.filters.maxSqft} />
                </div >
            </div>
        )
        :
        (
            <div className="flex flex-row items-center gap-4 mb-3 px-[2rem] md:px-[6rem] ">

                <div className="" onClick={toggleFilterDiv}>
                    <button className={inputStyleClass}> {toggleFilter ? "Hide Filters" : "Show Filters"} </button>
                </div>

                <div>
                    <button className={inputStyleClass + "sm-down:w-[4rem]  text-red-600 my-3"} onClick={clearAllFilters}>Clear</button>
                </div>
            </div>

        )

    return filterDiv;
}