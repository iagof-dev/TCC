import { Children } from "react";
import "tailwindcss/tailwind.css"

export default function Container({children}){
    return(
        <div className={`container p-5 m-auto shadow-md rounded-xl border-[1px]  flex flex-col align-center w-fit h-fit`}>
            {Children.map(children, child => child)}
        </div>
    )
}