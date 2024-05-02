import { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, ThemeProvider, createTheme } from '@mui/material'
import Chip from '@mui/material/Chip';
import Info from '../../components/Info';
import Book from '../../components/Book'
import BookSearchContainer from '../../components/BookSearchContainer';

export default function Search(props) {
	const { setPath, path } = { ...props }

	const [selectedCategories, setSelectedCategories] = useState([])
	const [formData, setFormData] = useState({
		title: "",
		author: "",
		tags: []
	})
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

	const genresAndCourses = ["Administração", "Informática", "Nutrição", "Romance", "Suspense"]

	function handleSearch(e) {
		e.preventDefault()

		//Busca dos livros pela API

		setFormData({ ...formData, tags: selectedCategories })

		if (hasSearchBeenMade) {
			setHasSearchBeenMade(false)
			setTimeout(() => {
				setHasSearchBeenMade(true)
			}, 1)
			return
		}
		setHasSearchBeenMade(true)
		console.log(formData);
	}

	const theme = createTheme({
		typography: {
			fontFamily: [
				'Figtree',
			].join(','),
		},


	});

	return (
		<>

			<h1 className="pb-5 text-3xl">
				🔎 Pesquisa de Livro
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
					className="bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete"
					placeholder="Título do Livro" 
					value={formData.title} 
					onChange={e => setFormData({ ...formData, title: e.target.value })}
					
					/>
				</span>
				<p className="p-hint">
					ou
				</p>
				<span class="flex gap-7 w-full items-center">
					<label className="input-label w-[6rem]">
						Autor
					</label>

					<TextField
					className="bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete"
					placeholder="Nome do autor" 
					value={formData.author} 
					onChange={e => setFormData({ ...formData, author: e.target.value })}
					
					/>
				</span>
				<p className="p-hint">
					ou
				</p>
				<span className="flex gap-3 w-full items-center justify-between">

					<label className="input-label w-[9rem]">
						Categorias
					</label>

					{/* <Autocomplete
						disablePortal
						id="tags-filled"
						options={genresAndCourses}
						bgcolor="red"
						freeSolo
						sx={{ width: 300 }}
						renderInput={(params) => <TextField {...params} label="" />}
					/> */}

					{/* Usar Template Styles */}

					<Autocomplete
						multiple
						id="tags-filled"
						fullWidth
						options={genresAndCourses}
						onChange={(event, values) => setSelectedCategories(values)}
						freeSolo
						renderTags={(value, getTagProps) =>
							value.map((option, index) => (
								<Chip variant="outlined" className='text-lg' label={option} {...getTagProps({ index })}  />

							))
						}
						renderInput={(params) => <TextField {...params}
                                    className='bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
                                />}
					/>

					<button className='button button-search no-wrap items-center flex gap-3 align-center mx-2 w-fit py-2 px-4 rounded text-lg' type='submit'>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
						</svg>

						Pesquisar
					</button>

				</span>
				<div className="m-3">
					<Info title={"Para empréstimo,"} content={"consulte o(a) bibliotecário(a)!"} />
				</div>
			</form>
			</ThemeProvider>

			{hasSearchBeenMade ? <BookSearchContainer hasSearchBeenMade={hasSearchBeenMade} resultBooks={resultBooks} /> : ""}



			{/* if (hasSearchBeenMade) {
						return (<section className='results-container p-4 w-full flex no-wrap justify-center gap-5 items-center min-h-3 rounded'>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
							</svg>

							<p>Não há resultados para essa busca</p>
						</section>)
					} else  */}





			{/* <section className='results-container w-full min-h-3 rounded'>
								<h1>Não há resultados para essa busca</h1>
							</section> */}




		</>

	)
}