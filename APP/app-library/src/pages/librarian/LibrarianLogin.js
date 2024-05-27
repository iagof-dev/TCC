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
    const { setPath, librarian, setLibrarian } = { ...props }

    const [loginNames, setLoginNames] = useState(["Silvana", "Gil", "Maria Ivone"])

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [loginError, setLoginError] = useState("")
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const [loginInputValue, setLoginInputValue] = useState("")
    const [showLibrarians, setShowLibrarians] = useState(false)

    const navigate = useNavigate()

    setPath(useLocation().pathname)

    // Remover quando terminar
    // navigate("/menu")

    function handleLogin() {
        setLibrarian(loginInputValue)
        if (loginInputValue == '') {
            setIsLoginOpen(true)
            setIsSubmitting(false)
            return
        }
        navigate("/librarianMenu/librarianEdit")
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
            const librarians = data.map(l => l.nome)
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
                            value={loginInputValue}
                            onChange={(v) => {
                                console.log(v);
                                setLoginInputValue(v.target.value)
                            }}>
                            {
                                loginNames.map(name => {
                                    return <MenuItem value={name}>{name}</MenuItem>
                                })
                            }</Select>


                    </span>

                    {
                        showLibrarians == true ?

                            <>
                                <hr/>

                                <TextField
                                    placeholder="Nome"
                                    value={librarian}
                                    onChange={e => {
                                        setLibrarian(e.target.value)
                                    }}
                                    style={{ width: 350 }}
                                    className="bg-gray-100 appearance-none border-[1px] border-gray-300 rounded w-[50vw] py-none px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 autocomplete"

                                />

                                <button className="button no-wrap align-center mx-2 w-full py-2 px-4 rounded marker:text-lg" onClick={() => addNewLibrarian()}>
                                    Adicionar bibliotecário(a)
                                </button>
                                
                                <hr/>

                            </>

                                


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
        </div>
    )
}