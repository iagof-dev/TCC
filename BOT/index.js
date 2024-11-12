const venom = require('venom-bot');

const cron = require('node-cron');
const fs = require('fs');
const stateFile = 'executionState.json';
let executed = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile)).executed : false;

const UserCommands = require('./events/user_commands');
const LendingRoutine = require('./events/routine');

const { parse, addDays, isAfter, isToday, format } = require('date-fns');


function initBot(io) {
  let latestQRCode = '';
  let currentStatus = 'Initializing...';

  venom.create({ session: 'chatbotWhatsapp',  autoClose: 0, folderNameToken: 'tokens',},
      (base64Qr, asciiQR, attempts, urlCode) => {
        console.log('QR Code recebido', attempts);
        latestQRCode = `<img src="${base64Qr}" alt="QR Code" class="w-full h-full"/>`;
        io.emit('qrcode', latestQRCode);
      },
      (statusSession, session) => {
        console.log('Status Session: ', statusSession);
        currentStatus = statusSession;
        io.emit('status', currentStatus);
      })
    .then((client) => {let ex = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile)).executed : false; start(client, io, ex);})
    .catch((error) => {
      console.log('Erro ao iniciar a sessão: ', error);
      io.emit('status', "#error");
      
      setTimeout(() => { process.exit(1) }, 5000)
    });

    return {
      getLatestQRCode: () => latestQRCode,
      getCurrentStatus: () => currentStatus
    };
}

function start(client, io, executed) {
  const user_commands = new UserCommands();
  const lending_routine = new LendingRoutine();

cron.schedule('* * * * *', () => {
  if (!executed) {
    console.log('-- HORARIO DE VERFICAÇÃO --');
      lending_routine.message_sender(client, io);
      executed = true;
  }
  if (new Date().getHours() === 0) executed = false;
  fs.writeFileSync(stateFile, JSON.stringify({ executed }));
}, {
  timezone: "America/Sao_Paulo" 
});
user_commands.reply_options(client, io); 
}
module.exports = initBot;
