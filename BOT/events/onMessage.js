const debugCMD = require('../commands/debug');


const messageListener = async (client, message) =>{
        if(message.isGroupMsg) return;
        console.log("[+] Mensagem Recebida");


        switch(message.content){
            case '/debug':
                await debugCMD.debug(client, message);
                break;
        }
};

module.exports = {messageListener};