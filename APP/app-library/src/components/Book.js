export default function Book(props) {
	const { id, code, author, title, rating, status, synopsis, coverURL, tags } = { ...props }

	return (
		<section className="book flex no-wrap w-full gap-3 rounded-lg max-w-[50vw] max-h-[30vh]">

			<img className="w-[12vw] rounded" src={coverURL} alt="" />


			<div className="flex flex-col justify-between">
				<span className="flex flex-col">
					<span className="flex justify-between items-center">
						<p className={`font-bold ${title.length > 14? "text-base" : ""}`}>
							{title}
						</p>

						<div className="flex no-wrap gap-1">
							{
								tags.map(tag => {
									return (
										<p className="px-2 h-fit py-1 border-solid border-2 rounded-xl text-sm">
											{tag}
										</p>
									)
								})
							}
						</div>

						<div className="flex gap-1">
							{
								[...Array(5)].map((e, j) => {
									return (
										<input type="radio"
											disabled
											key={j}
											name={`rating-${id}`}
											className={`mask scale-150 mask-star ${rating >= j ? "marked" : "not-marked opacity-20"}`}
										/>
									)
								})
							}
						</div>
					</span>
					<p className="text-lg">
						{author}
					</p>


				</span>
				<div className="w-full flex justify-between">
					<p className=" text-sm">
						{synopsis}
					</p>
					<div>
						<p className="text-sm text-right">
							Código: <span className=" font-semibold">{code}</span>
						</p>
						<p className={`px-3 py-2 border-2 rounded-md text-base status-${status.charAt(0)}`}>
							{status}
						</p>
					</div>
				</div>

			</div>
		</section>
	)
}