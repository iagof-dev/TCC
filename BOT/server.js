
const { exec } = require('child_process');

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const initBot = require('./index');

const app = express();
const server = http.createServer(app);
const io = new Server(server);



//FUNÇÃO DE ENCERRAMENTO
app.use(express.static('public')); // Serve o index.html

app.post('/shutdown', () => process.exit()); // Encerra o servidor

app.listen(4000);



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('Um usuário se conectou');
  const botInstance = initBot(io);

  const latestQRCode = botInstance.getLatestQRCode();
  if (latestQRCode) {
    socket.emit('qrcode', latestQRCode);
  }

  const currentStatus = botInstance.getCurrentStatus();
  if (currentStatus) {
    socket.emit('status', currentStatus);
  }

});

const PORT = process.env.PORT || 6500;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  const url = 'http://localhost:6500';

  exec(`start ${url}`);
});
