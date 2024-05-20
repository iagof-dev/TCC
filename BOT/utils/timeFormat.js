
//  Função para retornar data e hora no formato (DD-MM-YYYY HH-MM-SS)
//  (Muito mais complicado que o C#, mds)
const getTimeFormatted = () => `${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear()} ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}:${new Date().getSeconds().toString().padStart(2, '0')}`;


module.exports = [getTimeFormatted];