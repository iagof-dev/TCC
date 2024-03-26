import { useLocation } from "react-router-dom"

export default function Config(props){
    const {setPath} = {...props}
	setPath(useLocation().pathname)
    return(
        <div>
            <h1>
                Config
            </h1>
        </div>
    )
}