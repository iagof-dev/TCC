const Api = {
    authpass: "c38a7e02bfca0da201015ce51931b09d462080b7",
    getBooksByRM: async function(rm) {
        return await fetch('https://marciossupiais.shop/emprestimos/listar/rm/' + rm).then(res => res.json()).then(data => data.DATA)
    },
    getAllBooks:async function() {
        return await fetch('https://marciossupiais.shop/livros/listar/').then(res => res.json()).then(data => data.DATA)
    },
}

export {Api}