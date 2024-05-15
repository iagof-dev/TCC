const Api = {
    authpass: "c38a7e02bfca0da201015ce51931b09d462080b7",
    getStudentByRM: async function(rm) {
        return await fetch('https://marciossupiais.shop/alunos/rm/' + rm).then(res => res.json()).then(data => [data.status, data.DATA])
    },
    getBooksByRM: async function(rm) {
        return await fetch('https://marciossupiais.shop/emprestimos/listar/rm/' + rm).then(res => res.json()).then(data => data.DATA)
    },
    getAllBooks: async function() {
        return await fetch('https://marciossupiais.shop/livros/listar/').then(res => res.json()).then(data => data.DATA)
    },

    getAllLibrarians: async function() {
        return await fetch('https://marciossupiais.shop/bibliotecarias/').then(res => res.json()).then(data => data.DATA)
    },

    addNewLibrarian: async function(name) {
        console.log("Body" + JSON.stringify({authpass: this.authpass, nome: name}) )
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

export {Api}