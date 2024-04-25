import { useState } from "react"
import { Autocomplete } from "@mui/material"
import { TextField } from "@mui/material"

export default function LibrarianLoan() {
    const [loanOrDevolution, setLoanOrDevolution] = useState(0)
    const [formData, setFormData] = useState({
        code: 0,
        title: "",
        studentIdentification: "",
        name: "",
        time: 0
    })

    const books = [
        { codigo: 1, titulo: "O Senhor dos Anéis: A Sociedade do Anel" },
        { codigo: 2, titulo: "O Senhor dos Anéis: As Duas Torres" },
        { codigo: 3, titulo: "O Senhor dos Anéis: O Retorno do Rei" },
        { codigo: 4, titulo: "O Hobbit" },
        { codigo: 5, titulo: "Guia do Mochileiro das Galáxias" },
        { codigo: 6, titulo: "Animal Farm" },
        { codigo: 7, titulo: "1984" },
        { codigo: 8, titulo: "Fahrenheit 451" },
        { codigo: 9, titulo: "O Alquimista" },
        { codigo: 10, titulo: "O Pequeno Príncipe" },
      ];

    const bookTitles = [
        books.map(b => b.titulo)
    ]
      

    console.log(bookTitles);


    return (
        <section>
            <h1 className="pb-5 text-3xl">
                {loanOrDevolution == 0 ? "Empréstimo" : "Devolução"} de livro
            </h1>

            <div class="flex">
                <button className={`button button-loan${loanOrDevolution == 0 ? "--active" : ""} no-wrap items-center flex gap-3 align-center mx-2 w-fit py-2 px-4 rounded text-lg`} onClick={() => setLoanOrDevolution(0)}>
                    Empréstimo
                </button>
                <button className={`button button-loan${loanOrDevolution == 1 ? "--active" : ""} no-wrap items-center flex gap-3 align-center mx-2 w-fit py-2 px-4 rounded text-lg`} onClick={() => setLoanOrDevolution(1)}>
                    Devolução
                </button>
            </div>

            <hr className="mt-4" />

            <p className="p-hint">
                Identifique o livro por
            </p>

            <span class="flex gap-7 w-full items-center">
                <label className="input-label">
                    Código
                </label>
                <input placeholder="Código" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-[30rem] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400" />
            </span>

            <p className="p-hint">
                ou por
            </p>

            <span class="flex gap-7 w-full items-center">
                <label className="input-label">
                    Título
                </label>
                <Autocomplete
                    value={formData.title}
                    onChange={(event, newValue) => {
                        setFormData({...formData, title: newValue});
                    }}
                    id="controllable-states-demo"
                    options={bookTitles}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Controllable" />}
                />
            </span>



        </section>
    )
}