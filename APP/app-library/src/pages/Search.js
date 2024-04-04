import { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, createTheme } from '@mui/material'
import Chip from '@mui/material/Chip';

export default function Search(props) {
	const { setPath, path } = { ...props }

	const genresAndCourses = ["Administração", "Informática", "Nutrição"]


	const theme = createTheme({
		typography: [
			"Figtree"
		].join(","),

		pallete: {
			background: {
				paper: "#e7e7e7"
			},

			text: {
				primary: "#666666"
			}
		}
	})


	return (
		<>

			<h1 className="pb-5 text-3xl">
				Pesquisa de Livro
			</h1>
			<form>
				<p className="p-hint">
					Pesquise por
				</p>
				<span class="flex gap-7 w-full items-center">
					<label className="input-label">
						Título
					</label>
					<input required placeholder="Título do Livro" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-[50vw] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400" />
				</span>
				<p className="p-hint">
					ou
				</p>
				<span class="flex gap-7 w-full items-center">
					<label className="input-label">
						Autor
					</label>
					<input required placeholder="Nome do autor" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-[50vw] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400" />
				</span>
				<p className="p-hint">
					ou
				</p>
				<span className="flex gap-7 w-full items-center">

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

				</span>
			</form>


		</>

	)
}