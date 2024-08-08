import { useEffect, useState } from "react"
import { Api } from "../../api"
import { ThemeProvider, createTheme } from "@mui/material"
import { dateConvert } from '../miscellaneous'

export default function LibrarianList(props) {

    const [lectures, setLectures] = useState([])

    useEffect(() => {
        async function setAllLectures() {
            const data = await Api.loans.getAllLoans()

            if (data == 'Dado não encontrado.') return (setTimeout(() => setIsLoading('no-books'), 1000))

            if (Array.isArray(data)) {
                setLectures(data) 
                return setTimeout(() => setIsLoading('showing'), 1000)
            }
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

    // loading | showing | no-books
    const [isLoading, setIsLoading] = useState('loading')

    function loadingContent() {
        if (isLoading == 'loading') return <span className="m-auto loading loading-spinner loading-3xl"></span>
        if (isLoading == 'showing') return <ThemeProvider theme={theme}>

            {
                <table className="table w-fit">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Aluno</th>
                            <th>RM</th>
                            <th>Título</th>
                            <th>Data de <br /> Empréstimo</th>
                            <th>Período (dias)</th>
                            <th>Situação</th>
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
                                    <td>{b.aluno_nome}</td>
                                    <td>{b.aluno_rm}</td>
                                    <td>{b.livro_titulo}</td>
                                    <td>{dateConvert(b.data_aluguel)}</td>
                                    <td>{b.prazo}</td>
                                    <td className={`td-situation`}>
                                        {
                                            b.estado ? <span className={`px-3 py-2 rounded td-situation-${situationColor}`}>{b.estado[0].toUpperCase() + b.estado.slice(1)}</span> : ''
                                        }

                                    </td>

                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            }


        </ThemeProvider>
        if (isLoading == 'no-books') return <p>Sem empréstimos</p>
    }

    return <>
        <h1 className="pb-5 text-3xl">
            Listagem de empréstimos
        </h1>
        {loadingContent()}
    </>
}