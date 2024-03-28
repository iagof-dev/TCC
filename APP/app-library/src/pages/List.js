export default function List(props) {
	const { setPath, path, userInfo } = { ...props }

	const booksHistory = [
		{
			title: "Quincas Borba",
			author: "Machado de Assis",
			loanDate: "14/06/24",
			loanPeriod: "15",
			situation: "Devolvido"
		},
		{
			title: "Java para Leigos",
			author: "Barry A. Burd",
			loanDate: "14/02/24",
			loanPeriod: "15",
			situation: "Pendente"
		},
		{
			title: "Java para Leigos",
			author: "Barry A. Burd",
			loanDate: "14/02/24",
			loanPeriod: "15",
			situation: "Atrasado"
		},
	]

	return (

		<>
			<h1 className="pb-5 text-3xl">
				Bem-vindo(a), {userInfo.name}!
			</h1>

			<h2>
				Leituras anteriores, pendentes e atrasadas
			</h2>
			<div className="table-wrapper overflow-x-auto overflow-y-scroll w-[70rem] h-[20rem]">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Título</th>
							<th>Autor</th>
							<th>Data de Empréstimo</th>
							<th>Período de <br /> Empréstimo (dias)</th>
							<th>Situação</th>
						</tr>
					</thead>
					<tbody className="">
						{booksHistory.map((b, i) => {
							let situationColor = ""

							switch (b.situation){
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
								<tr className={` ${i == 0? "tr--first" : ""} ${i == booksHistory.length-1? "tr--last" : ""}`}>
									<th>{booksHistory.length - i}</th>
									<td>{b.title}</td>
									<td>{b.author}</td>
									<td>{b.loanDate}</td>
									<td>{b.loanPeriod}</td>
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