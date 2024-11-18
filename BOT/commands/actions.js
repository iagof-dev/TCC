const date = require('date-fns');


function checkIsTodayDataAPI(element, past_days) {
  const lending_start = date.parse(element.data_aluguel, 'yyyy-MM-dd', new Date());
  const lending_days = Number(element.prazo)

  if (date.isToday(date.addDays(lending_start, lending_days - past_days - 1))) {
    return true;
  } else {
    return false;
  }
}

function addDaysToDate(past_date, add_days){
   return date.format(date.addDays(new Date(past_date), Number(add_days)+1), 'dd/MM/yyyy');
}

function getDate(){
  return date.format(new Date(), 'dd-MM-yyyy HH:mm:ss');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function  sendMessage(client_user, number, message_body, to_person) {
  await client_user.sendText(`55${number}@c.us`, message_body)
    .then((result) => {
      console.log(`Mensagem enviada com sucesso para o ${to_person}`, result);
      return true;
    })
    .catch((erro) => {
      console.error(`Erro ao enviar a mensagem para o ${to_person}`, erro);
      return false;
    });   
}

module.exports = {
  checkIsTodayDataAPI,
  addDaysToDate,
  getDate,
  delay,
  sendMessage
};