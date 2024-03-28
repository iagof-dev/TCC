import info from "../assets/icons/info.png"

export default function Info(props) {
    const {title, content} = {...props}
    return(
        <div className="flex items-center gap-3 m-auto">
            <img className="w-8" src={info}/>
            <div className="flex flex-col">
                <h3 className="text-[#62AD47] font-bold text-lg">
                    {title}
                </h3>
                <p className="text-[#62AD47]">
                    {content}
                </p>
            </div>
        </div>
    )
}