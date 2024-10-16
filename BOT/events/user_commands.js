const actionCommands = require('../commands/actions');
const apiSource = require("./api_conform");
const userStates = {};

class UserCommands {
  constructor() {
    var check_renewal = false;
  }

  async reply_options(client, io) {
    try {
      client.onMessage(async message => {
        console.log("-- NOVA MENSAGEM");
        //FAZER CHECAGEM SE QUEM ENVIOU A MENSAGEM É UM ALUNO
        if (!message.isGroupMsg && message.type === "chat") {
          console.log("-- SINAL RECEPTADO");
          const phone_number = message.from.slice(2, -5);


          const get_message = message.body.toLowerCase();
          //VERIFICA SE O NÚMERO POSSUI ALGUM STEP // COLOCAR UM IF SE CASO OCORRER /SETAR, O ESTADO VIRA ZERO ou delete userStates[userId];
          if (!userStates[phone_number]) {
            userStates[phone_number] = { step: 0 };
          }


          if (get_message === '/listar') {
            const map_result = new Map(
              [...(await apiSource.get_especific_lending(phone_number)).values()].entries()
            );



            console.log(map_result);
            console.log("QNTDE: " + map_result.size);
            if (map_result.size != 0) {
              console.log("-- RESULTOU EM TRUE");
              let verifity_request_body = "";

              for (const [key, item] of map_result) {
                if (item.estado == "atrasado") {
                  verifity_request_body += `\n*📖[ATRASADO]* - _${item.livro_titulo}_\n*> expira em ${actionCommands.addDaysToDate(item.data_aluguel, item.prazo)}!* \n*-----------------------*`;
                } else if (item.renovavel == 0) {
                  verifity_request_body += `\n*📖[JÁ RENOVADO]* - _${item.livro_titulo}_\n*> expira em ${actionCommands.addDaysToDate(item.data_aluguel, item.prazo)}!* \n*-----------------------*`;
                } else {
                  verifity_request_body += `\n*📖[/RENOVACAO${key.toString().padStart(4, '0')}]* - _${item.livro_titulo}_\n*> expira em ${actionCommands.addDaysToDate(item.data_aluguel, item.prazo)}!* \n*-----------------------*`;
                }
              }

              console.log("-- A LISTA DE PENDENCIAS FOI MONTADA!");
              actionCommands.sendMessage(client, phone_number, `Olá!👋 Vejamos os livros alugados que você pode renovar...\nEi! acabei achando essa lista, que tal? \n${verifity_request_body}\n\n*Caso queira renovar algum desses...basta digitar seu devido código!*`, "solicitador");
            } else {
              console.log("-- A LISTA DE PENDENCIAS NAO FOI MONTADA!");
              actionCommands.sendMessage(client, phone_number, "Este número não possui nenhum empéstimo registrado. ❌", "solicitador");
            }

            console.log("Enviado!");

          } else if (get_message.includes("/renovacao")) {
            console.log("-- ACIONOU RENOVACAO");

            const map_result = new Map(
              [...(await apiSource.get_especific_lending(phone_number)).values()].entries()
            );
            

            console.log(map_result);
            if (map_result.size != 0) {

              let lending_id;
              if (Array.from(map_result.entries()).some(([key, item]) => key === parseInt(get_message.replace(/\D/g, '')) && item.renovavel === 1 && (lending_id = item.id) ))
                {

                  console.log(lending_id);
                if (apiSource.post_renewal(lending_id)) {
                  actionCommands.sendMessage(client, phone_number, `O empréstimo de id ${lending_id} foi renovado por 14 dias!`, "solicitador");
                } else {
                  actionCommands.sendMessage(client, phone_number, `Ops, hou um erro, que tal tentar mais tarde?`, "solicitador");
                }

              } else {
                console.log(lending_id);
                actionCommands.sendMessage(client, phone_number, `Verifique o empréstimo solicitado e tente novamente 😖`, "solicitador");
              }
            } else {
              actionCommands.sendMessage(client, phone_number, "Seu número não possui nenhum empéstimo registrado. 📋", "solicitador");
            }
          }

          // VER SE AINDA VAI USAR ESSA PARTE BOMBA!
        }
      });

    } catch (error) {
      console.error('ERRO AO PROCESSO DE RECEBIMENTO DE MENSAGENS');
      io.emit('status', "#error");
    }


  }

}

module.exports = UserCommands;