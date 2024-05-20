const messageListener = require('../events/onMessage');
const scheduler = require('../utils/schedulers');


function initialize(c){
    //Evento de receber mensagem
    console.log('[#] Bot inicializado.');
    c.onMessage(async (message) => { messageListener.messageListener(c, message); },);

    scheduler.registerSchedules();
}

module.exports = {initialize};