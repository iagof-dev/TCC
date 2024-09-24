export function onKeyDownRM(e) {

    
    if (!/^\d$|^Backspace$/.test(e.key)) {
        e.preventDefault();
    }

}

export function bookCodeGenerator(){
    
}
export function getCurrentDate(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function dateConvert(dataStr) {
	const date = dataStr;
   
	const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

	return `${date.slice(-2)} de ${Number.parseInt(date.slice(5,7)) == 0? months[Number.parseInt(date.slice(5,7))] : months[Number.parseInt(date.slice(5,7)-1)]} de ${date.slice(0,4)}`;
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