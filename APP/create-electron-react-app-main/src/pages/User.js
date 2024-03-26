import { useLocation } from "react-router-dom"

export default function User(props){
    const {setPath} = {...props}
    setPath(useLocation().pathname)
    return(
        <div>
            <h1>
                User
            </h1>
        </div>
    )
}