export function onKeyDownRM(e, onResolve) {
    if(onResolve){
        if(e.key == "Enter") onResolve()
    }
    
    if (!/^\d$|^Backspace$/.test(e.key)) {
        e.preventDefault();
    }

}

export function bookCodeGenerator(){
    
}

export function dateConvert(dataStr) {
	const date = new Date(dataStr);
	const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
	return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
  }

export function dateConverter(date){
    return `${date.slice(8)}/${date.slice(5,7)}/${date.slice(0,4)}` 
}

export function groupBooksByCode(books) {
    let groupedBooks = []

    books.forEach(uniqueBook => {
        if (groupedBooks.some(groupedBook => groupedBook.codigo == uniqueBook.codigo)){

            let uniqueBookThatAlreadyExists = groupedBooks.find(groupedBook => groupedBook.codigo == uniqueBook.codigo)
            
            uniqueBookThatAlreadyExists.genero = [uniqueBookThatAlreadyExists.genero, uniqueBook.genero]

            return
        }

        groupedBooks.push(uniqueBook)

    })

    return groupedBooks
}