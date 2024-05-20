const schedule = require('node-schedule');

const registerSchedules = (()=>{
    console.log('[#] Registrado schedulers');

    schedule.scheduleJob('0 18 * * *', () => console.log('[#] Evento disparado de cobrança!'));
});

module.exports = {registerSchedules};