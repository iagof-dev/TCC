export default function Book(props) {
	const {author, title, rating, status, synopsis, coverURL} = {...props}

	return(
		<section>
			<img src={"https://m.media-amazon.com/images/I/61Kt3d+mhuL._AC_UF1000,1000_QL80_.jpg"} alt="" />
			<p>
				{title}
			</p>
		</section>
	)
}