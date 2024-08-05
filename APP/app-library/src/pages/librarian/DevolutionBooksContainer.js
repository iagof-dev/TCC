import { Box, Divider } from "@mui/material"
import { useEffect, useState } from "react"
import { dateConvert } from "../miscellaneous"
import { Api } from "../../api"

export default function DevolutionBooksContainer(props) {
	const { isRequesting, devolutionBooks } = { ...props }
	const [selectedBook, setSelectedBook] = useState({})

	async function handleBookDevolution(id) {
		// devolutionBooks.forEach(book => {
		// 	if (book.codigo == code) {
		// 		setSelectedBook(book)
		// 		document.getElementById('devolutionModal').showModal()
		// 		return
		// 	}
		// });

		const loan = devolutionBooks.find(book => book.id == id)
		console.log(loan);

		if (loan) {
			const res = await Api.loans.makeDevolution(loan)
			console.log(res);
		}

	}

	async function handleRenewBook(book) {

		const res = await Api.loans.renewBook(book)
		console.log(res);

		document.getElementById('renewBookModal').showModal()
	}

	return <section className='results-container p-1 mt-2 w-full flex flex-col no-wrap justify-start gap-5 items-center rounded-md min-h-[20vh] max-h-[60vh] overflow-y-scroll'>

		{
			isRequesting ? <section className='results-container p-1 w-full flex flex-col no-wrap justify-start gap-5 items-center rounded-md min-h-[20vh] max-h-[60vh] overflow-y-scroll'>
				<span className="loading m-auto loading-spinner loading-lg"></span></section>

				:
				<table className="table w-fit">
					<thead>
						<tr>
							<th></th>
							<th>Título</th>
							<th>Autor</th>
							<th>Data de <br />Empréstimo</th>
							<th>Período<br />(dias)</th>
							<th>Situação</th>
							<th>

							</th>
							<th>
								Ações
							</th>
						</tr>
					</thead>

					{/* TODO: Fazer com que o tbody não seja carregado no caso de nao ter devoluções */}

					<tbody className="">
						{
							Array.isArray(devolutionBooks) && devolutionBooks.length > 0 ? devolutionBooks.map((b, i) => {
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
									<tr className={` ${i == 0 ? "tr--first" : ""} ${i == devolutionBooks.length - 1 ? "tr--last" : ""}`}>
										<th>{devolutionBooks.length - i}</th>
										<td>{b.livro_titulo}</td>
										<td>{b.autor_nome}</td>
										<td>{dateConvert(b.data_aluguel)}</td>
										<td>{b.prazo}</td>
										<td className={`td-situation`
											// + `${i == 0? "td-situation--first" : ""} ${i == booksHistory.length-1? "td-situation--last" : ""}`
										}><span className={`p-3 rounded td-situation-${situationColor}`}>{b.estado[0].toUpperCase() + b.estado.slice(1)}</span> </td>
										<td>
											<p className="bg-slate-300 w-[2px] h-[2rem] rounded">
												‎
											</p>
										</td>
										<td className="flex gap-4 justify-between w-full">
											{
												b.estado == 'pendente' ? 
												<button className="button no-wrap align-center py-2 px-4 rounded text-lg" onClick={() => handleBookDevolution(b.id)}>
													Devolução
												</button> : <div className="w-full py-2 px-4"></div>
											}



											{b.renovavel ?
												<button className="no-wrap align-center w-full py-2 px-4 rounded text-lg bg-gray-700 text-slate-50 " onClick={() => handleRenewBook(b)}>
													Renovar
												</button> : <div className="w-full py-2 px-4"></div>

											}
										</td>
									</tr>
								)
							}) : <div className="w-full px-10 flex justify-center">
								<p>Esse aluno não fez empréstimos!</p>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
								</svg>


							</div>
						}


					</tbody>
				</table>}

		<dialog id="devolutionModal" className="modal">
			<div className="modal-box  w-full max-w-5xl">
				<h3 className="font-bold text-lg">Confirmar devolução</h3>
				<p className="py-4">
					{selectedBook.titulo}
				</p>

				<img src="" />

				<div className="modal-action">

					<form method="dialog">
						<button className="btn">Close</button>
					</form>
				</div>
			</div>
		</dialog>

		{/* <dialog id="renewBookModal" className="modal">
			<div className="modal-box  w-full max-w-5xl">
				<h3 className="font-bold text-lg">Confirmar renovação</h3>
				<p className="py-4">Deseja realizar a renovação do empréstimo?</p>

				<div className=" w-full p-4">
			
					<div className=" flex no-wrap gap-4 mt-3">
						<button onClick={handleRenewBook} className="button no-wrap items-center flex gap-3 align-center py-2 px-4 rounded-xl text-lg">

							Confirmar

						</button>
						<button className="btn" onClick={() => {
							setSelectedBook({})
							setHasSearchBeenMade(false)
						}
						}>
							Voltar e editar
						</button>
					</div>

				</div>

				<div className="modal-action">

					<form method="dialog">
						<button className="btn">Close</button>
					</form>
				</div>
			</div>
		</dialog> */}



	</section>

}
