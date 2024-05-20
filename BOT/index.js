const whatsapp = require('./models/whatsapp');
const session = require('venom-bot');

session.create({ session: 'tcc-whatsapp', logQR: true, debug: true, disableWelcome: true, updatesLog: false }).then((client) => whatsapp.initialize(client)).catch((error) => { console.log(error); });

    //const c = require('./api/client');

    // let data = new Map();
    // data.set("nome", "gilberto");
    // c.makePostRequest('/bibliotecarias/criar/', data);

    // =================================================

    // c.makeGetRequest('/bibliotecarias/listar/')
    //   .then(function (response) {
    //     console.log(response['data']['DATA'][1]['nome']);
    //   });
