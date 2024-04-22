import { Form, useLocation, useNavigate } from "react-router-dom"
import LogoLateral from '../../assets/img/logo-lateral.png'
import { TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { LoginErrorDialog } from "../../components/LoginErrorDialog"
import Autocomplete from '@mui/material/Autocomplete';

export default function LibrarianLogin(props) {
    const { setPath, userInfo, setUserInfo } = { ...props }

    const [loginNames, setLoginNames] = useState(["Silvana", "Gil", "Maria Ivone"])
    const [selectedLibrarian, setSelectedLibrarian] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [name, setName] = useState()

    const [loginError, setLoginError] = useState("")
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const navigate = useNavigate()

    setPath(useLocation().pathname)

    // Remover quando terminar
    // navigate("/menu")

    function handleNameChange(e) {
        setName(e.target.value)
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
                        {/* <Autocomplete
                            id="tags-filled"
                            fullWidth
                            options={loginNames}
                            onChange={(event, value) => setName(value)}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label=""
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        /> */}

                        <Autocomplete
                            id="free-solo-demo"
                            fullWidth
                            options={loginNames}
                            renderInput={(params) => <TextField {...params} label="" />

                            }
                        />
                    </span>

                    <button className="button no-wrap align-center mx-2 w-full py-2 px-4 rounded text-lg" type="submit">
                        {!isSubmitting ? "Entrar" : <span className="loading loading-spinner loading-md"></span>}
                    </button>

                </form>
            </div>

            <LoginErrorDialog open={isLoginOpen} setOpen={setIsLoginOpen} />
        </div>
    )
}