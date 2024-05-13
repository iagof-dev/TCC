import { useState } from "react"

export default function LibrarianList(){

    const [allLectures, setAllLectures] = useState([
        {
            student: "Fulano",
            RM: 165423,
            loanDate: "02/03/2024",
            title: "Quincas Borba",
            situation: "Pendente"
        }, 
        {
            student: "Fulano",
            RM: 165423,
            loanDate: "02/03/2024",
            title: "Quincas Borba",
            situation: "Atrasado"
        },
    ])

    return(
        <>
        <h1 className="pb-5 text-3xl">
            Listagem de empréstimos
        </h1>
        <table className="table w-fit">
            <thead>
            <tr>
                <th></th>
                <th>Aluno</th>
                <th>RM</th>
                <th>Título</th>
                <th>Data de <br/> Empréstimo</th>
                <th>Situação</th>
            </tr>
        </thead>
        <tbody className="">
            {allLectures.map((b, i) => {
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
                    <tr className={` ${i == 0 ? "tr--first" : ""} ${i == allLectures.length - 1 ? "tr--last" : ""}`}>
                        <th>{allLectures.length - i}</th>
                        <td>{b.student}</td>
                        <td>{b.RM}</td>
                        <td>{b.title}</td>
                        <td>{b.loanDate}</td>
                        <td className={`td-situation`
                            // + `${i == 0? "td-situation--first" : ""} ${i == booksHistory.length-1? "td-situation--last" : ""}`
                        }><span className={`px-3 py-2 rounded td-situation-${situationColor}`}>{b.situation}</span> </td>
                        
                    </tr>
                )
            })}

        </tbody>
    </table>
    </>
    )
}