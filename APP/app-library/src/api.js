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

const url = "https://marciossupiais.shop"
const authpass= "c38a7e02bfca0da201015ce51931b09d462080b7"

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

            return await fetch(url + '/emprestimos/listar/rm/' + rm).then(res => res.json()).then(data => data.DATA)


        },


        getAllBooks: async function () {
            try {
                return await fetch(url + '/livros/').then(res => res.json()).then(data => data.DATA)

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

            const formData = new FormData()

            // formData.append("authpass", this.authpass)
            // formData.append("titulo", pageData.titulo)
            // formData.append("id_autor", pageData.autor.id)
            // formData.append("id_editora", pageData.editora.id)
            // formData.append("capa", pageData.url_capa)
            // formData.append("volumes", pageData.volumes)
            // formData.append("sinopse", pageData.sinopse)

            formData.append("authpass", authpass)
            formData.append("codigo", "pageData.codigo")
            formData.append("titulo", "pageData.titulo")
            formData.append("id_autor", "pageData.autor.id")
            formData.append("id_editora", "pageData.editora.id")
            formData.append("capa", "pageData.url_capa")
            formData.append("volumes", "pageData.volumes")
            formData.append("sinopse", "pageData.sinops")

            //[ID, CODIGO*, TITULO*, ID_AUTOR*, ID_EDITORA*, CAPA*, VOLUMES*, SINOPSE*]

            return await fetch(url + '/livros/criar/', {
                method: "POST",
                body: formData
            }).then(res => console.log(res))
        },

    },

    loans: {
        getAllLoans: async function () {
            return await fetch(url + '/emprestimos/listar/').then(res => res.json()).then(data => data.DATA)
        },

        getLoansByRM: async function (rm) {
            return await fetch(url + '/emprestimos/listar/rm/' + rm).then(res => res.json()).then(data => data.DATA)
        },
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
                ]}
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
        getAllAuthors: async function () {
            return await fetch(url + '/autores/listar/').then(res => res.json()).then(data => data.DATA)
        }

    },

    publishers: {
        getAllPublishers: async function () {
            return await fetch(url + '/editoras/listar/').then(res => res.json()).then(data => data.DATA)
        }
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


    getCoverURLs: async function ({title, author, publisher}) {
        return await fetch(url + '/imagens/buscar/' + encodeURLParam(title), {

        })
        .then(res => res.json())
    }
}

export { Api }
