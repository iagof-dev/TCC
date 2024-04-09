import { useEffect, useState } from "react"

export default function List(props) {
	const { setPath, path, userInfo } = { ...props }


	//Após o fetch
	const booksHistory = [
		{
			title: "Quincas Borba",
			author: "Machado de Assis",
			loanDate: "14/06/24",
			loanPeriod: "15",
			rating: 4,
			situation: "Devolvido"
		},
		{
			title: "Java para Leigos",
			author: "Barry A. Burd",
			loanDate: "14/02/24",
			loanPeriod: "15",
			rating: 1,
			situation: "Pendente"
		},
		{
			title: "Java para Leigos",
			author: "Barry A. Burd",
			loanDate: "14/02/24",
			loanPeriod: "15",
			rating: 2,
			situation: "Atrasado"
		},

	]

	let previousRatings = []

	booksHistory.map((b) => {
		previousRatings.push(b.rating)
	})

	const [booksNewRatings, setBooksNewRatings] = useState(previousRatings)
	const [DOMRatingValues, setDOMRatingValues] = useState(previousRatings)

	const [hasRatingsBeenChanged, setHasRatingsBeenChanged] = useState(false)

	useEffect(() => {
		setHasRatingsBeenChanged(JSON.stringify(DOMRatingValues) != JSON.stringify(previousRatings))
	}, [DOMRatingValues])


	return (

		<>
			<h1 className="pb-5 text-3xl">
				Bem-vindo(a), {userInfo.name}!
			</h1>

			<span className="flex flex-nowrap w-full justify-between items-center mb-4">
				<h2>
					Leituras anteriores, pendentes e atrasadas
				</h2>
				{
					hasRatingsBeenChanged ? <button className="button no-wrap align-center mt-2 w-fit py-2 px-4 rounded text-lg flex gap-3">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
						</svg>

						Confirmar alterações
					</button> : ""
				}
			</span>
			<div className="table-wrapper overflow-x-auto overflow-y-scroll w-fit h-[20rem]">
				<table className="table w-fit">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Título</th>
							<th>Autor</th>
							<th>Data de <br />Empréstimo</th>
							<th>Período<br />(dias)</th>
							<th>Nota</th>
							<th>Situação</th>
						</tr>
					</thead>
					<tbody className="">
						{booksHistory.map((b, i) => {
							let situationColor = ""


							switch (b.situation) {
								case "Devolvido":
									situationColor = "green"
									break

								case "Pendente":
									situationColor = "yellow"
									break

								case "Atrasado":
									situationColor = "red"
									break
							}

							return (
								<tr className={` ${i == 0 ? "tr--first" : ""} ${i == booksHistory.length - 1 ? "tr--last" : ""}`}>
									<th>{booksHistory.length - i}</th>
									<td>{b.title}</td>
									<td>{b.author}</td>
									<td>{b.loanDate}</td>
									<td>{b.loanPeriod}</td>
									<td>
										<div className="rating">

											{
												[...Array(5)].map((e, j) => {
													return (
														<input type="radio" onClick={() => {
															let _ratings = [...booksNewRatings]

															_ratings[i] = j

															setBooksNewRatings(_ratings)
															setDOMRatingValues(_ratings)
														}}
															key={j}
															name={`rating-${i}`}
															className={`mask mask-star ${DOMRatingValues[i] >= j ? "marked" : "not-marked"}`}
														/>
													)
												})
											}

										</div>
									</td>
									<td className={`td-situation td-situation-${situationColor} `
										// + `${i == 0? "td-situation--first" : ""} ${i == booksHistory.length-1? "td-situation--last" : ""}`
									}>{b.situation} </td>
								</tr>
							)
						})}

					</tbody>
				</table>
			</div>

		</>

	)
}