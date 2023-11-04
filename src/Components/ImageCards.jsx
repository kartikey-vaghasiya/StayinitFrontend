import { Carousel } from "@material-tailwind/react";

export default function ImageCards(props) {
    const cardsDiv = props.imageUrlArray && props.imageUrlArray.length > 0 ? props.imageUrlArray.map((image) => {
        return (
            <img src={image.url} className="h-full w-full object-cover" alt="..." />
        )
    }) : []

    return (

        <div className=" p-6 ">
            <Carousel className="rounded-xl md:h-[400px] lg:h-[500px] ">
                {cardsDiv}
            </Carousel>
        </div>
    )
}