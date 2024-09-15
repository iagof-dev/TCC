import { Form, useLocation, useNavigate } from "react-router-dom"
import LogoLateral from '../../assets/img/logo-lateral.png'
import { useState } from "react"
import { LoginErrorDialog } from "../../components/LoginErrorDialog"
import { onKeyDownRM } from "../miscellaneous"
import { TextField, ThemeProvider, createTheme } from "@mui/material"
import { Api } from "../../api"


export default function StudentLogin(props) {
	const { setPath, userInfo, setUserInfo } = { ...props }

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [RM, setRM] = useState()

	const [loginError, setLoginError] = useState("")
	const [isLoginOpen, setIsLoginOpen] = useState(false)

	const navigate = useNavigate()

	setPath(useLocation().pathname)

	// Remover quando terminar
	// navigate("/menu")

	function handleRMChange(e) {

		setRM(e.target.value)

	}

	async function handleLoginSubmit(e) {
		
		e.preventDefault()
		setIsSubmitting(true)

		const [status, data] = await Api.students.getStudentByRM(RM)
		console.log('====================================');
		console.log(status);
		console.log('====================================');
		const student = data? data[0] : null

		if(status != "success") {
			// setIsLoginOpen(true)
			setIsSubmitting(false)
			return document.getElementById('modalInternetError').showModal()
		}

		setUserInfo(student)

		navigate('/studentMenu/studentList')
		

	}

	const theme = createTheme({
		typography: {
			fontFamily: [
				'Figtree',
			].join(','),
		},


	});

	return (
		<div className="flex w-screen h-screen flex-col items-center justify-center">
			<ThemeProvider theme={theme}>
			<img className="login__logo" src={LogoLateral} />
			<div className="container p-5 shadow-md rounded-xl border-[1px] flex flex-col align-center w-fit h-fit">
				<h1>Login de Aluno</h1>
				<form className="flex flex-col items-center justify-center gap-3" onSubmit={handleLoginSubmit}>
					<span className="gap-5 flex items-center">
						<label className="mr-10 text-lg">RM:</label>

							<TextField
								placeholder="RM"
								value={RM}
								inputProps={{ maxLength: 6 }}
								onKeyDown={(e) => {
									onKeyDownRM(e)
								}} onChange={e => {
									setRM(e.target.value)
								}}
								required
								style={{ width: 200 }}
								className="bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete"

							/>
					</span>

					<button className="button no-wrap align-center mx-2 w-full py-2 px-4 rounded text-lg" type="submit">
						{!isSubmitting ? "Entrar" : <span className="loading loading-spinner loading-md"></span>}
					</button>

				</form>
			</div>
			
			<dialog id="modalInternetError" className="modal ">
					<div className="modal-box bg-red-300 flex w-fit gap-12 items-center">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#EF4444" className="w-32 h-32">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
						</svg>

						<div>
							<h3 className="font-bold text-3xl text-slate-50">Ocorreu um erro!</h3>
							<p className="py-4 text-slate-50">Sem conexão com a internet!</p>
							<div className="modal-action">
								<form method="dialog">
									{/* if there is a button in form, it will close the modal */}
									<button className="btn" onClick={() => window.close()}>Fechar aplicação</button>
								</form>
							</div>
						</div>
					</div>
				</dialog>

			<LoginErrorDialog open={isLoginOpen} setOpen={setIsLoginOpen}/>
			</ThemeProvider>
		</div>
	)
}