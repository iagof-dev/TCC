import { useEffect } from "react"

export default function DevolutionBooksContainer(props) {
    const { isRequesting, devolutionBooks } = { ...props }

    return <section className='results-container p-1 w-full flex flex-col no-wrap justify-start gap-5 items-center rounded-md min-h-[20vh] max-h-[60vh] overflow-y-scroll'>

        {
            console.log("devolution books")
        }


        {
            isRequesting? <section className='results-container p-1 w-full flex flex-col no-wrap justify-start gap-5 items-center rounded-md min-h-[20vh] max-h-[60vh] overflow-y-scroll'>
            <span className="loading m-auto loading-spinner loading-lg"></span></section>

            : 
            <table className="table w-fit">
                {
                    console.log("table")
                }
            <thead>
            <tr>
                <th></th>
                <th>Título</th>
                <th>Autor</th>
                <th>Data de <br />Empréstimo</th>
                <th>Período<br />(dias)</th>
                <th>Situação</th>
                <th>
                    Ações
                </th>
            </tr>
        </thead>
        <tbody className="">
            {devolutionBooks.map((b, i) => {
                let situationColor = ""


                switch (b.situation) {
                    case "Pendente":
                        situationColor = "yellow"
                        break

                    case "Atrasado":
                        situationColor = "red"
                        break
                }

                return (
                    <tr className={` ${i == 0 ? "tr--first" : ""} ${i == devolutionBooks.length - 1 ? "tr--last" : ""}`}>
                        <th>{devolutionBooks.length - i}</th>
                        <td>{b.title}</td>
                        <td>{b.author}</td>
                        <td>{b.loanDate}</td>
                        <td>{b.loanPeriod}</td>
                        <td className={`td-situation td-situation-${situationColor} `
                            // + `${i == 0? "td-situation--first" : ""} ${i == booksHistory.length-1? "td-situation--last" : ""}`
                        }>{b.situation} </td>
                        <td className="flex gap-4">
                            <button className="button no-wrap align-center w-full py-2 px-4 rounded text-lg">
                                Devolver
                            </button>
                            <button className="no-wrap align-center w-full py-2 px-4 rounded text-lg bg-slate-400 text-slate-50">
                                Relatar <br/>
                                perda
                            </button>
                        </td>
                    </tr>
                )
            })}

        </tbody>
    </table>}

    </section>

}   
        