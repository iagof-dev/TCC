function encodeURLParam(param) {
    return encodeURIComponent(param).replace(/%20/g, '+');
}

async function post(url, formData) {

    formData.append("authpass", "c38a7e02bfca0da201015ce51931b09d462080b7")

    return await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: formData
    }).then(res => res)

}

const url = "https://marciossupiais.shop/tcc"
const authpass = "c38a7e02bfca0da201015ce51931b09d462080b7"

const Api = {


    students: {
        //Student
        getStudentByRM: async function (rm) {
            return await fetch(url + '/alunos/rm/' + rm).then(res => res.json()).then(data => [data.status, data.DATA])
        },

        getAllStudents: async function () {
            try {
                return await fetch(url + '/alunos/listar').then(res => res.json()).then(data => data.DATA)
            } catch {
                return [
                    {
                        nome: "Joao",
                        rm: 221001

                    },
                    {
                        nome: "Maria",
                        rm: 221002
                    },
                ]
            }

        },
    },

    books: {
        //Books
        getBooksByRM: async function (rm) {

            return await fetch(url + '/emprestimos/listar/rm/' + rm).then(res => res.json()).then(data =>{console.log(data); return data.DATA})


        },

        getBookByCode: async function (code) {

            return await fetch(url + '/livros/listar/codigo/' + code).then(res => res.json()).then(data => data.DATA)


        },

		getBookByAuthor: async function (author) {
			if(author == "" || author == undefined) return {}

			console.log(await fetch(url + '/livros/listar/autor/' + author.replace(" ", "+")).then(res => res.json()).then(data => data.DATA));

			return await fetch(url + '/livros/listar/autor/' + author.replace(" ", "+")).then(res => res.json()).then(data => data.DATA)
		},

		getBookByTitle: async function (title) {
			if(title == "" || title == undefined) return {}

			console.log(await fetch(url + '/livros/listar/titulo/' + title.replace(" ", "+")).then(res => res.json()).then(data => data.DATA));

			return await fetch(url + '/livros/listar/titulo/' + title.replace(" ", "+")).then(res => res.json()).then(data => data.DATA)
		},

		getBookByTag: async function (tag) {
			if(tag == "" || tag == undefined) return {}

			return await fetch(url + '/livros/listar/genero/' + tag).then(res => res.json()).then(data => data.DATA)
		},

        getAllBooks: async function () {
            try {
                return await fetch(url + '/livros/listar').then(res => res.json()).then(data => data.DATA)

            } catch {
                return [
                    {
                        code: 1,
                        title: "O Pequeno Príncipe",
                        author: "Antoine de Saint-Exupéry",
                        loanDate: "14/02/24",
                        loanPeriod: "15",
                        situation: "Atrasado"
                    },
                    {
                        code: 1,
                        title: "O Pequeno Príncipe",
                        author: "Antoine de Saint-Exupéry",
                        loanDate: "14/02/24",
                        loanPeriod: "15",
                        situation: "Pendente"
                    },
                ]
            }
        },

        addNewBook: async function (pageData) {


            // const [formData, setFormData] = useState({
            //     titulo: "",
            //     autor: {
            //         id: "",
            //         autor: ""
            //     },
            //     editora: {
            //         id: "",
            //         editora: ""
            //     },
            //     url_capa: "",
            //     codigo: "",
            //     generos: {
            //         ids: [],
            //         generos: []
            //     },
            //     volumes: "",
            //     sinopse: "ab"
            // })

            console.log("---------------- pageData.codigo");
            console.log(pageData.codigo);

            const formData = new FormData()

            console.log("------------ API pageData");
            console.log(pageData);

            formData.append("authpass", authpass)
            formData.append("codigo", pageData.codigo)
            formData.append("titulo", pageData.titulo)
            formData.append("id_autor", pageData.autor.id)
            formData.append("id_editora", pageData.editora.id)
            formData.append("capa", pageData.url_capa)
            formData.append("volumes", pageData.volumes)
            formData.append("sinopse", pageData.sinopse)

            // formData.append("codigo", "pageData.codigo")
            // formData.append("titulo", "pageData.titulo")
            // formData.append("id_autor", "pageData.autor.id")
            // formData.append("id_editora", "pageData.editora.id")
            // formData.append("capa", "pageData.url_capa")
            // formData.append("volumes", "pageData.volumes")
            // formData.append("sinopse", "pageData.sinops")

            //[ID, CODIGO*, TITULO*, ID_AUTOR*, ID_EDITORA*, CAPA*, VOLUMES*, SINOPSE*]

            return await fetch(url + '/livros/criar/', {
                method: "POST",
                body: formData
            }).then(res => console.log(res))
        },

        addNewBookGenre: async function (idLivro, idGenero) {
            const formData = new FormData()

            formData.append("authpass", authpass)
            formData.append("id_genero", idGenero)
            formData.append("id_livro", idLivro)

            return await fetch(url + '/generos_livros/inserir/', {
                method: "POST",
                body: formData
            }).then(res => console.log(res))
        },

        getAllCodes: async function () {

            return await fetch(url + '/livros/codigos').then(res => res.json()).then(data => data.DATA)


        },

		editBook: async function(){
			//https://marciossupiais.shop/tcc/livros/modificar
			const formData = new FormData()

            //[ID, CODIGO*, TITULO*, ID_AUTOR*, ID_EDITORA*, CAPA*, VOLUMES*, SINOPSE*]

            return await fetch(url + '/livros/criar/', {
                method: "POST",
                body: formData
            }).then(res => console.log(res))
		}

    },

    loans: {
        getAllLoans: async function () {
            return await fetch(url + '/emprestimos/listar/').then(res => res.json()).then(data => data.DATA)
        },

        getLoansByRM: async function (rm) {
            return await fetch(url + '/emprestimos/listar/rm/' + rm).then(res => res.json()).then(data => data.DATA)
        },

        //[RM*, id_bibliotecaria*, id_livro*, data_aluguel*, id_status_emprestimo*, prazo*]

        makeLoan: async function (data) {
            const formData = new FormData()

			// /registrar/ - Criar um emprestimo [RM*, id_bibliotecaria*, id_livro*, data_aluguel*, id_status_emprestimo*, prazo*]

            // formData.append("rm", data.RM)
            // formData.append("id_bibliotecaria", data.idLibrarian)
            // formData.append("id_livro", data.bookId)
            // formData.append("data_aluguel", data.loanDate)
            // formData.append("id_status_emprestimo", 1)
            // formData.append("prazo", data.time)

			console.log('DATA na API ====================================');
			console.log(data);
			console.log('====================================');

			formData.append("rm", data.RM)
            formData.append("id_bibliotecaria", data.librarianId)
            formData.append("id_livro", data.bookId)
            formData.append("data_aluguel", data.loanDate)
            formData.append("id_status_emprestimo", "1")
            formData.append("prazo", data.time)


            formData.append("authpass", authpass)

            return await fetch(url + '/emprestimos/registrar/', {
                method: "POST",
                body: formData
            }).then(res => res.json()).then(res => console.log(res))
        },

		makeDevolution: async function(loan){
            const formData = new FormData()

			formData.append("id", loan.id)
			formData.append("id_estado", "3")

            formData.append("authpass", authpass)

            return await fetch(url + '/emprestimos/modificar/', {
                method: "POST",
                body: formData
            }).then(res => res.json()).then(res => console.log(res))
		},

        // updateRating: async function(id, rating){
        //     const formData = new FormData()

		// 	formData.append("id", loan.id)
		// 	formData.append("id_estado", "3")

        //     formData.append("authpass", authpass)

        //     return await fetch(url + '/emprestimos/modificar/', {
        //         method: "POST",
        //         body: formData
        //     }).then(res => res.json()).then(res => console.log(res))
        // }
    },

    librarians: {
        //Librarian
        getAllLibrarians: async function () {
            try {
                return await fetch(url + '/bibliotecarias/').then(res => res.json()).then(data => data.DATA)
            } catch (e) {
                return {
                    status: "erro",
                    data: [
                        { nome: 'João' },
                        { nome: 'Kleber' },
                        { nome: 'Maria' },
                    ]
                }
            }

        },

        addNewLibrarian: async function (name) {
            const formData = new FormData()
            formData.append("nome", name)

            return await post(url + '/bibliotecarias/criar/', formData)
        },
    },

    genres: {
        getAllGenres: async function () { return await fetch(url + '/generos/listar/').then(res => res.json()).then(data => data.DATA) }
    },

    authors: {
        addAuthor: async function (autor) {

            const formData = new FormData()

            console.log("API ----------- add author");

            formData.append("nome", autor.autor)
            formData.append("authpass", authpass)

            return await fetch(url + '/autores/adicionar', {
                method: "POST",
                body: formData
            }).then(res => res.json())

            // return await fetch(url + '/livros/criar/', {
            //     method: "POST",
            //     body: formData
            // }).then(res => console.log(res))
        },


        getAllAuthors: async function () {
            return await fetch(url + '/autores/listar/').then(res => res.json()).then(data => data.DATA)
        }

    },

    publishers: {
        getAllPublishers: async function () {
            return await fetch(url + '/editoras/listar/').then(res => res.json()).then(data => data.DATA)
        },

        addPublisher: async function (editora) {

            const formData = new FormData()

            formData.append("editora", editora)
            formData.append("authpass", authpass)

            return await fetch(url + '/editoras/adicionar', {
                method: "POST",
                body: formData
            }).then(res => console.log(res))
        },
    },

    generateSynopsis: async function (book) {
        const formData = new FormData()
        formData.append("livro", book.titulo)
        formData.append("autor", book.autor)
        formData.append("caracteres", "200")

        // return await post(url + '/sinopse/gerar/', formData)

        formData.append("authpass", "c38a7e02bfca0da201015ce51931b09d462080b7")


        return await fetch(url + '/sinopse/gerar/', {
            method: "POST",
            headers: {
            },
            body: formData
        })
    },


    getCoverURLs: async function ({ title, author, publisher }) {
        return await fetch(url + '/imagens/buscar/' + encodeURLParam(title), {

        })
            .then(res => res.json())
    }
}

export { Api }
