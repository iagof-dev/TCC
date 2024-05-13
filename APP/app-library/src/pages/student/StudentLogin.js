import { Form, useLocation, useNavigate } from "react-router-dom"
import LogoLateral from '../../assets/img/logo-lateral.png'
import { useState } from "react"
import { LoginErrorDialog } from "../../components/LoginErrorDialog"
import { onKeyDownRM } from "../miscellaneous"
import { TextField, ThemeProvider, createTheme } from "@mui/material"


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

	async function testApi() {

		setIsSubmitting(true)

		await fetch("https://jsonplaceholder.typicode.com/users").then(res => {
			res.json()
			
			if(RM.length != 6) {
				throw "não deu bom"
			} else {
				setUserInfo({...userInfo, RM: RM})
				navigate('/studentMenu/studentList')
			}
			
		}).catch(e => {
			setLoginError(e)
			setIsLoginOpen(true)
			setIsSubmitting(false)
		})


	}

	function handleLoginSubmit(e) {
		
		e.preventDefault()

		testApi()

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

			<LoginErrorDialog open={isLoginOpen} setOpen={setIsLoginOpen}/>
			</ThemeProvider>
		</div>
	)
}