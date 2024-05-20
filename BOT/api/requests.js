const client = require('./client');



//Emprestimos atrasados
const getLateLoans = (e) =>{
    const data = client.makeGetRequest('/alunos/')
    console.log(data);
}


module.exports = {getLateLoans};