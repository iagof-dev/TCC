
import BlankBookCover from '../assets/img/book-cover.png'

export default function CoverOption(props) {
    const {id, coverURL, selectedCoverURL, setselectedCoverURL} = {...props}
    return (
        <div className="w-[18rem] h-[28rem] relative" id={`cover-${id}`} onClick={() => {
            setselectedCoverURL(id)
            }}>
            <img className={`rounded-2xl h-[100%] object-top bg-cover ${selectedCoverURL == id? "brightness-75" : "hover:brightness-75"} duration-500`} src={coverURL? coverURL : BlankBookCover} />

            {selectedCoverURL == id? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#e7e7e7" className="w-32 h-32  absolute bottom-[10rem] left-[5rem]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg> : "" }

        </div>
    )
}