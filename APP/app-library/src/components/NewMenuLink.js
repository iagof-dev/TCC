import { Link, useNavigate } from "react-router-dom"



export default function NewMenuLink(props) {
    const { path, linkTarget, title, svgPath } = { ...props }

    const navigate = useNavigate()

    return (
        <a className="menu__item tooltip h-fit tooltip-right w-100 flex flex-col justify-center items-center outline-none" 
        onClick={() => {
            navigate(linkTarget)
        }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`menu__item__icon w-10 h-10  ${path == linkTarget ? "opacity-60" : ""}`}>
                {svgPath}

                

            </svg>

            <Link/>


            <a className={`menu-link ${path == linkTarget ? "menu-link--active" : ""} text-center w-fit text-sm`}>
                {title}
            </a>
        </a>
    )
}