
export default function Book(props) {
	const { id, code, author, title, rating, status, synopsis, coverURL, tags, disponivel } = { ...props }

	return (
		<section className="book flex no-wrap w-full gap-3 rounded-lg max-w-[50vw] max-h-[30vh]">

			<img className="w-[12vw] rounded object-cover" src={coverURL} alt="" />


			<div className="flex flex-col justify-between w-full">
				<span className="flex flex-col">
					<span className="flex justify-between items-center">
						<p className={`font-bold ${title.length > 14 ? "text-base" : ""}`}>
							{title}
						</p>

						<div className="flex no-wrap gap-1">
							{
								Array.isArray(tags) ?
									tags.map(tag => {
										return (
											<p className="px-2 r h-fit py-1 border-solid border-[1px] rounded-xl text-sm">
												{tag}
											</p>
										)
									}) : [tags].map(tag => {
										return (
											<p className="px-2 r h-fit py-1 border-solid border-[1px] rounded-xl text-sm">
												{tag}
											</p>
										)
									})
							}
						</div>

						<div className="flex flex-col items-center">
							<div className="rating flex gap-1">
								{
									[...Array(5)].map((e, j) => {
										return (
											<input type="radio"

												key={j}
												name={`rating-${id}`}
												className={`mask mask-star ${rating >= j ? "marked" : "not-marked"}`}

											/>
											// <input type="radio"
											// 	key={j}
											// 	name={`rating-${id}`}
											// 	className={`bg-black  `}

											// />
										)
									})
								}
							</div>
							<p className="rating-label text-sm">
								Avaliação média
							</p>
						</div>
					</span>
					<p className="">
						{author}
					</p>


				</span>
				<div className="w-full flex justify-between no-wrap">
					<p className=" text-sm max-w-[20vw] my-4">
						{/* add "ver mais" */}
						{synopsis.length >= 150 ? (
							<>
								{`${synopsis.slice(0, 180)}...`}
							</>
						) : synopsis}
					</p>
					<div className="flex flex-col justify-center">
						<p className="text-sm text-right">
							Código: <span className=" font-semibold">{code}</span>
						</p>
						{
							disponivel ? <p className={`px-3 py-2 border-[1px] rounded-md text-base text-center status-red`}>
								Disponível
							</p> : <p className={`px-3 py-2 border-[1px] rounded-md text-base text-center status-red`}>
								Indisponível
							</p>
						}

					</div>
				</div>

			</div>
		</section>
	)
}