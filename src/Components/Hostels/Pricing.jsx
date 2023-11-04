export default function Pricing(props) {
    return (
        // <div className="w-[250px] px-2 py-2 my-2 border-b-4">
        //     <div className="flex flex-row justify-between">
        //         <span className="">{props.sharing} Sharing</span>
        //         <span className="">from $ {props.price}</span>
        //     </div>
        // </div>

        <div className="items-start self-stretch flex w-full justify-between gap-5 mt-4">
            <div className="text-teal-950 text-sm leading-5 tracking-normal self-stretch">{props.sharing} Sharing</div>
            <div className="text-teal-950 text-sm font-bold leading-5 tracking-normal self-stretch whitespace-nowrap">
                <span className="">from </span>
                <span className="font-bold">&#8377; {props.price}</span>
            </div>
        </div>
    )
}