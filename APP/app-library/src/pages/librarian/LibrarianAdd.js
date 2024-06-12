import { Autocomplete, Chip, TextField, ThemeProvider, createTheme } from "@mui/material"
import { useEffect, useState } from "react";
import { onKeyDownRM } from "../miscellaneous";
import BlankBookCover from '../../assets/img/book-cover.png'
import CoverOption from "../../components/CoverOption";
import { Api } from "../../api";
import { Textarea } from "@material-tailwind/react";

const theme = createTheme({
    typography: {
        fontFamily: [
            'Figtree',
        ].join(','),
    },


});




function searchBookWithExistingCode(code) {
    //TODO
}

export default function LibrarianAdd() {
    const [isRequesting, setIsRequesting] = useState(false)
    const [selectedCoverURL, setselectedCoverURL] = useState(0)

    const [coverURLs, setCoverURLs] = useState([])

    const [dataWithId, setDataWithId] = useState()


    const [allGenres, setAllGenres] = useState(["a", "b"])
    const [allAuthors, setAllAuthors] = useState([""])
    const [allCodes, setAllCodes] = useState([""])

    const [allPublishers, setAllPublishers] = useState([""])

    const [formData, setFormData] = useState({
        titulo: "",
        autor: {
            id: "",
            autor: ""
        },
        editora: {
            id: "",
            editora: ""
        },
        url_capa: "",
        codigo: "",
        generos: {
            ids: [],
            generos: []
        },
        volumes: "",
        sinopse: "ab"
    })

    let requestedCoverSelectionWithTheseValues = false

    const [formDataTempValues, setFormDataTempValues] = useState()

    async function addBook(e) {
        e.preventDefault()
        setIsRequesting(true)
        console.log(formData);

        await Api.books.addNewBook(formData)


        document.getElementById("modalAddSuccess").showModal()
    }


    async function handleBookAddModal(e) {
        e.preventDefault()


        document.getElementById('bookCoverSelectionModal').showModal()

        if(requestedCoverSelectionWithTheseValues) return

        requestedCoverSelectionWithTheseValues = true

        const urls = await Api.getCoverURLs({ title: formData.titulo })
        setCoverURLs(urls.message.imagens)


        const uniqueCode = generateUniqueCodeAndCheck();
        setFormData({...formData, codigo: uniqueCode})

        const synopsisResponse = await (await Api.generateSynopsis({ titulo: formData.titulo, autor: formData.autor })).json()
        console.log(synopsisResponse);
         
        setFormData({ ...formData, sinopse: synopsisResponse? synopsisResponse.message : "Não foi possível gerar a sinopse." })

        console.log(synopsisResponse.message);
    }


    function generateUniqueCode() {
        const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numeric = "0123456789";

        let code = "";

        // Generate the alphabetic part
        for (let i = 0; i < 3; i++) {
            code += alpha[Math.floor(Math.random() * alpha.length)];
        }

        // Generate the numeric part
        for (let i = 0; i < 4; i++) {
            code += numeric[Math.floor(Math.random() * numeric.length)];
        }

        return code;
    }

    function checkCodeUniqueness(code) {
        // Simulate checking against a database or API
        // Replace this with your actual checking logic
        const existingCodes = ["AAA-1234", "BBB-5678", "CCC-9012"];
        return !existingCodes.includes(code);
    }

    function generateUniqueCodeAndCheck() {
        let code;
        do {
            code = generateUniqueCode();
        } while (!checkCodeUniqueness(code));

        return code;
    }

    useEffect(() => {

        (async () => {
            const genres = await Api.genres.getAllGenres()
            const authors = await Api.authors.getAllAuthors()
            const publishers = await Api.publishers.getAllPublishers()

            setAllGenres(genres.map(g => g.genero))
            setAllAuthors(authors.map(a => a.autor))
            setAllPublishers(publishers.map(p => p.editora))

            setDataWithId({ genres: genres, authors, authors, publishers: publishers })

            const res = await Api.books.addNewBook()

        })()


    }, [])

    useEffect(() => {
        requestedCoverSelectionWithTheseValues = false
    }, [formData])

    return (
        <>
            <ThemeProvider theme={theme}>

                <h1 className="text-3xl">
                    Adicionar livro ao sistema

                </h1>
                <p className="text-[1rem] text-gray-500 mb-4">
                    Caso não haja autor ou editora preexistentes, preencha os campos <br /> normalmente pois esses dados também serão adicionados no sistema.
                </p>

                <form className="flex flex-col gap-4" onSubmit={async (e) => await handleBookAddModal(e)}>
                    <span class="flex gap-7 w-full items-center">
                        <label className="input-label w-[7rem]">
                            Título
                        </label>

                        <TextField
                            placeholder="Título"
                            value={formData.titulo}
                            onChange={e => {
                                setFormData({ ...formData, titulo: e.target.value })
                                setFormDataTempValues()
                            }}
                            required
                            style={{ width: 550 }}
                            className="bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete"

                        />

                    </span>

                    <span class="flex gap-7 w-full items-center">
                        <label className="input-label w-[7rem]">
                            Autor
                        </label>

                        <Autocomplete

                            value={formData.autor.autor}
                            onChange={(event, newValue) => {
                                if (!newValue) return

                                setFormData({ ...formData, autor: { ...formData.autor, autor: newValue } });


                                let id = dataWithId.authors.findIndex(a => a.autor == newValue)
                                let autorId = -1

                                if (id != -1) autorId = dataWithId.authors[id].id

                                setFormData({ ...formData, autor: { ...formData.autor, autor: newValue, id: autorId } })


                            }}
                            onBlur={(e) => {
                                if (allAuthors.includes(e.target.value)) return setFormData({ ...formData, autor: { ...formData.autor, autor: e.target.value } })

                                setFormData({ ...formData, autor: { ...formData.autor, autor: e.target.value, id: -1 } })
                            }}
                            options={allAuthors}
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

                            value={formData.editora.editora}
                            onChange={(event, newValue) => {
                                if (!newValue) return

                                setFormData({ ...formData, editora: { ...formData.editora, editora: newValue } });


                                let id = dataWithId.publishers.findIndex(a => a.editora == newValue)
                                let editoraId = -1

                                if (id != -1) editoraId = dataWithId.publishers[id].id


                                setFormData({ ...formData, editora: { ...formData.editora, editora: newValue, id: editoraId } });

                            }}
                            onBlur={(e) => {
                                console.log(e.target.value);

                                if (allPublishers.includes(e.target.value)) return setFormData({ ...formData, editora: { ...formData.editora, editora: e.target.value } });

                                setFormData({ ...formData, editora: { ...formData.editora, editora: e.target.value, id: -1 } });

                                console.log(formData.editora);
                            }}
                            options={allPublishers}
                            id="controllable-states-demo"
                            size="sm"
                            required
                            sx={{ width: 550 }}
                            renderInput={(params) => <TextField {...params}
                                className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                            />}

                        />
                    </span>


                    <span class="flex gap-7 w-full items-center">
                        <label className="input-label w-[7rem]">
                            Gêneros e cursos
                        </label>



                        <Autocomplete
                            multiple
                            id="tags-filled"
                            fullWidth
                            // value={formData.generos}
                            options={allGenres}
                            freeSolo
                            onChange={(event, generos) => {
                                let chosenGenres = []
                                generos.forEach(g => {

                                    chosenGenres.push(g)

                                    setFormData({ ...formData, generos: chosenGenres });

                                    let id = dataWithId.genres.findIndex(a => a.genero == g)

                                    console.log(`id genero no dataWithId : ${id}`);

                                    let generoId = -1

                                    if (id != -1) generoId = dataWithId.genres[id].id

                                    console.log(generoId);

                                    setFormData({ ...formData, generos: chosenGenres });

                                })
                                setFormData({ ...formData, generos: { ...formData.generos, generos: generos } })
                            }
                            }
                            sx={{ width: 550 }}
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
                                if (e.target.value.match(/[^0-9]/)) {
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
                        <label className="input-label w-[10rem]">
                            Código <p className="text-sm font-bold">(se o livro já tiver)</p>
                        </label>
                        <TextField
                            value={formData.codigo}
                            onBlur={() => searchBookWithExistingCode(formData.codigo)}
                            onChange={e => setFormData({ ...formData, codigo: e.target.value })}
                            placeholder="Código"
                            style={{ width: 230 }}

                            className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                        />
                    </span>

                    <button className="button no-wrap align-center w-full py-2 px-4 rounded text-lg" type="submit">

                        {isRequesting ?
                            <span className="loading m-auto loading-spinner loading-lg"></span>
                            :
                            "Adicionar livro"
                        }
                    </button>

                </form>

                <dialog id="bookCoverSelectionModal" className="modal">
                    <div className="modal-box bg-[#F8F8F8] flex w-fit max-w-none gap-12 items-center">
                        <div className=" w-fit">
                            <h3 className="font-bold text-3xl">Escolha de Capa do Livro</h3>
                            <p className="py-4">Escolha a capa do livro entre as opções.<br />Caso não haja, escolha a última (capa padrão) ou deixe em branco.</p>
                            <div className="flex gap-4">

                                {
                                    coverURLs.length > 1 ? (


                                        coverURLs.map((b, i) => {
                                            console.log(b)
                                            return <CoverOption id={i}
                                                coverURL={b}
                                                selectedCoverURL={selectedCoverURL} setselectedCoverURL={setselectedCoverURL} />
                                        }))
                                        : <span className="loading loading-spinner loading-lg"></span>

                                }
                            </div>
                            <div>


                            </div>
                            <div className="modal-action">
                                <form method="dialog">
                                    <div className=" flex no-wrap gap-4">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button onClick={(e) => {
                                            document.getElementById('bookConfirmationModal').showModal()

                                            console.log(`url: ${selectedCoverURL}`);

                                        }} className="btn button button-search no-wrap items-center flex gap-3 align-center py-2 px-4 rounded-xl text-lg">Confirmar</button>
                                        <button className="btn">Fechar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>

                <dialog id="bookConfirmationModal" className="modal">
                    <div className="modal-box bg-[#F8F8F8] flex w-[60rem] max-w-none gap-12 items-center">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#EF4444" className="w-32 h-32">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg> */}

                        <div className=" w-full">
                            <div className="flex gap-3 justify-between">
                                <div>

                                    <h3 className="font-bold text-3xl">Confirmar adição de livro</h3>
                                    <p className="py-4 text-md">Confirme se as informaçoes do livro estão corretas.</p>
                                    <div class="flex flex-col gap-4">
                                        <span class="flex gap-7 w-full items-center">
                                            <label className="input-label w-[7rem]">
                                                Título
                                            </label>
                                            <TextField
                                                value={formData.titulo}
                                                onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                                                placeholder="Título"
                                                style={{ width: 450 }}
                                                disabled
                                                required
                                                className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                                            />
                                        </span>
                                        <span class="flex gap-7 w-full items-center">
                                            <label className="input-label w-[7rem]">
                                                Autor
                                            </label>
                                            <Autocomplete
                                                value={formData.autor.autor}

                                                options={["Machado de Assis"]}
                                                id="controllable-states-demo"
                                                size="sm"
                                                disabled
                                                required
                                                fullWidth
                                                placeholder="Autor"
                                                sx={{ width: 450 }}
                                                renderInput={(params) => <TextField  {...params}
                                                    className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                                                />}
                                            />
                                        </span>
                                        <span class="flex gap-7 w-full items-center">
                                            <label className="input-label w-[7rem]">
                                                Editora
                                            </label>
                                            <TextField

                                                value={formData.editora.editora}
                                                id="controllable-states-demo"
                                                size="sm"
                                                required
                                                disabled
                                                sx={{ width: 450 }}
                                                renderInput={(params) => <TextField {...params}
                                                    className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                                                />}

                                            />
                                        </span>
                                        <span class="flex gap-12 w-full items-center">
                                            <label className="input-label w-[5.8rem]">
                                                Gêneros e cursos
                                            </label>


                                            <Autocomplete
                                                multiple
                                                id="tags-filled"
                                                fullWidth
                                                value={formData.generos.generos}
                                                // options={["Nutrição"]}
                                                // onChange={(event, values) => setSelectedCategories(values)}
                                                freeSolo
                                                disabled
                                                sx={{ width: 450 }}
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => (
                                                        <Chip variant="outlined" className='text-lg' label={option} />

                                                    ))
                                                }
                                                renderInput={(params) => <TextField {...params}
                                                    className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                                                />}
                                            />

                                        </span>

                                        <span class="flex gap-7 w-full items-center">
                                            <label className="input-label w-[7rem]">
                                                Sinopse (gerada por IA)
                                            </label>

                                            {

                                                formData.sinopse.length > 2 ? <TextField
                                                    value={formData.sinopse}
                                                    onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                                                    placeholder="Título"
                                                    style={{ width: 450 }}

                                                    disabled
                                                    multiline
                                                    rows={4}
                                                    required
                                                    className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                                                /> :
                                                    <span className="loading loading-spinner loading-lg"></span>
                                            }







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
                                                    if (e.target.value.match(/[^0-9]/)) {
                                                        e.preventDefault();
                                                        return
                                                    }

                                                    setFormData({ ...formData, volumes: e.target.value })


                                                }}
                                                disabled
                                                required
                                                inputProps={{ inputMode: 'numeric' }}
                                                style={{ width: 100 }}
                                                className="bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete"

                                            />

                                        </span>

                                        <span class="flex gap-7 w-full items-center">
                                            <label className="input-label w-[7rem]">
                                                Código <p className="text-sm font-bold">(gerado)</p>
                                            </label>
                                            <TextField
                                                value={formData.codigo}
                                                onBlur={() => searchBookWithExistingCode(formData.codigo)}
                                                onChange={e => setFormData({ ...formData, codigo: e.target.value })}
                                                placeholder="Código"
                                                style={{ width: 230 }}
                                                disabled

                                                className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                                            /></span>

                                    </div>
                                </div>
                                <div className="w-[18rem] h-[28rem] relative">
                                    <img className="rounded-2xl h-[100%] object-top bg-cover duration-500" src={coverURLs[selectedCoverURL]} />
                                </div>

                            </div>
                            <div className="modal-action">
                                <form method="dialog">
                                    <div className=" flex no-wrap gap-4">
                                        <button onClick={(e) => {

                                            addBook(e)
                                        }} className="btn button button-search no-wrap items-center flex gap-3 align-center py-2 px-4 rounded-xl text-lg">

                                            {isRequesting ?
                                                <span className="loading loading-spinner loading-lg"></span>
                                                :
                                                "Confirmar"
                                            }


                                        </button>
                                        <button onClick={e => setIsRequesting(false)} className="btn" >Voltar e editar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>

                <dialog id="modalAddSuccess" className="modal">
                    <div className="modal-box bg-green-200 flex w-fit gap-12 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0c9115" className="w-32 h-32">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <div>
                            <h3 className="font-bold text-3xl ">Sucesso!</h3>
                            <p className="py-4">Livro adicionado ao sistema!</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Fechar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>



            </ThemeProvider>
        </>
    )
}