export default function NewMenuLink(props) {
    const { path, linkTarget, title, svgPath } = { ...props }

    return (
        <a className="menu__item tooltip tooltip-right" href={path == linkTarget ? "" : linkTarget}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`menu__item__icon w-10 h-10  ${path == linkTarget ? "opacity-60" : ""}`}>
                {svgPath}

            </svg>


            <a className={`menu-link ${path == linkTarget ? "menu-link--active" : ""}`}>
                {title}
            </a>
        </a>
    )
}