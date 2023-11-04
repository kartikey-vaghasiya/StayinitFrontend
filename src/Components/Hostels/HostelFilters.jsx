import React from "react"

export default function HostelFilters(props) {


    const [toggleFilter, setToggleFilter] = React.useState(false)
    const inputStyleClass = "py-2 px-4 w-full sm:w-[10rem] focus:outline-none placeholder:text-[#073937] hover:bg-colorY2H focus:placeholder-[#FFFBF2] focus:bg-[#073937] focus:text-[#D8D4CD] bg-colorY2 rounded-[3rem] border border-[#D8D4CD]"
    const inputStyleClassForGender = "py-2 px-4 w-[100%] md:w-[10rem] focus:outline-none placeholder:text-[#073937] bg-colorY2 rounded-[3rem] border border-[#D8D4CD]"

    function handleFilters(event) {
        const { name, type, checked, value } = event.target
        props.setFilters((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    function toggleFilterDiv() {
        setToggleFilter((prev) => { return !prev })
    }

    function clearAllFilters() {
        props.setFilters({})
    }

    const hostelFiltersDiv =
        toggleFilter ?
            (
                <div className="w-full flex flex-col px-[2rem] md:px-[6rem] justify-center items-center gap-4 overflow-x-hidden">
                    <div className="flex sm:flex-row justify-center items-center flex-wrap gap-2 my-3 py-[0.5rem] px-10 w-full bg-colorY" >
                        <div className={inputStyleClass + "text-red-600 text-center"}>
                            <button onClick={toggleFilterDiv} className="cursor-pointer"> {toggleFilter ? "Hide Filters" : "Show Filters"} </button>
                        </div>
                        <button className={inputStyleClass + " text-red-600 sm-down:px-4"} onClick={clearAllFilters}>Clear</button>

                        <input className={inputStyleClass} type="text" name="city" id="city" placeholder="City" value={props.filters.city} onChange={handleFilters} />
                        <input className={inputStyleClass} type="text" name="name" id="name" placeholder="Hostel Name" value={props.filters.name} onChange={handleFilters} />
                        <input className={inputStyleClass} type="text" name="locality" id="locality" placeholder="Locality" value={props.filters.locality} onChange={handleFilters} />

                        <select className={inputStyleClassForGender + " cursor-pointer text-[#073937] bg-colorY2"} name="BoysOrGirls" id="gender" onChange={handleFilters} value={props.filters.BoysOrGirls}>
                            <option value="None">Select Gender</option>
                            <option value="Boys">Boys</option>
                            <option value="Girls">Girls</option>
                            <option value="Both">Both</option>
                        </select>

                        <input className={inputStyleClass} placeholder="Min Price" type="number" name="minPrice" id="minPrice" onChange={handleFilters} value={props.filters.minPrice} />
                        <input className={inputStyleClass} placeholder="Max Price" type="number" name="maxPrice" id="maxPrice" onChange={handleFilters} value={props.filters.maxPrice} />

                        <div className={"flex flex-wrap flex-row gap-2 px-[2rem] "}>
                            <div className={inputStyleClass + " flex flex-row gap-3 hover:bg-colorYH rounded-[3rem] px-4 py-2 cursor-pointer"}>
                                < input className="" type="checkbox" name="wifi" id="wifi" onChange={handleFilters} checked={props.filters.wifi} />
                                <label className="cursor-pointer" htmlFor="wifi">Wifi</label>
                            </div>
                            <div className={inputStyleClass + " flex flex-row gap-3 hover:bg-colorYH rounded-[3rem] px-4 py-2 cursor-pointer"}>
                                <input className="" type="checkbox" name="ac" id="ac" onChange={handleFilters} checked={props.filters.ac} />
                                <label className="cursor-pointer" htmlFor="ac">AC</label>
                            </div>
                            <div className={inputStyleClass + " flex flex-row gap-3 hover:bg-colorYH rounded-[3rem] px-4 py-2 cursor-pointer"}>
                                <input className="" type="checkbox" name="gym" id="gym" onChange={handleFilters} checked={props.filters.gym} />
                                <label className="cursor-pointer" htmlFor="gym">Gym</label>
                            </div>
                            <div className={inputStyleClass + " flex flex-row gap-3 hover:bg-colorYH rounded-[3rem] px-4 py-2 cursor-pointer"}>
                                <input className="" type="checkbox" name="laundry" id="laundry" onChange={handleFilters} checked={props.filters.laundry} />
                                <label className="cursor-pointer" htmlFor="laundry">Laundry</label>
                            </div>
                        </div>
                    </div>
                </div >
            )
            :
            (
                <div className=" px-[2rem] md:px-[6rem] flex flex-row items-center gap-4">

                    <div className="" onClick={toggleFilterDiv}>
                        <button className={inputStyleClass}> {toggleFilter ? "Hide Filters" : "Show Filters"} </button>
                    </div>

                    <div>
                        <button className={inputStyleClass + "sm-down:w-[4rem]  text-red-600 my-3"} onClick={clearAllFilters}>Clear</button>
                    </div>
                </div>
            )
    return hostelFiltersDiv;
}