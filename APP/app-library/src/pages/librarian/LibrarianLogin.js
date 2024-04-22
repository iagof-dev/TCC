import { Form, useLocation, useNavigate } from "react-router-dom"
import LogoLateral from '../../assets/img/logo-lateral-bibliotecario-removebg-preview.png'
import { TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { LoginErrorDialog } from "../../components/LoginErrorDialog"
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem"

export default function LibrarianLogin(props) {
    const { setPath, librarian, setLibrarian } = { ...props }

    const [loginNames, setLoginNames] = useState(["Silvana", "Gil", "Maria Ivone"])
    
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [loginError, setLoginError] = useState("")
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const [loginInputValue, setLoginInputValue] = useState("")

    const navigate = useNavigate()

    setPath(useLocation().pathname)

    // Remover quando terminar
    // navigate("/menu")

    function handleLogin(){
        alert(`MDSSSSSSSSSSSSS: ${loginInputValue}`)
        setLibrarian(loginInputValue)
        if(loginInputValue == ''){
			setIsLoginOpen(true)
			setIsSubmitting(false)
            return
        }
        console.log(`LOGIN: ${librarian}`);
        navigate("/librarianMenu/librarianLoan")
    }

    function handleLoginSubmit(e) {
        e.preventDefault()
        // testAPI()
    }

    useEffect(() => {
        //buscar pelo nome de todos os bibliotecários
    }, [])

    return (
        <div className="flex w-screen h-screen flex-col items-center justify-center">
            <img className="login__logo" src={LogoLateral} />
            <div className="container p-5 shadow-md rounded-xl border-2 flex flex-col align-center w-fit h-fit">
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

                    <button className="button no-wrap align-center mx-2 w-full py-2 px-4 rounded text-lg" type="submit" onClick={handleLogin}>
                        {!isSubmitting ? "Entrar" : <span className="loading loading-spinner loading-md"></span>}
                    </button>

                </form>
            </div>

            <LoginErrorDialog open={isLoginOpen} setOpen={setIsLoginOpen} />
        </div>
    )
}