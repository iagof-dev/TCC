import Book from "./Book";
import { useState, useEffect } from "react";
import EditingPageBook from "./EditingPageBook";

export default function BookSearchContainer(props) {
	
	const {setEditOrRemove, hasSearchBeenMade, setSelectedBook, resultBooks, isEditingPage } = { ...props };

	
	const [isLoading, setIsLoading] = useState(hasSearchBeenMade); 

	useEffect(() => {
		if (hasSearchBeenMade) {

			setTimeout(() => {
				setIsLoading(false)
			}, 1500); 
		}
	}, [hasSearchBeenMade]);

	if(isEditingPage) return (
		<section className='results-container p-1 w-full flex flex-col no-wrap justify-start gap-5 items-center rounded-md min-h-[20vh] max-h-[60vh] overflow-y-scroll'>
			{isLoading ? (
				<span className="loading m-auto loading-spinner loading-lg"></span>
			) : (
				resultBooks.map((book) => {
					console.log(book);

					return <EditingPageBook
						id={book.id}
						code={book.codigo}
						author={book.autor}
						publisher={book.editora}
						title={book.titulo}
						rating={book.avaliacao}
						status={book.status}
						generos={book.genero}
						volumes={book.volumes}
						synopsis={book.sinopse? book.sinopse : ""}
						coverURL={book.capa}

						setSelectedBook={setSelectedBook}
						setEditOrRemove={setEditOrRemove}
						
					/>
				})
			)}
		</section>
	);

	return (
		<section className='results-container p-1 w-full flex flex-col no-wrap justify-start gap-5 items-center rounded-md min-h-[20vh] max-h-[60vh] overflow-y-scroll'>
			{isLoading ? (
				<span className="loading m-auto loading-spinner loading-lg"></span>
			) : (
				resultBooks.map((book) => (
					<Book
						id={book.id}
						code={book.code}
						author={book.author}
						title={book.title}
						rating={book.rating}
						status={book.status}
						synopsis={book.synopsis}
						coverURL={book.coverURL}
						tags={book.tags}
					/>
				))
			)}
		</section>
	);
}


