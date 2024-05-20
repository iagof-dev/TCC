import { TextField, ThemeProvider, createTheme } from "@mui/material"
import { useState } from "react";



const theme = createTheme({
    typography: {
        fontFamily: [
            'Figtree',
        ].join(','),
    },


});

export default function LibrarianAdd() {

    const [formData, setFormData] = useState({
        titulo: "",
        autor: "",
        editora: "",
        url_capa: "",
        codigo: "",
        generos_cursos: "",
        volumes: "",
        sinopse: ""
    })

    return (
        <>
            <ThemeProvider theme={theme}>

                <h1 className="pb-5 text-3xl">
                    Adicionar livro ao sistema
                </h1>

                <span class="flex gap-7 w-full items-center">
                    <label className="input-label w-[5rem]">
                        Código
                    </label>

                    <TextField
                        value={formData.codigo}
                        // onBlur={() => searchForBookByCode(formData.codigo)}
                        onChange={e => setFormData({ ...formData, codigo: e.target.value })}
                        placeholder="Código"
                        focused
                        required
                        className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                    />

                </span>

            </ThemeProvider>
        </>
    )
}