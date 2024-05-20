import { Autocomplete, Chip, TextField, ThemeProvider, createTheme } from "@mui/material"
import { useState } from "react";
import { onKeyDownRM } from "../miscellaneous";

                    // SELECT q.texto, a.alternativa from questao as q inner join alternativa as a on a.id_questao = q.id_questao
                    // questaoEAlternativa [1 a,
                    // 1 b,
                    //,
                    //...,
                    //,
                    // 1 e]
                    //

                    const questaoEAlternativa = [
                        {questao: "01", alternativa: "A - iadsnvjks"},
                        {questao: "01", alternativa: "B - iadsnvjks"},
                        {questao: "01", alternativa: "C - iadsnvjks"},

                        {questao: "02 ", alternativa: "A - iadsnvjks"},
                        {questao: "02", alternativa: "B - iadsnvjks"},
                        {questao: "02", alternativa: "C - iadsnvjks"},
                    ]

                    let questoes = [
                        {
                            questao: "01",

                            alternativas: [
                                "A - iadsnvjks",
                                "B - iadsnvjks",
                                "C - iadsnvjks"
                            ]
                        }
                    ]

                    questoes = Object.groupBy()

                    questaoEAlternativa.forEach(qe => {
                        if(!questoes.includes(qe.questao)){
                            questoes.push({
                                questao: qe.questao
                            })
                        }
                    });



                    


const theme = createTheme({
    typography: {
        fontFamily: [
            'Figtree',
        ].join(','),
    },


});

function handleBookAdd(){

}

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

                <form className="flex flex-col gap-4">
                    <span class="flex gap-7 w-full items-center">
                        <label className="input-label w-[7rem]">
                            Título
                        </label>

                        <TextField
                            value={formData.titulo}
                            onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                            placeholder="Título"
                            style={{ width: 550 }}
                            focused
                            required
                            className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                        />

                    </span>

                    <span class="flex gap-7 w-full items-center">
                        <label className="input-label w-[7rem]">
                            Autor
                        </label>

                        <Autocomplete

                            value={formData.autor}
                            onChange={(event, newValue) => {
                                if (!newValue) return

                                setFormData({ ...formData, autor: newValue });
                            }}
                            options={["Machado de Assis"]}
                            id="controllable-states-demo"
                            size="sm"
                            required
                            fullWidth
                            placeholder="Autor"
                            sx={{ width: 550 }}
                            renderInput={(params) => <TextField  {...params}
                                className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                            />}

                        />

                    </span>

                        <span class="flex gap-7 w-full items-center">
                            <label className="input-label w-[7rem]">
                                Editora
                            </label>
                            <Autocomplete

                                value={formData.editora}
                                onChange={(event, newValue) => {
                                    if (!newValue) return

                                    setFormData({ ...formData, editora: newValue });
                                }}
                                options={["Panini", "Companhia das Letras"]}
                                id="controllable-states-demo"
                                size="sm"
                                required
                                sx={{ width: 550 }}
                                renderInput={(params) => <TextField {...params}
                                    className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                                />}

                            />
                        </span>
                        

                    <span class="flex gap-12 w-full items-center">
                        <label className="input-label w-[7rem]">
                            Gêneros e cursos
                        </label>

                        <Autocomplete
                            multiple
                            id="tags-filled"
                            fullWidth
                            options={["Nutrição"]}
                            // onChange={(event, values) => setSelectedCategories(values)}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip variant="outlined" className='text-lg' label={option} {...getTagProps({ index })} />

                                ))
                            }
                            renderInput={(params) => <TextField {...params}
                                className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                            />}
                        />
                    </span>


                    <span class="flex gap-7 w-full items-center">
                        <label className="input-label w-[7rem]">
                            Número de volumes
                        </label>

                        <TextField
                            placeholder="0"
                            value={formData.volumes}
                            onKeyDown={(e) => {
                                if (Number.isInteger(e)) return e
                            }}
                            onChange={e => {
                                if (e.target.value.match(/[^0-9]/)){
                                    e.preventDefault();
                                    return
                                } 

                                setFormData({ ...formData, volumes: e.target.value })
                                

                            }}
                            required
                            inputProps={{ inputMode: 'numeric' }}
                            style={{ width: 100 }}
                            className="bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete"

                        />
                    </span>


                    

                            <label className="input-label w-[10rem]">
                                Código <p className="text-sm font-bold">(se o livro já tiver)</p>
                            </label>
                            <TextField
                                value={formData.codigo}
                                // onBlur={() => searchForBookByCode(formData.codigo)}
                                onChange={e => setFormData({ ...formData, codigo: e.target.value })}
                                placeholder="Código"
                                focused

                                className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                            />



                    <button className="button no-wrap align-center w-full py-2 px-4 rounded text-lg" type="submit" onSubmit={(e) => handleBookAdd(e)}>
                        Adicionar livro
                    </button>

                </form>



            </ThemeProvider>
        </>
    )
}