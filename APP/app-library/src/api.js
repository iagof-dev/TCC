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

const Api = {
    authpass: "c38a7e02bfca0da201015ce51931b09d462080b7",

    students: {
        //Student
        getStudentByRM: async function (rm) {
            return await fetch('https://marciossupiais.shop/alunos/rm/' + rm).then(res => res.json()).then(data => [data.status, data.DATA])
        },

        getAllStudents: async function () {
            try {
                return await fetch('https://marciossupiais.shop/alunos/').then(res => res.json()).then(data => data.DATA)
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

            return await fetch('https://marciossupiais.shop/emprestimos/listar/rm/' + rm).then(res => res.json()).then(data => data.DATA)


        },


        getAllBooks: async function () {
            try {
                return await fetch('https://marciossupiais.shop/livros/listar/').then(res => res.json()).then(data => data.DATA)

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
            // console.log("Body" + JSON.stringify({ authpass: this.authpass, titulo: pageData.titulo, }))
            const formData = new FormData()

            formData.append("authpass", this.authpass)
            formData.append("titulo", pageData.titulo)
            formData.append("id_autor", pageData.id_autor)
            formData.append("id_editora", pageData.id_editora)
            formData.append("capa", pageData.capa)
            formData.append("volumes", pageData.volumes)
            formData.append("sinopse", pageData.sinopse)

            //[ID, CODIGO*, TITULO*, ID_AUTOR*, ID_EDITORA*, CAPA*, VOLUMES*, SINOPSE*]

            return await fetch('https://marciossupiais.shop/livros/criar/', {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Authorization": this.authpass,
                    "Access-Control-Allow-Origin": "*",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: formData
            }).then(res => console.log(res))
        },

    },

    loans: {
        getAllLoans: async function () {
            return await fetch('https://marciossupiais.shop/emprestimos/listar/').then(res => res.json()).then(data => data.DATA)
        },

        getLoansByRM: async function (rm) {
            return await fetch('https://marciossupiais.shop/emprestimos/listar/rm/' + rm).then(res => res.json()).then(data => data.DATA)
        },
    },

    librarians: {
        //Librarian
        getAllLibrarians: async function () {
            try {
                return await fetch('https://marciossupiais.shop/bibliotecarias/').then(res => res.json()).then(data => data.DATA)
            } catch (e) {
                return [
                    { nome: 'João' },
                    { nome: 'Kleber' },
                    { nome: 'Maria' },
                ]
            }

        },

        addNewLibrarian: async function (name) {
            const formData = new FormData()
            formData.append("nome", name)

            return await post('https://marciossupiais.shop/bibliotecarias/criar/', formData)
        },
    },

    genres: {
        getAllGenres: async function () { return await fetch('https://marciossupiais.shop/generos/listar/').then(res => res.json()).then(data => data.DATA) }
    },

    authors: {
        getAllAuthors: async function () {
            return await fetch('https://marciossupiais.shop/autores/listar/').then(res => res.json()).then(data => data.DATA)
        }

    },

    generateSynopsis: async function (book) {
        const formData = new FormData()
            formData.append("livro", book.titulo)
            formData.append("autor", book.autor)
            formData.append("caracteres", "150")

            // return await post('https://marciossupiais.shop/sinopse/gerar/', formData)

            formData.append("authpass", "c38a7e02bfca0da201015ce51931b09d462080b7")


    return await fetch('https://marciossupiais.shop/sinopse/gerar/', {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: formData
    })
    }

}

export { Api }