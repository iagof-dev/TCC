import { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, ThemeProvider, createTheme } from '@mui/material'
import Chip from '@mui/material/Chip';
import Info from '../../components/Info';
import Book from '../../components/Book'
import BookSearchContainer from '../../components/BookSearchContainer';
import { Api } from '../../api';

export default function Search(props) {
    const { setPath, path } = { ...props }

    const [selectedCategories, setSelectedCategories] = useState([])
    const [formData, setFormData] = useState({
        titulo: "",
        autor: "",
    })

    const [authors, setAuthors] = useState(["Machado de Assis"])
    const [hasSearchBeenMade, setHasSearchBeenMade] = useState(false)
    const [resultBooks, setResultBooks] = useState([
        {
            "id": 0,
            "code": "SDGJ8416",
            "author": "Machado de Assis",
            "title": "Quincas Borba",
            "rating": 2,
            "status": "Disponível",
            "synopsis": "O romance a ascensão social de Rubião que, após receber toda a herança do filósofo louco Quincas Borba - criador da filosofia 'Humanitas' e muda-se para a Corte no final do século XlX...",
            "coverURL": "https://cdn.awsli.com.br/2500x2500/2419/2419289/produto/20280348554e2f54b5b.jpg",
            "tags": ["Naturalista", "Romance"]
        },
        {
            "id": 0,
            "code": "HJKL3490",
            "author": "Clarice Lispector",
            "title": "Perto do Coração Selvagem",
            "rating": 3,
            "status": "Indisponível",
            "synopsis": "Publicado em 1943, Perto do Coração Selvagem marca a estreia literária da renomada escritora brasileira Clarice Lispector. O romance, aclamado pela crítica e público, apresenta uma narrativa inovadora e introspectiva, mergulhando nas profundezas da alma humana e explorando temas como identidade, amor, solidão e a busca pelo sentido da vida.",
            "coverURL": "https://images-americanas.b2w.io/produtos/01/00/img/1227806/7/1227806762_1GG.jpg",
            "tags": ["Naturalista", "Romance"]
        },
    ]
    )

    function handleSearch(e) {
        e.preventDefault()

        //Busca dos livros pela Api

        setFormData({ ...formData, tags: selectedCategories })

        if (hasSearchBeenMade) {
            setHasSearchBeenMade(false)
            setTimeout(() => {
                setHasSearchBeenMade(true)
            }, 1)
            return
        }
        setHasSearchBeenMade(true)
    }

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Figtree',
            ].join(','),
        },
    });

    useEffect(() => {
        (async () => {
            const data = await Api.authors.getAllAuthors()
            setAuthors(data.map(a => a.autor))

            const books = await Api.books.getAllBooks()
            console.log(books);
            setResultBooks(books)
        })()
    }, [])

    return (
        <>

            <h1 className="pb-5 text-3xl">
                🔎 Editar/remover livro do sistema
            </h1>
            <ThemeProvider theme={theme}>
                <form className='max-w-[50vw] mb-4' onSubmit={handleSearch}>
                    <p className="p-hint">
                        Pesquise por
                    </p>
                    <span class="flex gap-7 w-full items-center">
                        <label className="input-label w-[6rem]">
                            Título
                        </label>

                        <Autocomplete
                            value={formData.titulo}
                            onChange={(event, newValue) => {
                                if (!newValue) return
                                setFormData({ ...formData, titulo: newValue });
                            }}
                            options={["Quincas Borba"]}
                            id="controllable-states-demo"
                            size="sm"
                            required
                            fullWidth
                            placeholder="Título"
                            sx={{ width: 650 }}
                            renderInput={(params) => <TextField  {...params}
                                className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                            />}
                        />

                    </span>
                    <p className="p-hint">
                        ou
                    </p>
                    <span class="flex gap-7 w-full items-center">
                        <label className="input-label w-[6rem]">
                            Autor
                        </label>

                        <Autocomplete
                            value={formData.autor}
                            onChange={(event, newValue) => {
                                if (!newValue) return
                                setFormData({ ...formData, autor: newValue });
                            }}
                            options={authors}
                            id="controllable-states-demo"
                            size="sm"
                            required
                            fullWidth
                            placeholder="Autor"
                            sx={{ width: 650 }}
                            renderInput={(params) => <TextField  {...params}
                                className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                            />}
                        />


                    </span>

                    <button className='button button-search no-wrap items-center flex gap-3 align-center w-full py-2 px-4 mt-5 rounded text-lg flex justify-center' type='submit'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                        Pesquisar
                    </button>
                </form>
            </ThemeProvider>

            {hasSearchBeenMade ? <BookSearchContainer hasSearchBeenMade={hasSearchBeenMade} resultBooks={resultBooks} isEditingPage={true} /> : ""}

            {/* <dialog id="bookConfirmationModal" className="modal">
                <div className="modal-box bg-[#F8F8F8] flex w-[60rem] max-w-none gap-12 items-center">


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
                                            value={formData.generos_cursos}
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
                                        e.preventDefault()
                                    }} className="btn button button-search no-wrap items-center flex gap-3 align-center py-2 px-4 rounded-xl text-lg">

                                        {isRequesting ?
                                            <span className="loading m-auto loading-spinner loading-lg"></span>
                                            :
                                            "Confirmar"
                                        }


                                        <span className="loading m-auto loading-spinner loading-lg"></span> </button>
                                    <button className="btn" >Voltar e editar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog> */}


        </>

    )
}