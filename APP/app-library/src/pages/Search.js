import { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, createTheme } from '@mui/material'
import Chip from '@mui/material/Chip';
import Book from '../components/Book'

export default function Search(props) {
	const [selectedGenresAndCourses, setSelectedGenresAndCourses] = useState([])
	const [hasSearchBeenMade, setHasSearchBeenMade] = useState(false)
	const [resultBooks, setResultBooks] = useState([
		{ author: "Autor", title: "titulo", rating: 4, status: "disponivel", synopsis: "era uma vez...", coverURL: "a" }
	])

	const { setPath, path } = { ...props }

	const genresAndCourses = ["Administração", "Informática", "Nutrição", "Admin3istração", "Informá2tica", "Nutr3ição", "Admini2stração", "Inform4ática", "Nutri5ção",]

	function handleSearch(e) {
		e.preventDefault()
		setHasSearchBeenMade(true)
	}


	return (
		<>

			<h1 className="pb-5 text-3xl">
				📚 Pesquisa de Livro
			</h1>
			<form className='max-w-[50vw] mb-4' onSubmit={handleSearch}>
				<p className="p-hint">
					Pesquise por
				</p>
				<span class="flex gap-7 w-full items-center">
					<label className="input-label">
						Título
					</label>
					<input placeholder="Título do Livro" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-[50vw] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400" />
				</span>
				<p className="p-hint">
					ou
				</p>
				<span class="flex gap-7 w-full items-center">
					<label className="input-label">
						Autor
					</label>
					<input placeholder="Nome do autor" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-[50vw] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400" />
				</span>
				<p className="p-hint">
					ou
				</p>
				<span className="flex gap-3 w-full items-center justify-between">

					<label className="input-label">
						Gênero/curso
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
						onChange={(event, values) => setSelectedGenresAndCourses(values)}
						freeSolo
						renderTags={(value, getTagProps) =>
							value.map((option, index) => (
								<Chip variant="outlined" label={option} {...getTagProps({ index })} />

							))
						}
						renderInput={(params) => (
							<TextField
								{...params}
								variant="filled"
								placeholder="Gêneros ou cursos"
								className=' bg-gray-200 appearance-none border-2 border-gray-200 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete'
							/>
						)}
					/>

					<button className='button button-search no-wrap items-center flex gap-3 align-center mx-2 w-fit py-2 px-4 rounded text-lg' type='submit'>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
						</svg>

						Pesquisar
					</button>

				</span>
			</form>

			{(()=>{
				if (hasSearchBeenMade) {
					<section className='results-container p-4 w-full flex no-wrap justify-center gap-5 items-center min-h-3 rounded'>

						{
							resultBooks.map((b, i) => {
								<Book author={b.author} title={b.title} rating={b.rating} status={b.status} synopsis={b.synopsis} coverURL={b.coverURL} />
							})
						}

					</section>
						}
			})()}

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