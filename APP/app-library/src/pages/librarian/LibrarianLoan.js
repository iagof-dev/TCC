import { useEffect, useState } from "react"
import { Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, ThemeProvider, Typography, createTheme } from "@mui/material"
import { TextField } from "@mui/material"
import { onKeyDownRM } from "../miscellaneous"
import Info from "../../components/Info"
import DevolutionBooksContainer from "./DevolutionBooksContainer"

export default function LibrarianLoan() {
    const [loanOrDevolution, setLoanOrDevolution] = useState(0)
    const [hasRequestedDevolution, setHasRequestedDevolution] = useState(false)
    const [isRequesting, setIsRequesting] = useState(false)
    const [formData, setFormData] = useState({
        code: 0,
        title: "",
        RM: "",
        name: "",
        time: 2
    })

    const books = [
        { code: 1, title: "O Senhor dos Anéis: A Sociedade do Anel" },
        { code: 2, title: "O Senhor dos Anéis: As Duas Torres" },
        { code: 3, title: "O Senhor dos Anéis: O Retorno do Rei" },
        { code: 4, title: "O Hobbit" },
        { code: 5, title: "Guia do Mochileiro das Galáxias" },
        { code: 6, title: "Animal Farm" },
        { code: 7, title: "1984" },
        { code: 8, title: "Fahrenheit 451" },
        { code: 9, title: "O Alquimista" },
        { code: 10, title: "O Pequeno Príncipe" },
    ];

    const students = [
        {
            id: 1,
            RM: 123456,
            name: "Fulano A"
        },
        {
            id: 2,
            RM: 654321,
            name: "Fulano B"
        }
    ]

    const bookTitles = books.map(b => b.title)

    const devolutionBooks = [
        {
            code: 1,
            title: "O Pequeno Príncipe",
            author: "Antoine de Saint-Exupéry",
            loanDate: "14/02/24",
            loanPeriod: "15",
            situation: "Atrasado"
        }
    ]

    function searchForBookByCode(code) {
        if (!code) return

        let hasFoundTheBook = false

        books.forEach(book => {
            if (book.code == code) {
                setFormData({ ...formData, title: book.title, code: book.code })
                hasFoundTheBook = true
            }
        })

        if (!hasFoundTheBook) setFormData({ ...formData, title: "" })


    }

    function searchForStudentByRM(RM) {
        if (RM.length < 6) return

        students.forEach(student => {
            if (student.RM == RM) setFormData({ ...formData, name: student.name })
        });
    }

    function handleLoan(e) {
        e.preventDefault()
        //API: post empréstimo

    }

    function handleDevolution(e) {
        e.preventDefault()

        setHasRequestedDevolution(true)
        setIsRequesting(true)

        setTimeout( () => {
            setIsRequesting(false)
        },1000)
    }

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Figtree',
            ].join(','),
        },


    });


    function loanContent() {
        return (
            <>


                <p className="p-hint">
                    Identifique o livro por
                </p>

                <form onSubmit={handleLoan}>

                    <span class="flex gap-7 w-full items-center">
                        <label className="input-label w-[5rem]">
                            Código
                        </label>

                        <TextField
                            value={formData.code}
                            onBlur={() => searchForBookByCode(formData.code)}
                            onChange={e => setFormData({ ...formData, code: e.target.value })}
                            placeholder="Código"
                            focused
                            required
                            className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                        />

                        {/* <input placeholder="Código"
                            value={formData.code} onBlur={() => searchForBookByCode(formData.code)} onChange={e => setFormData({ ...formData, code: e.target.value })}
                            className="bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[40rem] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400" /> */}
                    </span>



                    <p className="p-hint">
                        ou por
                    </p>

                    <span class="flex gap-7 w-full items-center justify-start my-3">
                        <label className="input-label w-[5rem]">
                            Título
                        </label>

                        <Autocomplete

                            value={formData.title}
                            onChange={(event, newValue) => {
                                if (!newValue) return

                                setFormData({ ...formData, title: newValue });
                                books.forEach(book => {
                                    if (book.title == newValue) setFormData({ ...formData, code: book.code, title: book.title })
                                });
                            }}
                            id="controllable-states-demo"
                            options={bookTitles}
                            size="sm"
                            required
                            sx={{ width: 650 }}
                            renderInput={(params) => <TextField {...params}
                                className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                            />}

                        />




                    </span>

                    <hr />

                    <p className="p-hint">
                        Identifique o aluno
                    </p>

                    <div className="flex flex-nowrap justify-between gap-5">
                        <div>
                            <span class="flex gap-7 w-full items-center justify-start my-3">
                                <label className="input-label w-[5rem]">
                                    RM
                                </label>

                                <TextField
                                    placeholder="RM"
                                    value={formData.RM}
                                    inputProps={{ maxLength: 6 }}
                                    onBlur={() => searchForStudentByRM(formData.RM)}
                                    onKeyDown={(e) => {
                                        onKeyDownRM(e)
                                    }} onChange={e => {
                                        setFormData({ ...formData, RM: e.target.value })
                                    }}
                                    required
                                    style={{ width: 200 }}
                                    className="bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete"

                                />
                            </span>
                            <span class="flex gap-7 w-full items-center justify-between my-3">
                                <label className="input-label w-[5rem]">
                                    Nome
                                </label>
                                <TextField
                                    placeholder="Nome"
                                    value={formData.name} onBlur={() => searchForBookByCode(formData.name)} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    readOnly
                                    disabled
                                    multiline
                                    required
                                    style={{ width: 300 }}
                                    rows={2}
                                    className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'

                                />
                            </span>
                        </div>
                        <div className="flex items-center gap-3 m-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#62AD47" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                            </svg>

                            <div className="flex flex-col">
                                <p className="text-[#62AD47] text-base">
                                    Bibliotecário(a),
                                </p>
                                <h3 className="text-[#62AD47] font-bold text-lg">
                                    Exija a comprovação do aluno! <br />
                                    (Carteirinha ou Identidade)
                                </h3>

                            </div>
                        </div>
                    </div>

                    <hr />

                    <span class="flex gap-7 w-full items-center justify-start my-3">

                        <FormControl><div class="flex">

                            <label className="input-label pr-3 w-[8rem]">
                                Prazo
                            </label>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            >
                                <FormControlLabel value="2" control={<Radio />} label="2 semanas" />
                                <FormControlLabel value="3" control={<Radio />} label="3 semanas" />

                            </RadioGroup></div>
                        </FormControl>


                    </span>

                    <button className="button no-wrap align-center w-full py-2 px-4 rounded text-lg" type="submit" onSubmit={(e) => handleLoan(e)}>
                        Registrar empréstimo
                    </button>
                </form>

            </>
        )

    }

    function devolutionContent() {
        return (
            <>


                <hr />

                <p className="p-hint">
                    Identifique o aluno
                </p>


                <form onSubmit={(e) => handleDevolution(e)}>
                    <div className="flex flex-nowrap justify-between gap-5">
                        <div>
                            <span class="flex gap-7 w-full items-center justify-start my-3">
                                <label className="input-label w-[5rem]">
                                    RM
                                </label>

                                <TextField
                                    placeholder="RM"
                                    value={formData.RM}
                                    inputProps={{ maxLength: 6 }}
                                    onBlur={() => searchForStudentByRM(formData.RM)}
                                    onKeyDown={(e) => {
                                        onKeyDownRM(e)
                                    }} onChange={e => {
                                        setFormData({ ...formData, RM: e.target.value })
                                    }}
                                    required
                                    style={{ width: 200 }}
                                    className="bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete"

                                />
                            </span>
                            <span class="flex gap-7 w-full items-center justify-between my-3">
                                <label className="input-label w-[5rem]">
                                    Nome
                                </label>
                                <TextField
                                    placeholder="Nome"
                                    value={formData.name} onBlur={() => searchForBookByCode(formData.name)} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    readOnly
                                    disabled
                                    multiline
                                    required
                                    style={{ width: 300 }}
                                    rows={2}
                                    className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'

                                />
                            </span>
                        </div>
                        <div className="flex items-center gap-3 m-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#62AD47" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                            </svg>

                            <div className="flex flex-col">
                                <p className="text-[#62AD47] text-base">
                                    Bibliotecário(a),
                                </p>
                                <h3 className="text-[#62AD47] font-bold text-lg">
                                    Exija a comprovação do aluno! <br />
                                    (Carteirinha ou Identidade)
                                </h3>

                            </div>
                        </div>
                    </div>
                    <button className="button no-wrap align-center w-full py-2 px-4 rounded text-lg" type="submit">
                        Buscar por livros emprestados
                    </button>
                </form>


                {
                    hasRequestedDevolution ? <DevolutionBooksContainer isRequesting={isRequesting} devolutionBooks={devolutionBooks} /> : ""
                }

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn" onClick={() => document.getElementById('modal_success').showModal()}>open modal</button>
                <dialog id="modal_success" className="modal ">
                    <div className="modal-box bg-green-200 flex w-fit gap-12 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0c9115" className="w-32 h-32">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <div>
                            <h3 className="font-bold text-3xl ">Jão!</h3>
                            <p className="py-4">Devolução realizada!</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Fechar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>

                <button className="btn" onClick={() => document.getElementById('modal_error').showModal()}>open modal</button>
                <dialog id="modal_error" className="modal ">
                    <div className="modal-box bg-red-300 flex w-fit gap-12 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#EF4444" className="w-32 h-32">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>

                        <div>
                            <h3 className="font-bold text-3xl text-slate-50">Jão!</h3>
                            <p className="py-4 text-slate-50">Devolução realizada!</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Fechar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>


            </>

        )
    }

    return (
        <section>
            <ThemeProvider theme={theme}>

                <h1 className="pb-5 text-3xl">
                    {loanOrDevolution == 0 ? "📘 Empréstimo" : "🔄 Devolução"} de livro
                </h1>

                <div class="flex mb-3">
                    <button className={`button button-loan${loanOrDevolution == 0 ? "--active" : ""} no-wrap items-center flex gap-3 align-center mx-2 w-fit py-2 px-4 rounded text-lg`} onClick={() => setLoanOrDevolution(0)}>
                        Empréstimo
                    </button>
                    <button className={`button button-loan${loanOrDevolution == 1 ? "--active" : ""} no-wrap items-center flex gap-3 align-center mx-2 w-fit py-2 px-4 rounded text-lg`} onClick={() => setLoanOrDevolution(1)}>
                        Devolução
                    </button>
                </div>

                {
                    loanOrDevolution == 0 ? loanContent() : devolutionContent()
                }

            </ThemeProvider>





        </section>
    )
}