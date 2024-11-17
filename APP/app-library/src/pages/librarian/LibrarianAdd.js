import { Autocomplete, Chip, TextField, ThemeProvider, createTheme } from "@mui/material"
import { useEffect, useState } from "react";
import { onKeyDownRM, sortStrings } from "../miscellaneous";
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

    const [allPublishers, setAllPublishers] = useState([""])

    const [existingCodes, setExistingCodes] = useState([])

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

    const [requestedCoverSelectionWithTheseValues, setRequestedCoverSelectionWithTheseValues] = useState(false)

    const [tempGenres, setTempGenres] = useState([])

    useEffect(() => {
        setFormData({ ...formData, url_capa: coverURLs[selectedCoverURL] })
    }, [selectedCoverURL])

    async function addBook(e) {
        e.preventDefault()
        setIsRequesting(true)

        let isNewAuthor = false
        let isNewPublisher = false

        let newAuthorId = 0
        let newPublisherId = 0

        if (formData.autor.id == -1) {

            if (allAuthors.find(a => a == formData.autor.autor)) return

            isNewAuthor = true

        }

        if (formData.editora.id == -1) {

            isNewPublisher = true


        }

        //isNewAuthor

        let idGenerosASeremAdicionados = 0

        if (formData.generos.length > 0) {
            idGenerosASeremAdicionados = formData.generos.map(g => g.id)
        }

        (async () => {
            if (isNewAuthor) {
                await Api.authors.addAuthor(formData.autor)
                const newAuthors = await Api.authors.getAllAuthors()

                const postedAuthor = newAuthors.find(a => a.nome == formData.autor.autor)

                setFormData({ ...formData, autor: { ...formData.autor, id: postedAuthor.id } })
                newAuthorId = postedAuthor.id
            }

            if (isNewPublisher) {

                await Api.publishers.addPublisher(formData.editora.editora)

                await Api.publishers.getAllPublishers().then(nps => {
                    const newPublisher = nps.find(p => p.editora == formData.editora.editora)


                    console.log(nps);
                    console.log(newPublisher);

                    setFormData({ ...formData, editora: { ...formData.editora, id: newPublisher.id } })
                    newPublisherId = newPublisher.id
                })


            }

            let newFormData = formData

            newFormData.autor.id = newAuthorId ? newAuthorId : newFormData.autor.id
            newFormData.editora.id = newPublisherId ? newPublisherId : newFormData.editora.id
            newFormData.url_capa = newFormData.url_capa ? newFormData.url_capa : coverURLs[selectedCoverURL]

			
            await Api.books.addNewBook(newFormData).then(async () => {
				const allBooks = await Api.books.getAllBooks()

				console.log('====================================');
				console.log(allBooks);
				console.log('====================================');

				const addedBook = allBooks.find(b => b.titulo == formData.titulo)

				if (idGenerosASeremAdicionados.length > 0) idGenerosASeremAdicionados.forEach(async g => {
					

					await Api.books.addNewBookGenre(addedBook.id, g)
				
				});

				// Código antigo — não funciona
				// const addedBook = await Api.books.getBookByCode(formData.codigo)
                // .then((b) => {

				// 	console.log('====================================');
				// 	console.log(b);
				// 	console.log('====================================');

                //     if(b == undefined) return
                //     if (idGenerosASeremAdicionados.length > 0) idGenerosASeremAdicionados.forEach(async g => {
						

				// 		await Api.books.addNewBookGenre(b[0].id, g)
					
                //     });
                // })
			})

            



        })()




        document.getElementById("modalAddSuccess").showModal()

        setTimeout(() => {
            setFormData({
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

            setTempGenres([])

            document.getElementById('bookConfirmationModal').close()
            document.getElementById('modalAddSuccess').close()
            setIsRequesting(false)
        }, 2000)

    }

    async function getCoversAndSynopsis(code) {
        setCoverURLs([])

        setRequestedCoverSelectionWithTheseValues(true)

        await Api.getCoverURLs({ title: formData.titulo, author: formData.autor.autor })
            .then(urls => {
                if (!urls.message) return setCoverURLs(['https://arthursantana-dev.github.io/tcc-img-empty-book/book-cover.png'])
                setCoverURLs(['https://arthursantana-dev.github.io/tcc-img-empty-book/book-cover.png', ...urls.message.imagens])
            })



        await Api.generateSynopsis({ titulo: formData.titulo, autor: formData.autor.autor }).then(res => {
            console.log(res);
            if (res.message) {
                setFormData({ ...formData, codigo: code, sinopse: res.message.length >= 57 ? res.message : '' })
                return
            }

            setFormData({ ...formData, codigo: code, sinopse: "Erro ao gerar sinopse." })

        })

        setRequestedCoverSelectionWithTheseValues(true)

    }


    async function handleBookAddModal(e) {
        e.preventDefault()

        if (((formData.generos.generos && formData.generos.generos.length < 1) || (!formData.generos.generos && formData.generos.length < 1)) ||
            formData.autor.id == '' || formData.editora.id == '') {
            document.getElementById('modalGenreError').showModal()
            return
        }

        document.getElementById('bookCoverSelectionModal').showModal()

        const uniqueCode = generateUniqueCodeAndCheck();

        setFormData({ ...formData, codigo: uniqueCode })

        if (!requestedCoverSelectionWithTheseValues) getCoversAndSynopsis(uniqueCode)

    }


    function generateUniqueCode() {
        const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numeric = "0123456789";

        let code = "";

        for (let i = 0; i < 3; i++) {
            code += alpha[Math.floor(Math.random() * alpha.length)];
        }

        for (let i = 0; i < 4; i++) {
            code += numeric[Math.floor(Math.random() * numeric.length)];
        }

        return code;
    }

    function checkCodeUniqueness(code) {
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
            const existingCodesData = await Api.books.getAllCodes()

			genres.sort((a,b) => sortStrings(a.genero, b.genero))
            authors.sort((a,b) => sortStrings(a.nome, b.nome))
            publishers.sort((a,b) => sortStrings(a.editora, b.editora))
            existingCodesData.sort((a,b) => sortStrings(a.codigo, b.codigo))

            setAllGenres(genres.map(g => g.genero))
            setAllAuthors(authors.map(a => a.nome))
            setAllPublishers(publishers.map(p => p.editora))
            setExistingCodes(existingCodesData.map(c => c.codigo))

            setDataWithId({ genres: genres, authors, authors, publishers: publishers })

			console.log(publishers);
        })()


    }, [])

    useEffect(() => {
        setRequestedCoverSelectionWithTheseValues(false)
    }, [formData.autor])

    return (
        <>
            <ThemeProvider theme={theme}>

                <h1 className="text-3xl">
                    Adicionar livro ao sistema

                </h1>
                <p className="text-[1rem] text-gray-500 mb-4">
                    Caso não haja autor ou editora preexistentes, preencha os campos <br /> normalmente pois esses dados também serão adicionados no sistema.
                </p>

                <form className="flex flex-col gap-4" onSubmit={async (e) => {
                    e.preventDefault()

                    console.log(formData.generos);

                    if ((formData.generos.generos && formData.generos.generos.length < 1) || (!formData.generos.generos && formData.generos.length < 1)) {
                        document.getElementById('modalGenreError').showModal()
                        return
                    } else await handleBookAddModal(e)

                }}>

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

                                setFormData({ ...formData, autor: { ...formData.autor, autor: newValue } });


                                // let id = dataWithId.authors.findIndex(a => a.autor == newValue)
                                // let autorId = -1

                                // if (id != -1) autorId = dataWithId.authors[id].id

                                // setFormData({ ...formData, autor: { ...formData.autor, autor: newValue, id: autorId } })


                            }}
                            onBlur={(e) => {

                                setFormData({ ...formData, autor: { ...formData.autor, autor: e.target.value } });


                                let id = dataWithId.authors.find(a => a.nome == e.target.value)

                                let autorId

                                if (id == undefined) {
                                    autorId = -1
                                } else {
                                    autorId = id.id
                                }

                                setFormData({ ...formData, autor: { ...formData.autor, autor: e.target.value, id: autorId } })

                                // if (allAuthors.includes(e.target.value)) return setFormData({ ...formData, autor: { ...formData.autor, autor: e.target.value } })

                                // setFormData({ ...formData, autor: { ...formData.autor, autor: e.target.value, id: -1 } })
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

                            }}
                            onBlur={(e) => {
                                if (!e.target.value) return

                                setFormData({ ...formData, editora: { ...formData.editora, editora: e.target.value } });


                                let selectedPublisher = dataWithId.publishers.find(a => a.editora == e.target.value)


                                let editoraId

                                if (selectedPublisher == undefined) {
                                    editoraId = -1
                                } else {
                                    editoraId = selectedPublisher.id
                                }

                                setFormData({ ...formData, editora: { ...formData.editora, editora: e.target.value, id: editoraId } });

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
                            value={tempGenres}
                            options={allGenres}
                            freeSolo
                            onChange={(event, generos) => {
                                let chosenGenresWithId = []

                                setTempGenres(generos)

                                console.log(generos);

                                generos.forEach(g => {

                                    let id = dataWithId.genres.findIndex(a => a.genero == g)

                                    let generoId = dataWithId.genres[id].id

                                    const generoComId = { id: generoId, genero: g }

                                    chosenGenresWithId.push(generoComId)
                                })

                                setFormData({ ...formData, generos: chosenGenresWithId ? chosenGenresWithId : { ids: [], generos: [] } })
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
                            <p className="py-4">Escolha a capa do livro entre as opções.<br />Caso não haja, escolha a primeira opção (capa padrão).</p>
                            <div className="flex gap-4">

                                {
                                    coverURLs.length > 1 ? (


                                        coverURLs.map((b, i) => {
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
                                        <button onClick={(e) => {
                                            document.getElementById('bookConfirmationModal').showModal()
                                            console.log(coverURLs[selectedCoverURL]);

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
                                                value={tempGenres}
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
                                                <span className="loading loading-spinner loading-md"></span>
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
                            <p className="py-4">Código do livro: <span className="font-bold">{formData.codigo}</span></p>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Fechar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>

                <dialog id="modalGenreError" className="modal ">
                    <div className="modal-box bg-red-300 flex w-fit gap-12 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#EF4444" className="w-32 h-32">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>

                        <div>
                            <h3 className="font-bold text-3xl text-slate-50">Ocorreu um erro!</h3>
                            <p className="py-4 text-slate-50">O livro deve ter pelo menos 1 categoria, autor e editora!</p>
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