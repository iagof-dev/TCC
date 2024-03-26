export default function MenuLink(props) {
	const {path, linkTarget, title} = { ...props }

	return(
		<a className={`menu-link ${path == linkTarget ? "menu-link--active" : ""}`} href={path == linkTarget? "" : linkTarget}>
			{title}
		</a>
	)
}