import { useEffect, useState } from "react"
import { Api } from "../../api"
import { ThemeProvider, createTheme } from "@mui/material"

export default function LibrarianList() {

    const [lectures, setLectures] = useState([])

    function goToDevolution(code){

    }

    function goToLost(code){

    }

    useEffect(() => {
        async function setAllLectures() {
            const data = await Api.loans.getAllLoans()

            setLectures(data)
        }

        setAllLectures()

    }, [])

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Figtree',
            ].join(','),
        },


    });

    return (
        <>
            <ThemeProvider theme={theme}>


                <h1 className="pb-5 text-3xl">
                    Listagem de empréstimos
                </h1>

                {
                    lectures.length == 0 ? <span className="m-auto loading loading-spinner loading-3xl"></span> : <table className="table w-fit">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Aluno</th>
                                <th>RM</th>
                                <th>Título</th>
                                <th>Data de <br /> Empréstimo</th>
                                <th>Situação</th>
                                {/* <th>Registrar</th> */}
                            </tr>
                        </thead>
                        <tbody className="">
                            {lectures.map((b, i) => {
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
                                    <tr className={` ${i == 0 ? "tr--first" : ""} ${i == lectures.length - 1 ? "tr--last" : ""}`}>
                                        <th>{lectures.length - i}</th>
                                        <td>{b.nome}</td>
                                        <td>{b.rm}</td>
                                        <td>{b.titulo}</td>
                                        <td>{b.data_aluguel}</td>
                                        <td className={`td-situation`}>
                                            {
                                                b.estado ? <span className={`px-3 py-2 rounded td-situation-${situationColor}`}>{b.estado[0].toUpperCase() + b.estado.slice(1)}</span> : ''
                                            }

                                        </td>
                                        {/* <td className="flex no-wrap">
                                            <button className="btn button no-wrap items-center flex gap-3 align-center py-2 px-4 rounded-xl text-md">
                                                Devolução
                                            </button>
                                            <button className="btn button button-lost no-wrap items-center flex gap-3 align-center py-2 px-4 rounded-xl text-md ">
                                                Perda
                                            </button>
                                        </td> */}

                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                }


            </ThemeProvider>
        </>
    )
}