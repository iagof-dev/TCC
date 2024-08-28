import { Form, useLocation, useNavigate } from "react-router-dom"
import LogoLateral from '../../assets/img/logo-lateral-bibliotecario-removebg-preview.png'
import { TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { LoginErrorDialog } from "../../components/LoginErrorDialog"
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem"
import { Api } from "../../api"

export default function LibrarianLogin(props) {
    const { setPath, librarian, setLibrarian, setLibrarianId } = { ...props }

    const [loginNames, setLoginNames] = useState(["Silvana", "Gil", "Maria Ivone"])

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [LibrarianTemp, setLibrarianTemp] = useState('')

    const [loginError, setLoginError] = useState("")
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const [loginInputValue, setLoginInputValue] = useState("")
    const [showLibrarians, setShowLibrarians] = useState(false)

    const navigate = useNavigate()

    setPath(useLocation().pathname)

    // Remover quando terminar
    // navigate("/menu")

    function handleLogin() {
        setLibrarian(LibrarianTemp)
        if (LibrarianTemp == '') {
            setIsLoginOpen(true)
            setIsSubmitting(false)
            return
        }
        navigate("/librarianMenu/librarianLoan")
    }

    function handleLoginSubmit(e) {
        e.preventDefault()
        // testApi()
    }

    function goToMenu(){
        navigate("/librarianMenu/librarianLoan")
    }

    async function addNewLibrarian(){
        await Api.librarians.addNewLibrarian(librarian)
        goToMenu()
    }

    useEffect(() => {
        let data
        async function getAllLibrarians() {
            data = await Api.librarians.getAllLibrarians()

            if(data.status) return document.getElementById('modalInternetError').showModal()

            const librarians = data.map(l => {return {nome: l.nome, id: l.id}})

            setLoginNames(librarians)
        }

        getAllLibrarians()
       
        
    }, [])

    return (
        <div className="flex w-screen h-screen flex-col items-center justify-center">
            <img className="login__logo" src={LogoLateral} />
            <div className="container p-5 shadow-md rounded-xl border-[1px] flex flex-col align-center w-fit h-fit">
                <h1>Login de Bibliotecário(a)</h1>
                <form className="flex flex-col items-center justify-center gap-3" onSubmit={handleLoginSubmit}>
                    <span className="gap-5 flex items-center w-full">
                        <label className="mr-10 text-lg">Nome:</label>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            fullWidth
                            value={LibrarianTemp}
                            onChange={(v) => {
                                
                                setLibrarianId(v.target.value)

                                setLibrarianTemp(loginNames.find(l => l.nome == v.target.value).nome)

                                setLibrarianId(loginNames.find(l => l.nome == v.target.value).id)
                            }}>
                            {
                                loginNames.map(librarian => {
                                    return <MenuItem value={librarian.nome}>{librarian.nome}</MenuItem>
                                })
                            }</Select>


                    </span>

                    {
                        showLibrarians == true ?

                            <div className="border-2 flex no-wrap flex-col align-center p-1 rounded gap-2">

                                <TextField
                                    placeholder="Nome"
                                    value={librarian}
                                    onChange={e => {
                                        setLibrarian(e.target.value)
                                    }}
                                    style={{ width: 350 }}
                                    className="bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-fit py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete"

                                />

                                <button className="button no-wrap align-center w-full py-2 px-4 rounded marker:text-lg" onClick={() => addNewLibrarian()}>
                                    Adicionar bibliotecário(a)
                                </button>
                                

                            </div>

                                


                            : <a className="cursor-pointer underline" onClick={() => setShowLibrarians(true)}>
                                É novo(a)? adicione seu nome aqui.
                            </a>
                    }

                    <button className="button no-wrap align-center mx-2 w-full py-2 px-4 rounded text-lg" type="submit" onClick={handleLogin}>
                        {!isSubmitting ? "Entrar" : <span className="loading loading-spinner loading-md"></span>}
                    </button>

                </form>
            </div>

            <LoginErrorDialog open={isLoginOpen} setOpen={setIsLoginOpen} />
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
        </div>
    )
}