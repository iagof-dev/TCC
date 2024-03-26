export default function Input(props){
    const {placeholder, handleChange} = {...props}

    return(
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-70 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400" id="inline-full-name" type="text" placeholder={placeholder} onChange={(e)=>handleChange(e.target.value)}></input>
    )
}