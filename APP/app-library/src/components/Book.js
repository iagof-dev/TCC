export default function Book(props) {
	const { id, code, author, title, rating, status, synopsis, coverURL } = { ...props }

	return (
		<section className="book flex no-wrap w-full gap-3 rounded-lg max-w-[50vw] max-h-[30vh]">

			<img className="w-[22vw] rounded" src={coverURL} alt="" />


			<div className="flex flex-col justify-between">
				<span className="flex flex-col">
					<span className="flex">
						<p className="a font-bold">
							{title}
						</p>
						<div className="flex">
							{
								[...Array(5)].map((e, j) => {
									console.log('====================================');
									console.log(`radio -> ${j}, ${rating}`);
									console.log('====================================');
									return (
										<input type="radio"
											disabled
											key={j}
											name={`rating-${id}`}
											className={`mask mask-star ${rating >= j ? "marked" : "not-marked opacity-20"}`}
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
				<p className=" text-sm">
					{synopsis}
				</p>

			</div>
		</section>
	)
}