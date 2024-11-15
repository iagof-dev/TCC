import { TextField, ThemeProvider } from "@mui/material";
import "../App.css"

export default function EditingPageBook(props) {
    const { id, code, author, title, rating, status, synopsis, volumes, publisher, coverURL, generos, setSelectedBook, setEditOrRemove, setHasSearchBeenMade } = { ...props }

    function handleDelete(book) {
        setEditOrRemove('remove')
        setSelectedBook({
            id: id,
            codigo: code,
            autor: author,
            editora: publisher,
            titulo: title,
            avaliacao: rating,
            status: status,
            sinopse: synopsis,
            url_capa: coverURL,
            volumes: volumes,
            generos: Array.isArray(generos) ? generos : [generos]

        })
        setHasSearchBeenMade(false)
        document.getElementById('removeSuccessModal').showModal()
    }

    return (

        <section className="book flex no-wrap w-full gap-3 rounded-lg max-w-[50vw] max-h-[30vh]">

            <img className="w-[12vw] rounded object-cover" src={coverURL} alt="" />

            <div className="flex flex-col justify-between w-full">
                <span className="flex flex-col">
                    <span className="flex justify-between items-center">
                        <p className={`font-bold`}>
                            {title}
                        </p>
                    </span>
                    <div className="flex no-wrap">
                        <p className="text-sm">
                            {author} •
                        </p>
                        <p className="text-sm">
                            {'‎  ' + publisher}
                        </p>
                    </div>

                </span>
                <div className="w-full flex justify-between no-wrap">
                    <p className=" text-sm max-w-[20vw]">
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
                        <button className="button no-wrap align-center w-full py-2 px-4 rounded flex no-wrap justify-evenly" onClick={() => {
                            // id={book.id}
                            // code={book.codigo}
                            // author={book.autor}
                            // publisher={book.editora}
                            // title={book.titulo}
                            // rating={book.avaliacao}
                            // status={book.status}
                            // synopsis={""}
                            // coverURL={book.capa}
                            // setSelectedBook={setSelectedBook}

                            setEditOrRemove('edit')

                            let generosCorrigidos = []

                            console.log(generos);
                            
                            if(generos != null) generos.forEach(g => {
                                if(Array.isArray(g)){
                                    generosCorrigidos.push(...g)
                                    
                                } else {
                                    generosCorrigidos.push(g)
                                }

                            
                            });

                            const selectedBookData = {
                                id: id,
                                codigo: code,
                                autor: author,
                                editora: publisher,
                                titulo: title,
                                avaliacao: rating,
                                status: status,
                                sinopse: synopsis,
                                url_capa: coverURL,
                                volumes: volumes,
                                generos: generosCorrigidos

                            }

                            setSelectedBook(selectedBookData)

                            setHasSearchBeenMade(false)


                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                            Editar
                        </button>
                        <button className="button button-remove no-wrap align-center w-full py-2 px-4 rounded flex gap-1 no-wrap justify-between" onClick={() => {
                            setEditOrRemove('remove')
                            setSelectedBook({
                                id: id,
                                codigo: code,
                                autor: author,
                                editora: publisher,
                                titulo: title,
                                avaliacao: rating,
                                status: status,
                                sinopse: synopsis,
                                url_capa: coverURL,
                                volumes: volumes,
                                generos: Array.isArray(generos) ? generos : [generos]

                            })
                            setHasSearchBeenMade(false)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={() => setSelectedBook({})}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>


                            Remover
                        </button>
                    </div>
                </div>

            </div>

            <dialog id="removeSuccessModal" className="modal ">
                <div className="modal-box bg-green-200 flex w-fit gap-12 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0c9115" className="w-32 h-32">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <div>
                        <h3 className="font-bold text-3xl ">Sucesso!</h3>
                        <p className="py-4">Livro removido do sistema!</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Fechar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </section>
    )
}
