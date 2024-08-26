import { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, ThemeProvider, createTheme } from '@mui/material'
import Chip from '@mui/material/Chip';
import Info from '../../components/Info';
import Book from '../../components/Book'
import BookSearchContainer from '../../components/BookSearchContainer';
import { Api } from '../../api';
import { groupBooksByCode } from '../miscellaneous';

export default function Search(props) {
	const { setPath, path, librarianId } = { ...props }

	const [editOrRemove, setEditOrRemove] = useState("remove")

	const [formData, setFormData] = useState({
		"codigo": "",
		"autor": "",
		"id_autor": 0,
		"titulo": "",
		"editora": '',
		"id_editora": 0,
		"status": "",
		"volumes": 0,
		"sinopse": "",
		"url_capa": "",
		"generos": [''],
		"id_generos": [0]
	})

	let newFormData = {}

	const [selectedBook, setSelectedBook] = useState({ generos: [], editora: "", volumes: 0, url_capa: '' })

	const [dataWithId, setDataWithId] = useState({})
	const [authors, setAuthors] = useState(["Machado de Assis"])
	const [publishers, setPublishers] = useState(["Sextante"])
	const [generos, setGeneros] = useState(["Nutrição"])
	const [hasSearchBeenMade, setHasSearchBeenMade] = useState(false)
	const [resultBooks, setResultBooks] = useState([])

	async function handleSearch(e) {
		e.preventDefault()

		let booksFoundByAuthor = await Api.books.getBookByAuthor(formData.autor)
		let booksFoundByTitle = await Api.books.getBookByTitle(formData.titulo)

		booksFoundByAuthor = Array.isArray(booksFoundByAuthor) ? Array.from(new Set(booksFoundByAuthor.map(b => JSON.stringify(b)))).map(b => JSON.parse(b)) : []
		booksFoundByTitle = Array.isArray(booksFoundByTitle) ? Array.from(new Set(booksFoundByTitle.map(b => JSON.stringify(b)))).map(b => JSON.parse(b)) : []

		booksFoundByAuthor = groupBooksByCode(booksFoundByAuthor)
		booksFoundByTitle = groupBooksByCode(booksFoundByTitle)

		// if (Array.isArray(booksFoundByAuthor)) setResultBooks([...booksFoundByAuthor])

		let tempResultBooks = []

		

		// if (Array.isArray(booksFoundByAuthor)) setResultBooks([...booksFoundByAuthor])
		// 	if (Array.isArray(booksFoundByTitle)) booksFoundByTitle.forEach(book => {
		// 		if (resultBooks.find(b => b.titulo == book.titulo)) return
		// 		setResultBooks([...resultBooks, book])
		// 	});

		setResultBooks([])

		if (Array.isArray(booksFoundByTitle) && Array.isArray(booksFoundByAuthor)) {

			booksFoundByTitle.forEach(book => {
				if (tempResultBooks.find(b => b.titulo == book.titulo)) return
				tempResultBooks = [...tempResultBooks, ...booksFoundByAuthor, book]
			});

			setResultBooks(tempResultBooks)


		} else if (Array.isArray(booksFoundByTitle)) {

			booksFoundByTitle.forEach(book => {
				if (tempResultBooks.find(b => b.titulo == book.titulo)) return
				tempResultBooks = [...resultBooks, book]
			});

			setResultBooks(tempResultBooks)
		} else if (Array.isArray(booksFoundByAuthor)) {

			setResultBooks([...booksFoundByAuthor])
		}

		console.log(booksFoundByTitle);
		console.log(booksFoundByTitle.length);
		console.log(resultBooks.length);



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

	async function handleEdit() {
		await Api.books.editBook(newFormData).then(() => {
			setFormData({
				"codigo": "",
				"autor": "",
				"id_autor": 0,
				"titulo": "",
				"editora": '',
				"id_editora": 0,
				"status": "",
				"volumes": 0,
				"sinopse": "",
				"url_capa": "",
				"generos": [],
				"id_generos": []
			})
			document.getElementById('modalEditSuccess').showModal()
			setTimeout(() => {
				setSelectedBook({ generos: [], editora: "", volumes: 0, url_capa: '' })
			}, 1500)

		}
		)
	}

	async function handleDelete() {
		await Api.books.removeBook(selectedBook).then(res => {
			if (res.error) return

			document.getElementById('modalRemoveSuccess').showModal()
			setTimeout(() => setSelectedBook({ generos: [], editora: "", volumes: 0, url_capa: '' }), 2000)
		})
	}


	useEffect(() => {
		setFormData({ ...selectedBook })
	}, [selectedBook])


	useEffect(() => {


		(async () => {
			const data = await Api.authors.getAllAuthors()
			setAuthors(data.map(a => a.nome))

			const dataPublishers = await Api.publishers.getAllPublishers()
			setPublishers(dataPublishers.map(p => p.editora))

			const dataGeneros = await Api.genres.getAllGenres()
			setGeneros(dataGeneros.map(g => g.genero))

			const genresData = await Api.genres.getAllGenres()
			const authorsData = await Api.authors.getAllAuthors()
			const publishersData = await Api.publishers.getAllPublishers()

			setDataWithId({ genres: genresData, authors, authorsData, publishers: publishersData })
		})()
	}, [])

	useEffect(() => {
		newFormData = formData
	}, [formData])

	if (selectedBook.titulo) {

		if (editOrRemove == "edit") {
			return <ThemeProvider theme={theme}>


				<div className=" w-full p-4">
					<div className="flex gap-3 justify-between">
						<div>

							<h3 className="font-bold text-3xl">Edição de livro</h3>
							<p className="py-4 text-md">Confirme se as informaçoes do livro estão corretas.</p>
							<div class="flex flex-col gap-4">
								<span class="flex gap-7 w-full items-center">
									<label className="input-label w-[7rem]">
										Título
									</label>
									<TextField
										value={formData.titulo}
										onChange={e => {
											setFormData({ ...formData, titulo: e.target.value })


										}}
										placeholder="Título"
										style={{ width: 550 }}
										required
										className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
									/>
								</span>
								<span class="flex gap-7 w-full items-center">
									<label className="input-label w-[7rem]">
										Autor
									</label>


									{authors.length >= 2 ? <Autocomplete
										value={formData.autor}
										onChange={(event, newValue) => {
											if (!newValue) return
											const authorObject = dataWithId.authorsData.find(a => a.nome == newValue)
											setFormData({ ...formData, autor: newValue, id_autor: authorObject.id });
										}}
										options={authors}
										id="controllable-states-demo"
										size="sm"
										required
										fullWidth
										placeholder="Autor"
										sx={{ width: 550 }}
										renderInput={(params) => <TextField  {...params}
											className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
										/>}
									/> : ''}


								</span>
								<span class="flex gap-7 w-full items-center">
									<label className="input-label w-[7rem]">
										Editora
									</label>

									{
										publishers.length >= 2 ? <Autocomplete

											value={formData.editora}
											onChange={async (event, newValue) => {
												if (!newValue) return
												const publisherObject = dataWithId.publishers.find(p => p.editora == newValue)
												setFormData({ ...formData, editora: newValue, id_editora: publisherObject.id });
											}}

											options={publishers}
											id="controllable-states-demo"
											size="sm"
											required
											sx={{ width: 550 }}
											renderInput={(params) => <TextField  {...params}
												className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
											/>}

										/> : ''
									}


								</span>
								<span class="flex gap-12 w-full items-center">
									<label className="input-label w-[5.8rem]">
										Gêneros e cursos
									</label>

									{
										generos.length >= 2 ? <Autocomplete
											multiple
											id="tags-filled"
											fullWidth
											value={formData.generos}
											onChange={(event, generosEscolhidos) => {

												let idsGenero = []

												generosEscolhidos.forEach(g => {
													const objetoGenero = dataWithId.genres.find(d => d.genero == g)
													idsGenero.push(objetoGenero.id)
												})

												setFormData({ ...formData, id_generos: idsGenero, generos: generosEscolhidos })

											}
											}
											options={generos}
											freeSolo
											sx={{ width: 550 }}
											renderTags={(value, getTagProps) =>
												value.map((option, index) => (
													<Chip variant="outlined" className='text-lg' label={option} {...getTagProps({ index })} />

												))
											}
											renderInput={(params) => <TextField {...params}
												className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
											/>}
										/> : ''
									}


								</span>

								<span class="flex gap-12 w-full items-center">
									<label className="input-label w-[5.8rem]">
										Sinopse
									</label>
									<TextField
										value={formData.sinopse}
										onChange={e => {
											setFormData({ ...formData, sinopse: e.target.value })
										}}
										placeholder="Título"
										style={{ width: 550 }}
										multiline
										rows={4}
										required
										className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
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

								</span>

								<span class="flex gap-7 w-full items-center">
									<label className="input-label w-[7rem]">
										Código <p className="text-sm font-bold">(gerado)</p>
									</label>
									<TextField
										value={formData.codigo}
										onChange={e => {
											setFormData({ ...formData, codigo: e.target.value })
										}
										}
										placeholder="Código"
										style={{ width: 230 }}
										className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
									/></span>

							</div>
						</div>

					</div>

					<div className=" flex no-wrap gap-4 mt-3">
						<button onClick={handleEdit} className="button no-wrap items-center flex gap-3 align-center py-2 px-4 rounded-xl text-lg">

							Confirmar

						</button>
						<button className="btn" onClick={() => {
							setSelectedBook({})
							setHasSearchBeenMade(false)
						}
						}>
							Voltar e editar
						</button>
					</div>

				</div>
				<dialog id="modalEditSuccess" className="modal ">
					<div className="modal-box bg-green-200 flex w-fit gap-12 items-center">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0c9115" className="w-32 h-32">
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
						</svg>

						<div>
							<h3 className="font-bold text-3xl ">Sucesso!</h3>
							<p className="py-4">
								Edição realizada!</p>
							<div className="modal-action">
								<form method="dialog">
									<button className="btn">Fechar</button>
								</form>
							</div>
						</div>
					</div>
				</dialog>
			</ThemeProvider>
		} else {
			return <ThemeProvider theme={theme}>
				<div className=" w-full p-4">
					<div className="flex gap-3 justify-between">

						<div>
							<h3 className="font-bold text-3xl">Remoção de livro</h3>
							<p className="py-4 text-md">Deseja remover o livro do sistema?</p>
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
										required
										disabled
										className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
									/>
								</span>
								<span class="flex gap-7 w-full items-center">
									<label className="input-label w-[7rem]">
										Autor
									</label>


									{authors.length >= 2 ? <Autocomplete
										value={formData.autor}
										onChange={(event, newValue) => {
											if (!newValue) return
											setFormData({ ...formData, autor: newValue });
										}}
										options={authors}
										id="controllable-states-demo"
										size="sm"
										required
										disabled
										fullWidth
										placeholder="Autor"
										sx={{ width: 450 }}
										renderInput={(params) => <TextField  {...params}
											className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
										/>}
									/> : ''}


								</span>
								<span class="flex gap-7 w-full items-center">
									<label className="input-label w-[7rem]">
										Editora
									</label>

									{
										publishers.length >= 2 ? <Autocomplete

											value={selectedBook.editora}
											onChange={(event, newValue) => {
												if (!newValue) return

												setFormData({ ...formData, editora: newValue });
											}}
											options={publishers}
											id="controllable-states-demo"
											size="sm"
											disabled
											required
											sx={{ width: 450 }}
											renderInput={(params) => <TextField  {...params}
												className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
											/>}

										/> : ''
									}


								</span>
								<span class="flex gap-12 w-full items-center">
									<label className="input-label w-[5.8rem]">
										Gêneros e cursos
									</label>

									{
										generos.length >= 2 ? <Autocomplete
											multiple
											id="tags-filled"
											fullWidth
											disabled
											value={selectedBook.generos}
											onChange={(event, generosEscolhidos) => {
												let chosenGenres = []
												generosEscolhidos.forEach(g => {

													chosenGenres.push(g)

													setFormData({ ...formData, generos: chosenGenres });

													let id = dataWithId.genres.findIndex(a => a.genero == g)

													let generoId = -1

													if (id != -1) generoId = dataWithId.genres[id].id

													setFormData({ ...formData, generos: chosenGenres });

												})
												setFormData({ ...formData, generos: { ...formData.generos, generos: generosEscolhidos } })
											}
											}
											options={generos}
											freeSolo
											sx={{ width: 450 }}
											renderTags={(value, getTagProps) =>
												value.map((option, index) => (
													<Chip variant="outlined" className='text-lg' label={option} {...getTagProps({ index })} />

												))
											}
											renderInput={(params) => <TextField {...params}
												className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
											/>}
										/> : ''
									}


								</span>

								<span class="flex gap-12 w-full items-center">
									<label className="input-label w-[5.8rem]">
										Sinopse
									</label>
									<TextField
										value={formData.sinopse}
										onChange={e => setFormData({ ...formData, sinopse: e.target.value })}
										placeholder="Título"
										style={{ width: 450 }}
										multiline
										disabled
										rows={4}
										required
										className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
									/>
								</span>




								<span class="flex gap-7 w-full items-center">
									<label className="input-label w-[7rem]">
										Número de volumes
									</label>

									<TextField
										placeholder="0"
										value={formData.volumes}
										disabled
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

								</span>

								<span class="flex gap-7 w-full items-center">
									<label className="input-label w-[7rem]">
										Código <p className="text-sm font-bold">(gerado)</p>
									</label>
									<TextField
										value={formData.codigo}
										onChange={e => setFormData({ ...formData, codigo: e.target.value })}
										disabled
										placeholder="Código"
										style={{ width: 230 }}
										className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
									/></span>

							</div>
						</div>
					</div>

					<div className=" flex no-wrap gap-4 mt-4 start-end">
						<button onClick={(e) => {
							e.preventDefault()
							handleDelete()
						}} className=" button no-wrap items-center flex gap-3 align-center py-2 px-4 rounded-xl text-lg">

							Remover livro

						</button>
						<button className="btn" onClick={() => {
							setSelectedBook({})
							setHasSearchBeenMade(false)
						}
						}>Cancelar</button>
					</div>

					<dialog id="modalRemoveSuccess" className="modal ">
						<div className="modal-box bg-green-200 flex w-fit gap-12 items-center">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0c9115" className="w-32 h-32">
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
							</svg>

							<div>
								<h3 className="font-bold text-3xl ">Sucesso!</h3>
								<p className="py-4">Livro deletado!</p>
								<div className="modal-action">
									<form method="dialog">
										<button className="btn">Fechar</button>
									</form>
								</div>
							</div>
						</div>
					</dialog>
				</div>
			</ThemeProvider>
		}



	} else {
		return <>

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

						<TextField
							value={formData.titulo}
							onChange={(event) => {
								setFormData({ ...formData, titulo: event.target.value });
							}}
							size="sm"
							fullWidth
							placeholder="Título"
							sx={{ width: 650 }}
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
							fullWidth
							placeholder="Autor"
							sx={{ width: 650 }}
							renderInput={(params) => <TextField  {...params}
								className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
							/>}
						/>


					</span>

					<button className='button button-search no-wrap items-center flex gap-3 align-center w-full py-2 px-4 mt-5 rounded text-lg justify-center' type='submit'>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
						</svg>

						Pesquisar
					</button>
				</form>


				{hasSearchBeenMade ? <BookSearchContainer setEditOrRemove={setEditOrRemove} setHasSearchBeenMade={setHasSearchBeenMade} hasSearchBeenMade={hasSearchBeenMade} setSelectedBook={setSelectedBook} resultBooks={resultBooks} isEditingPage={true} /> : ""}

			</ThemeProvider>

		</>
	}

}