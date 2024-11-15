
const { exec } = require('child_process');

const express = require('express');
const http = require('http');
const path = require('path');
const { Server, WebSocketServer } = require('socket.io');

const initBot = require('./index');

const app = express();
const server = http.createServer(app);
const io = new Server(server);



//FUNÇÃO DE ENCERRAMENTO
app.use(express.static('public')); // Serve o index.html

app.post('/shutdown', () => process.exit()); // Encerra o servidor

app.listen(8001);



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

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  const url = 'http://localhost:' + PORT;


  //exec(`xdg-open ${url}`); 
  exec(`start ${url}`);
});

/*function removeStoredSingletonLock(puppeteerOptions, spinnies, options) { -- ON LINUX
     return new Promise((resolve, reject) => {
    try {
      const platform = os.platform()
      const { userDataDir } = puppeteerOptions
      const singletonLockPath = path.join(
        path.resolve(userDataDir, "SingletonLock")
      )

      if (platform === "win32") {
        // No need to remove the lock on Windows, so resolve with true directly.
        resolve(true)
      } else {
        fs.unlink(singletonLockPath, error => {
          spinnies.add(`path-stored-singleton-lock-${options.session}`, {
            text: `...`
          })
          if (error && error.code !== "ENOENT") {
            spinnies.fail(`path-stored-singleton-lock-${options.session}`, {
              text: `Error removing "SingletonLock": ${error}`
            })

            reject(false)
          } else {
            spinnies.succeed(`path-stored-singleton-lock-${options.session}`, {
              text: `Removing SingletonLock path: ${singletonLockPath}`
            })
            resolve(true)
          }
        })
      }
    } catch {
      resolve(true)
    }
  });
   
}*/
