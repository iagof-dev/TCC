import { useEffect, useState } from "react"
import { json } from "react-router-dom"
import {Api} from '../../api'

export default function List(props) {
	const { setPath, path, userInfo } = { ...props }

	//Após o fetch
	const [booksHistory, setBookHistory] = useState()
// 		{
// 			titulo: "Quincas Borba",
// 			code: "ABCD1234",
// 			autor: "Machado de Assis",
// 			data_aluguel
// : "14/06/24",
// 			loanPeriod: "15",
// 			rating: 4,
// 			situation: "Devolvido"
// 		},
// 		{
// 			titulo: "Java para Leigos",
// 			autor: "Barry A. Burd",
// 			code: "WWRE4563",
// 			data_aluguel
// : "14/02/24",
// 			loanPeriod: "15",
// 			rating: 1,
// 			situation: "Pendente"
// 		},
// 		{
// 			titulo: "Java para Leigos",
// 			autor: "Barry A. Burd",
// 			code: "FYTM5467",
// 			data_aluguel
// : "14/02/24",
// 			loanPeriod: "15",
// 			rating: 2,
// 			situation: "Atrasado"
// 		},
// 		{
// 			titulo: "Java para Leigos",
// 			autor: "Barry A. Burd",
// 			code: "FYTM5467",
// 			data_aluguel
// : "14/02/24",
// 			loanPeriod: "15",
// 			rating: 2,
// 			situation: "Perdido"
// 		},


	let previousRatings = []

	if (Array.isArray(booksHistory)) booksHistory.map((b) => {
		previousRatings.push(b.rating)
	})

	const [booksNewRatings, setBooksNewRatings] = useState(previousRatings)
	const [DOMRatingValues, setDOMRatingValues] = useState(previousRatings)

	const [hasRatingsBeenChanged, setHasRatingsBeenChanged] = useState(false)

	function setNewRatings(){

		//Update livros

		let booksWithNewRatings = []

		booksHistory.map((book, id) => {
			if (book.rating != DOMRatingValues[id]) {
				booksWithNewRatings.push({code: book.code, rating: DOMRatingValues[id]})
				book.rating = DOMRatingValues[id]
			}
		})

		console.log(booksWithNewRatings);

		setHasRatingsBeenChanged(false)
	}

	useEffect(() => {
		getBooks()
	}, [])

	async function getBooks(){

		console.log('====================================');
		console.log(userInfo.rm);
		console.log('====================================');
		const data = await Api.books.getBooksByRM(userInfo.rm)
		setBookHistory(data)
	}

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
					📚 Leituras anteriores, pendentes e atrasadas
				</h2>
				{
					hasRatingsBeenChanged ? <button className="button no-wrap align-center mt-2 w-fit py-2 px-4 rounded text-lg flex gap-3" onClick={setNewRatings}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
						</svg>

						Confirmar alterações
					</button> : ""
				}
			</span>

			{Array.isArray(booksHistory)? <div className="table-wrapper overflow-x-auto overflow-y-scroll w-fit h-[20rem]">
				<table className="table w-fit">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Título</th>
							<th>Autor</th>
							<th>Data de <br />Empréstimo</th>
							<th>Período<br />(dias)</th>
							<th>Avaliação</th>
							<th>Situação</th>
						</tr>
					</thead>
					<tbody className="">
						{booksHistory.map((b, i) => {
							let situationColor = ""


							switch (b.estado) {
								case "devolvido":
									situationColor = "green"
									break

								case "pendente":
									situationColor = "yellow"
									break

								case "atrasado":
									situationColor = "red"
									break

								case "perdido":
									situationColor = "black"
									break
							}

							return (
								<tr className={` ${i == 0 ? "tr--first" : ""} ${i == booksHistory.length - 1 ? "tr--last" : ""}`}>
									<th>{booksHistory.length - i}</th>
									<td>{b.titulo}</td>
									<td>{b.autor}</td>
									<td>{b.data_aluguel}</td>
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
									}>{b.estado[0].toUpperCase() + b.estado.slice(1)} </td>
								</tr>
							)
						})}

					</tbody>
				</table>
			</div> : <span className="m-auto loading loading-spinner loading-xl"></span>}
			

		</>

	)
}