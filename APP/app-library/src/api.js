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
            console.log("Body" + JSON.stringify({ authpass: this.authpass, nome: name }))
            const formData = new FormData()

            formData.append("authpass", this.authpass)
            formData.append("nome", name)

            return await fetch('https://marciossupiais.shop/bibliotecarias/criar/', {
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
    }





}

export { Api }