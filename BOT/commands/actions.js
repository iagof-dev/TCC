const date = require('date-fns');


function checkIsTodayDataAPI(element, past_days) {
  if (date.isToday(date.addDays(date.parse(element.data_aluguel, 'yyyy-MM-dd', new Date()), Number(element.prazo) - past_days - 1))) {
    return true;
  } else {
    return false;
  }
}

function addDaysToDate(past_date, add_days){
   return date.format(date.addDays(new Date(past_date), Number(add_days)), 'dd/MM/yyyy');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function  sendMessage(client_user, number, message_body, to_person) {
  await client_user.sendText(`55${number}@c.us`, message_body)
    .then((result) => {
      console.log(`Mensagem enviada com sucesso para o ${to_person}`, result);
    })
    .catch((erro) => {
      console.error(`Erro ao enviar a mensagem para o ${to_person}`, erro);
    });   
}

module.exports = {
  checkIsTodayDataAPI,
  addDaysToDate,
  delay,
  sendMessage
};