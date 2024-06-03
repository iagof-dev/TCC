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
    const [hasRequestedAdd, setHasRequestedAdd] = useState(false)
    const [isRequesting, setIsRequesting] = useState(false)
    const [selectedCoverID, setSelectedCoverID] = useState(0)

    const [dataWithId, setDataWithId] = useState()


    const [allGenres, setAllGenres] = useState(["a", "b"])
    const [allAuthors, setAllAuthors] = useState([""])

    const [allPublishers, setAllPublishers] = useState([""])

    const [sinopse, setSinopse] = useState("")

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
        sinopse: ""
    })

    function addBook(e) {
        e.preventDefault()
        setIsRequesting(true)
    }

    const bookCovers = [
        {
            cover_url: "https://marketplace.canva.com/EAD0UPCkitY/1/0/1024w/canva-capa-de-livro-de-suspense-monocrom%C3%A1tica-com-foto-de-floresta-U1dpnJ3bwKw.jpg"
        }, {
            cover_url: "https://static.wixstatic.com/media/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg/v1/fill/w_480,h_768,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg"
        }, {
            cover_url: "https://martinsfontespaulista.vteximg.com.br/arquivos/ids/1544022-400-400/1043085.jpg?v=638163248182070000"
        }
    ]

    async function handleBookAddModal(e) {
        e.preventDefault()
        document.getElementById('bookCoverSelectionModal').showModal()
        // const synopsisResponse = await (await Api.generateSynopsis({titulo: formData.titulo, autor: formData.autor})).json()
        // console.log(synopsisResponse);
        // setFormData({...formData, sinopse: synopsisResponse.message})

        // console.log(synopsisResponse.message);
    }
    

    useEffect(() => {

        (async () => {
            const genres = await Api.genres.getAllGenres()
            const authors = await Api.authors.getAllAuthors()
            const publishers = await Api.publishers.getAllPublishers()

            console.log(publishers);

            setAllGenres(genres.map(g => g.genero))
            setAllAuthors(authors.map(a => a.autor))
            setAllPublishers(publishers.map(p => p.editora))

            setDataWithId({genres: genres, authors, authors, publishers: publishers})

        })()


    }, [])

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

                                console.log(newValue);

                                setFormData({ ...formData, autor: {...formData.autor, autor: newValue} });

                                let id = dataWithId.authors.findIndex(a => a.autor == newValue)
                                let autorId = -1

                                if(id != -1) autorId = dataWithId.authors[id].id

                                console.log(autorId);

                                setFormData({ ...formData, autor: {...formData.autor, autor: newValue, id: autorId}})

                                console.log("____________________________________________")
                                console.log(dataWithId.authors);
                                console.log(formData);


                            }}
                            onBlur={(e) => {
                                
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

                                setFormData({ ...formData, editora: {...formData.editora.editora, editora: newValue} });
                            }}
                            onBlur={(e) => {
                                setFormData({ ...formData, editora: {...formData.editora.editora, editora: e.target.value}  })
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
                            onChange={(event, values) => {
                                allGenres.forEach(g => {

                                })
                                setFormData({ ...formData, generos: {...formData.generos, generos: values} })}
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
                            focused
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
                                    bookCovers.map((b, i) => {
                                        return <CoverOption id={i}
                                            coverURL={b.cover_url}
                                            selectedCoverID={selectedCoverID} setSelectedCoverID={setSelectedCoverID} />
                                    })
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
                                                focused
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
                                                value={formData.autor}
                                                onChange={(event, newValue) => {
                                                    if (!newValue) return
                                                    setFormData({ ...formData, autor: newValue });
                                                }}
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
                                             value={formData.generos}
                                             // options={["Nutrição"]}
                                             // onChange={(event, values) => setSelectedCategories(values)}
                                             freeSolo
                                             disabled
                                             sx={{ width: 450 }}
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
                                                Sinopse (gerada por IA)
                                            </label>

                                            {
                                                formData.sinopse.length > 2? <TextField
                                                value={formData.sinopse}
                                                onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                                                placeholder="Título"
                                                style={{ width: 450 }}
                                                focused
                                                disabled
                                                multiline
                                                rows={4}
                                                required
                                                className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                                            /> : <span className="loading loading-spinner loading-lg"></span>
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
                                                focused
                                                className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                                            /></span>

                                    </div>
                                </div>
                                <div className="w-[18rem] h-[28rem] relative">
                                    <img className="rounded-2xl h-[100%] object-top bg-cover duration-500" src={bookCovers[selectedCoverID].cover_url} />
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



            </ThemeProvider>
        </>
    )
}