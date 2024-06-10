import { TextField } from "@mui/material";
import "../App.css"

export default function EditingPageBook(props) {
    const { id, code, author, title, rating, status, synopsis, publisher, coverURL, tags } = { ...props }

    return (
        <section className="book flex no-wrap w-full gap-3 rounded-lg max-w-[50vw] max-h-[30vh]">

            <img className="w-[12vw] rounded object-cover" src={coverURL} alt="" />


            <div className="flex flex-col justify-between w-full">
                <span className="flex flex-col">
                    <span className="flex justify-between items-center">
                        <p className={`font-bold ${title.length > 14 ? "text-base" : ""}`}>
                            {title}
                        </p>
                    </span>
                    <p className="text-lg">
                        {author}
                    </p>
                    <p className="text-lg">
                        {publisher}
                    </p>

                </span>
                <div className="w-full flex justify-between no-wrap">
                    <p className=" text-sm max-w-[20vw] my-4">
                        {synopsis.length >= 150 ? (
                            <>
                                {`${synopsis.slice(0, 180)}...`}
                            </>
                        ) : synopsis}
                    </p>
                    <div className="flex flex-col justify-center gap-2">
                        <p className="text-sm text-right">
                            Código: <span className=" font-semibold">{code}</span>
                        </p>
                        <button className="button no-wrap align-center w-full py-2 px-4 rounded text-lg flex no-wrap justify-evenly" onClick={() => document.getElementById('bookConfirmationModal').showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                            Editar
                        </button>
                        <button className="button button-remove no-wrap align-center w-full py-2 px-4 rounded text-lg flex gap-1 no-wrap justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>


                            Remover
                        </button>
                    </div>
                </div>

            </div>
            
        </section>
    )
}