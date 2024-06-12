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

	const [editOrRemove, setEditOrRemove] = useState("remove")

	const [formData, setFormData] = useState({
		"codigo": "",
		"autor": "Machado de Assis",
		"titulo": "",
		"status": "",
		"sinopse": "",
		"url_capa": "",
		"generos": ['teste']
	})

	const [selectedBook, setSelectedBook] = useState({ generos: [], editora: "", volumes: 0, url_capa: '' })

	const [dataWithId, setDataWithId] = useState({})
	const [authors, setAuthors] = useState(["Machado de Assis"])
	const [publishers, setPublishers] = useState(["Sextante"])
	const [generos, setGeneros] = useState(["Nutrição"])
	const [hasSearchBeenMade, setHasSearchBeenMade] = useState(false)
	const [resultBooks, setResultBooks] = useState([

		{
			titulo: "Quincas Borba",
			autor: "Machado de Assis",
			editora: "AAAAAAA",
			url_capa: "https://cdn.awsli.com.br/2500x2500/2419/2419289/produto/20280348554e2f54b5b.jpg",
			codigo: "SDGJ8416",
			generos: ["Naturalista", "Romance"],
			volumes: 70,
			sinopse: "O romance a ascensão social de Rubião que, após receber toda a herança do filósofo louco Quincas Borba - criador da filosofia 'Humanitas' e muda-se para a Corte no final do século XlX..."

		}
	]
	)

	function handleSearch(e) {
		e.preventDefault()

		//Busca dos livros pela Api

		setFormData({ ...formData })

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
			console.log(
				'AUTORES=========== ' + authors
			);

			const dataPublishers = await Api.publishers.getAllPublishers()
			setPublishers(dataPublishers.map(p => p.editora))
			console.log(dataPublishers);

			const books = await Api.books.getAllBooks()
			console.log(books);
			setResultBooks(books)

			const dataGeneros = await Api.genres.getAllGenres()
			setGeneros(dataGeneros.map(g => g.genero))
			console.log("GENEROS================== " + generos);

			const genresData = await Api.genres.getAllGenres()
			const authorsData = await Api.authors.getAllAuthors()
			const publishersData = await Api.publishers.getAllPublishers()

			setDataWithId({ genres: genresData, authors, authorsData, publishers: publishersData })
		})()
	}, [])

	useEffect(() => {
		setFormData({ ...formData, ...selectedBook })
		console.log(selectedBook);
	}, [selectedBook])

	useEffect(() => {
		console.log(editOrRemove);
	}, [editOrRemove])

	

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
											
											setSelectedBook({...selectedBook, titulo: e.target.value})

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
											setFormData({ ...formData, autor: newValue });
											setSelectedBook({...selectedBook, autor: newValue})
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

											value={selectedBook.editora}
											onChange={(event, newValue) => {
												if (!newValue) return

												setFormData({ ...formData, editora: newValue });
												setSelectedBook({...selectedBook, editora: newValue})
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
											value={selectedBook.generos}
											onChange={(event, generosEscolhidos) => {
												let chosenGenres = []
												generosEscolhidos.forEach(g => {

													chosenGenres.push(g)

													setFormData({ ...formData, generos: chosenGenres });

													let id = dataWithId.genres.findIndex(a => a.genero == g)

													console.log(`id genero no dataWithId : ${id}`);

													let generoId = -1

													if (id != -1) generoId = dataWithId.genres[id].id

													console.log(`NOVO ======== id genero no dataWithId : ${generoId}`);

													setFormData({ ...formData, generos: chosenGenres });
													setSelectedBook({...selectedBook, generos: chosenGenres})

												})
												setFormData({ ...formData, generos: { ...formData.generos, generos: generosEscolhidos } })
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
											setSelectedBook({ ...selectedBook, sinopse: e.target.value });
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
											setSelectedBook({...selectedBook, volumes: e.target.value})


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
											setSelectedBook({...selectedBook, codigo: e.target.value})
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
						<button onClick={(e) => {
							e.preventDefault()
						}} className="button no-wrap items-center flex gap-3 align-center py-2 px-4 rounded-xl text-lg">

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

													console.log(`id genero no dataWithId : ${id}`);

													let generoId = -1

													if (id != -1) generoId = dataWithId.genres[id].id

													console.log(generoId);

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
						}} className=" button no-wrap items-center flex gap-3 align-center py-2 px-4 rounded-xl text-lg">

							Remover livro

						</button>
						<button className="btn" onClick={() => {
							setSelectedBook({})
							setHasSearchBeenMade(false)
						}
						}>Cancelar</button>
					</div>

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
							onChange={(event, newValue) => {
								if (!newValue) return
								setFormData({ ...formData, titulo: newValue });
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
							required
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


				{hasSearchBeenMade ? <BookSearchContainer setEditOrRemove={setEditOrRemove} hasSearchBeenMade={hasSearchBeenMade} setSelectedBook={setSelectedBook} resultBooks={resultBooks} isEditingPage={true} /> : ""}

			</ThemeProvider>

		</>
	}

}