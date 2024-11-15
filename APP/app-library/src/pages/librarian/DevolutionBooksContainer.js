import { Box, Divider } from "@mui/material"
import { useEffect, useState } from "react"
import { dateConvert } from "../miscellaneous"
import { Api } from "../../api"

export default function DevolutionBooksContainer(props) {
	const { isRequesting, setHasRequestedDevolution, devolutionBooks, setFormData } = { ...props }
	const [selectedBook, setSelectedBook] = useState({})


	let bookToBeRenewed = {}

	async function handleBookDevolution(id) {
		// devolutionBooks.forEach(book => {
		// 	if (book.codigo == code) {
		// 		setSelectedBook(book)
		// 		document.getElementById('devolutionModal').showModal()
		// 		return
		// 	}
		// });

		const loan = devolutionBooks.find(book => book.id == id)


		if (loan) {
			const res = await Api.loans.makeDevolution(loan)

			document.getElementById('devolutionSuccessModal').showModal()
			setFormData({
				code: "",
				title: "",
				RM: "",
				loanDate :"",
				librarianId: "",
				bookId: "",
				name: "",
				time: 2
			})
			setTimeout(() => setHasRequestedDevolution(false), 2000)
			
		}

	}

	async function handleRenewBook() {

		const res = await Api.loans.renewBook(bookToBeRenewed)

		document.getElementById('renewSuccessModal').showModal()
		setFormData({
			code: "",
			title: "",
			RM: "",
			loanDate :"",
			librarianId: "",
			bookId: "",
			name: "",
			time: 2
		})
		setTimeout(() => setHasRequestedDevolution(false), 2000)
		
		
	}

	async function handleLostBook() {

		const res = await Api.loans.makeLost(bookToBeRenewed)

		document.getElementById('lostSuccessModal').showModal()
		setFormData({
			code: "",
			title: "",
			RM: "",
			loanDate :"",
			librarianId: "",
			bookId: "",
			name: "",
			time: 2
		})
		setTimeout(() => setHasRequestedDevolution(false), 2000)
		
		
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
													<button className="button no-wrap align-center py-2 px-4 w-[7rem] rounded text-lg" onClick={() => handleBookDevolution(b.id)}>
														Devolução
													</button> : <div className="py-2 px-4"></div>
											}



											{b.renovavel && !['perdido', 'devolvido'].includes(b.estado) ?
												<button className="no-wrap align-center w-full py-2 px-4 rounded w-[6rem] text-lg bg-gray-500 text-slate-50 " onClick={() => {bookToBeRenewed = b ; handleRenewBook(b)}}>
													Renovar
												</button> : <div className="py-2 px-4"></div>

											}

											{!['perdido', 'devolvido'].includes(b.estado)  ?
												<button className="no-wrap align-center w-full py-2 px-4 rounded w-[6rem]  text-lg bg-gray-700 text-slate-50 " onClick={() => {bookToBeRenewed = b ; handleLostBook(b)}}>
													Perda
												</button> : <div className="py-2 px-4"></div>

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

		<dialog id="renewBookModal" className="modal">
			<div className="modal-box  w-full">
				<h3 className="font-bold text-lg">Confirmar renovação</h3>
				<p className="py-4">Deseja realizar a renovação do empréstimo?</p>

				<div className=" w-full p-4">

					<div className=" flex w-full justify-end no-wrap gap-4 mt-3">
						<button onClick={() => handleRenewBook()} className="button no-wrap items-center flex gap-3 align-center py-2 px-4 rounded-xl text-lg">

							Confirmar

						</button>
						<form method="dialog">
							<button className="btn"
								onClick={() => {
									setSelectedBook({})
									// setHasSearchBeenMade(false)
								}
								}>
								Voltar
							</button>
						</form>
					</div>

				</div>
			</div>
		</dialog>

		<dialog id="devolutionSuccessModal" className="modal ">
			<div className="modal-box bg-green-200 flex w-fit gap-12 items-center">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0c9115" className="w-32 h-32">
					<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
				</svg>

				<div>
					<h3 className="font-bold text-3xl ">Sucesso!</h3>
					<p className="py-4">Devolução realizada!</p>
					<div className="modal-action">
						<form method="dialog">
							<button className="btn">Fechar</button>
						</form>
					</div>
				</div>
			</div>
		</dialog>

		<dialog id="renewSuccessModal" className="modal ">
			<div className="modal-box bg-green-200 flex w-fit gap-12 items-center">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0c9115" className="w-32 h-32">
					<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
				</svg>

				<div>
					<h3 className="font-bold text-3xl ">Sucesso!</h3>
					<p className="py-4">Renovação realizada!</p>
					<div className="modal-action">
						<form method="dialog">
							<button className="btn">Fechar</button>
						</form>
					</div>
				</div>
			</div>
		</dialog>

		<dialog id="errorSuccessModal" className="modal ">
			<div className="modal-box bg-red-300 flex w-fit gap-12 items-center">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#EF4444" className="w-32 h-32">
					<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
				</svg>

				<div>
					<h3 className="font-bold text-3xl text-slate-50">Jão!</h3>
					<p className="py-4 text-slate-50">Devolução realizada!</p>
					<div className="modal-action">
						<form method="dialog">
							<button className="btn">Fechar</button>
						</form>
					</div>
				</div>
			</div>
		</dialog>

		<dialog id="lostSuccessModal" className="modal ">
			<div className="modal-box bg-green-200 flex w-fit gap-12 items-center">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0c9115" className="w-32 h-32">
					<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
				</svg>

				<div>
					<h3 className="font-bold text-3xl ">Sucesso!</h3>
					<p className="py-4">Perda de livro registrada!</p>
					<div className="modal-action">
						<form method="dialog">
							<button className="btn">Fechar</button>
						</form>
					</div>
				</div>
			</div>
		</dialog>




	</section>

}
