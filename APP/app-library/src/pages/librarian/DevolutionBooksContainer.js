import { Box, Divider } from "@mui/material"
import { useEffect, useState } from "react"
import { dateConverter } from "../miscellaneous"

export default function DevolutionBooksContainer(props) {
    const { isRequesting, devolutionBooks } = { ...props }
    const [selectedBook, setSelectedBook] = useState({})

    function handleBookDevolution(code) {
        devolutionBooks.forEach(book => {
            if (book.codigo == code) {
                setSelectedBook(book)
                document.getElementById('devolutionModal').showModal()
                return
            }
        });

    }

    function handleBookLost(code) {
        document.getElementById('lostModal').showModal()
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
                            Array.isArray(devolutionBooks)? devolutionBooks.map((b, i) => {
                                let situationColor = ""


                                switch (b.estado) {
                                    case "pendente":
                                        situationColor = "yellow"
                                        break

                                    case "atrasado":
                                        situationColor = "red"
                                        break
                                }

                                return (
                                    <tr className={` ${i == 0 ? "tr--first" : ""} ${i == devolutionBooks.length - 1 ? "tr--last" : ""}`}>
                                        <th>{devolutionBooks.length - i}</th>
                                        <td>{b.titulo}</td>
                                        <td>{b.autor}</td>
                                        <td>{dateConverter(b.data_aluguel)}</td>
                                        <td>{b.loanPeriod}</td>
                                        <td className={`td-situation`
                                            // + `${i == 0? "td-situation--first" : ""} ${i == booksHistory.length-1? "td-situation--last" : ""}`
                                        }><span className={`p-3 rounded td-situation-${situationColor}`}>{b.estado[0].toUpperCase() + b.estado.slice(1)}</span> </td>
                                        <td>
                                            <p className="bg-slate-300 w-[2px] h-[2rem] rounded">
                                                ‎
                                            </p>
                                        </td>
                                        <td className="flex gap-4">
                                            <button className="button no-wrap align-center w-full py-2 px-4 rounded text-lg" onClick={() => handleBookDevolution(b.code)}>
                                                Devolver
                                            </button>
                                            <button className="no-wrap align-center w-full py-2 px-4 rounded text-lg bg-slate-900 text-slate-50" onClick={() => handleBookLost(b.code)}>
                                                Relatar perda
                                            </button>
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

        <dialog id="lostModal" className="modal">
            <div className="modal-box  w-full max-w-5xl">
                <h3 className="font-bold text-lg">Confirmar perda</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>

                <img src="" />

                <div className="modal-action">

                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>



    </section>

}
