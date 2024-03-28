export default function Button(props){
    const {title, onClick, icon} = {...props}

    return(
        <button className="button flex no-wrap align-center mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClick}>
           
            {title}
        </button>
    )
}
