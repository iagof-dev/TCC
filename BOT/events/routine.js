const actionCommands = require('../commands/actions');
const messagesTypes = require('../commands/messages');
const apiSource = require("./api_conform");

class LendingRoutine {
  constructor() {
    //USO POSTERIOR PRA OTIMIZAÇÃO
  }



  async message_sender(client, io) {
    try {
      let dataMap_lendings = await apiSource.get_lendings();
      console.log(dataMap_lendings);

      console.log("CHAMANDO ALUNOS-----------------------");
      //REALIZANDO SOB CADA EMPRESTIMO ADQUIRIDO
      if (dataMap_lendings.size != 0) {
        for (const [key, lending] of dataMap_lendings) {
          // Imprime o campo idade de cada item

          console.log("CHAMANDO POR RM-----------------------");
          console.log(lending.aluno_rm);
          //let dataMap_students = apiSource.get_student(lending.aluno_rm); INUTIL

          //Verificar o período do empréstimo
          const student_phone = lending.aluno_telefone;
          const lending_final_date = actionCommands.addDaysToDate(lending.data_aluguel, lending.prazo);
          const lending_initial_date = new Date(lending.data_aluguel).toLocaleDateString('pt-BR');
          let message_body;

          if (true) {//await actionCommands.checkIsTodayDataAPI(lending, 2)){ //2 dias
            message_body = messagesTypes.messageBodyGenerator(2, lending, lending, lending_final_date, lending_initial_date);

          } else if (await actionCommands.checkIsTodayDataAPI(lending, 1)) {
            message_body = messagesTypes.messageBodyGenerator(1, lending, lending, lending_final_date, lending_initial_date);

          } else if (await actionCommands.checkIsTodayDataAPI(lending, 0)) {
            message_body = messagesTypes.messageBodyGenerator(0, lending, lending, lending_final_date, lending_initial_date);

          }
          await actionCommands.sendMessage(client, student_phone, message_body, "aluno");

          await actionCommands.delay(5000);

          if(parseInt(lending.renovavel) == 1){

          message_body = "Parece que a renovação automática para este livro ainda está habilitada, digite */listar* caso deseje ver sua lista de pendências e renovações disponíveis.";
           await actionCommands.sendMessage(client, student_phone, message_body, "aluno");
          }

          //Adicionar veriricação para mensagem de renovação

          if (parseInt(lending.renovavel) == 1) { //&& dia atrasado
            coordinator_sender(client, lending, lending_initial_date, lending_final_date);
            await actionCommands.delay(2000);
          }



        };
      }
    } catch (error) {
      console.error('ERRO AO PROCESSO DE ENVIO DE MENSAGENS');
      io.emit('status', "#error");
    }


  }



}

async function coordinator_sender(client_season, lending_season, date_i, date_f) {

  let dataMap_students = apiSource.get_especific_student(lending_season.aluno_rm);
  if(dataMap_students.size != 0){
  const studentData = [...(await dataMap_students).values()].find(item => item.rm === lending_season.aluno_rm);
  const coordinatorsData = await apiSource.get_coordinators(studentData.id_curso);

  if (coordinatorsData.size != 0) {
    setTimeout(() => {
      for (const [key, coordinator] of coordinatorsData) {
        const alert_body = messagesTypes.coordinatorBodyMessage(lending_season, studentData, coordinator, date_f, date_i);

        actionCommands.sendMessage(client_season, coordinator.telefone, alert_body, "coordenador");
      }
    }, 500);
  }
}
}

module.exports = LendingRoutine;
