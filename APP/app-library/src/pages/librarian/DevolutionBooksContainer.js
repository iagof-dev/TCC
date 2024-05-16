import { Box, Divider } from "@mui/material"
import { useEffect, useState } from "react"
import { dateConverter } from "../miscellaneous"

export default function DevolutionBooksContainer(props) {
    const { isRequesting, devolutionBooks } = { ...props }
    const [selectedBook, setSelectedBook] = useState({})
    const [doesStudentHaveLoanedBooks, setDoesStudentHaveLoanedBooks] = useState(true)
    
    function handleBookDevolution(code){
        devolutionBooks.forEach(book => {
            
        });
        document.getElementById('devolutionModal').showModal()
    }

    function handleBookLost(code){
        document.getElementById('lostModal').showModal()
    }

    if(devolutionBooks == "Nenhum dado registrado!"){
        console.log("deu ruim")
        setDoesStudentHaveLoanedBooks(false)
    }

    return <section className='results-container p-1 mt-2 w-full flex flex-col no-wrap justify-start gap-5 items-center rounded-md min-h-[20vh] max-h-[60vh] overflow-y-scroll'>

        {
            isRequesting? <section className='results-container p-1 w-full flex flex-col no-wrap justify-start gap-5 items-center rounded-md min-h-[20vh] max-h-[60vh] overflow-y-scroll'>
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
            

            {devolutionBooks.map((b, i) => {
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
            })}

        </tbody>
    </table>}

    <dialog id="devolutionModal" className="modal">
    <div className="modal-box  w-full max-w-5xl">
        <h3 className="font-bold text-lg">Confirmar devolução</h3>
        <p className="py-4">
            {selectedBook.titulo}
        </p>

        <img src=""/>
    
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

        <img src=""/>
    
        <div className="modal-action">
        
        <form method="dialog">
            <button className="btn">Close</button>
        </form>
        </div>
    </div>
    </dialog>



    </section>

}   
        