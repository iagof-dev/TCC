function coordinatorBodyMessage(item_lending, item_student, item_coordinator, final_date, initial_date){
    return "*-- NOVA CHAMADA DE ATRASO DE LIVRO! 🚨🚨🚨*\n"+
    `*RM:* ${item_student.rm}\n` +
    `*NOME:* ${item_student.nome}\n` +
    `*SÉRIE:* ${(new Date().getFullYear() - parseInt(item_coordinator.ano)) -1}° Série\n` +
    `*CURSO:* ${item_coordinator.curso}\n` +
    "*--------------//--------------*\n"+
    `*LIVRO EM COBRANÇA:* ${item_lending.livro_titulo}\n` +
    `*DATA DE ALUGUEL:* ${initial_date}\n` +
    `*PRAZO DE DIAS:* ${item_lending.prazo}\n` +
    `*DATA DE EXPIRAÇÃO:* ${final_date}\n\n` +
    "*📚​ É necessária a consulta para com o mesmo e realizar a devolução do livro.*";
}

function messageBodyGenerator(stituation, item_lending, item_student, item_f_date, item_i_date){
    const randomBody = ~~(Math.random() * 4) + 1;
  
    switch(stituation){
      case 2:
        
        switch (randomBody){
          
          case 1:
            return `*Olá ${item_student.aluno_nome}!👋*​\n`+
          `Faltam exatamanete 2 dias para o aluguel do livro ${item_lending.livro_titulo} expirar!\n\n`+
          `*Você tem até o dia ${item_f_date} para realizar a devolução 🚨​👀*`;
          break;
          case 2:
            return `*Eai ${item_student.aluno_nome}, tudo beleza?! 😄*​​\n`+
            `Só vim te avisar que faltam 2 dias para o aluguel do livro ${item_lending.livro_titulo} acabar!\n\n`+
            `*Você vai ter até o dia ${item_f_date} para fazer a devolução dele, tenha uma boa tarde 😉*`;
          break;
          case 3:
            return `*Opa ${item_student.aluno_nome}, sou o Zappy Bot e vim te trazer um recadinho 🤖*​​​\n`+
            `O livro ${item_lending.livro_titulo} que você alugou, está próximo de ter seu aluguel expirado, mais precisamente, daqui a 2 dias!\n\n`+
            `*Sua data limite será ${item_f_date}, fique esperto! 🧐​*`;
          break;
          case 4:
            return `*Boa tarde ${item_student.aluno_nome}, vim trazer um recado para você! 👓📖*\n`+
            `Parece que o livro ${item_lending.livro_titulo} alugado por você no dia ${item_i_date} está à 2 dias de expirar seu aluguel..\n\n`+
            `*Até o dia ${item_f_date} tenha atenção para realizar a devolução 🗣️​​*`;
          break;
  
        }
  
      break;
  
      case 1:
  
      switch (randomBody){
        case 1:
          return `*Eaí ${item_student.aluno_nome}!😃​🤙*\n`+
        `Parece que está faltando apenas 1 dia para o aluguel do livro ${item_lending.livro_titulo} expirar!\n\n`+
        `*Estou passando aqui para relembrar você, de que tem até o dia ${item_f_date} devolver esse item da nossa coletânea 📖🤓​​*`;
        break;
        case 2:
          return `*Eita ${item_student.aluno_nome}, tenho um aviso pra você 😮*​​​\n`+
          `O livro ${item_lending.livro_titulo} que você alugou está à 1 dia de encerrar seu aluguel\n\n`+
          `*Vá à nossa biblioteca até o dia ${item_f_date} para realizar a devolução! 👀*​`;
        break;
        case 3:
          return `*Saudações ${item_student.aluno_nome} ​👋​🤖*​​​\n`+
          `Parece que o livro ${item_lending.livro_titulo} o qual alugou, está à 1 dia te ter seu aluguel expirado!\n\n`+
          `*O dia ${item_f_date} será na data limite para realizar a devolução do livro, estou de olho ein... 👁️👁️*`;
        break;
        case 4:
          return `*Ei ${item_student.aluno_nome}, tudo certo amigo(a)? 😎​👍*​\n`+
          `O aluguel do livro ${item_lending.livro_titulo} está à 1 dia de expirar, desde que alugou na data de ${item_i_date}!\n\n`+
          `*Olha lá ein... terá até o dia ${item_f_date} para realizar a devolução​!​ 🦾​🔥*`;
        break;
  
      }
      
      break;
  
      case 0:
  
      switch (randomBody){
        case 1:
          return `*Opa, eai ${item_student.aluno_nome}, tenho um aviso para você! 🚨🚨​*\n`+
        `O alguel do livro ${item_lending.livro_titulo} irá expirar em breve! Em caso de atraso com a expiração, seus coordenadores serão notificados! \n\n`+
        `*${item_f_date} é a data limite de seu aluguel que foi realizado em ${item_i_date} 🕵️​👀*`;
        break;
        case 2:
          return `*${item_student.aluno_nome}, tenho um recado importante pra você! 🕵️😬*​​​\n`+
          `O livro que você alugou em ${item_i_date}, aquele tal de ${item_lending.livro_titulo}, está prestes a expirar em menos de um dia!\n\n`+
          `*O dia ${item_f_date} é o limite para fazer essa devolução, fique atento! Em caso de atrasos, seus coordenadores receberão uma notificação! 📅⚠️*`;
        break;
        case 3:
          return `*${item_student.aluno_nome}, tenho um pequeno alerta pra você, amigo! 🤖*​​​\n`+
          `Parece que a data limite para expiração do livro ${item_lending.livro_titulo} é daqui a menos de um dia! Lembra? Você alugou esse livro no dia ${item_i_date} ... \n\n`+
          `*Agora, ${item_f_date} é a data limite para devolver esse livro... estou de olho ein! 🧐*​`;
        break;
        case 4:
          return `*Boa tarde ${item_student.aluno_nome}, trago um comunicado pra você! 👓📖*\n`+
          `Durante a data ${item_i_date}, foi registrado que você alugou o livro ${item_lending.livro_titulo}, e parece que agora resta menos de um dia para seu prazo expirar!\n\n`+
          `*${item_f_date} ocorre a expiração do período de aluguel, vá até a biblioteca e resolva suas pendências! Em caso de atrasos, seus coordenadores podem ser notificados!​ 🔔📚*`;
        break;
  
      }
  
      break;
  
      case -1:
  
        switch (randomBody){
          case 1:
            return `*Eita, acho que tivemos um deslize ${item_student.aluno_nome}...😓💥*\n`+
          `Por conta de não devolver o livro ${item_lending.livro_titulo}, dentro do prazo de ${item_lending.prazo} dias, sendo o dia ${item_f_date}, dia limite para devolução, acabamos por enviar uma notificação aos seus coordenadores...\n\n`+
          `*Os coordenadores de seu curso estarão entrando em contato com você para então resolver a pendência! ​ 🔔📚*`;
          break;
          case 2:
            return `*${item_student.aluno_nome}, tenho uma notificação para você, colega...😕✋*\n`+
          `O livro ${item_lending.livro_titulo}  alugado por você em ${item_i_date} com um prazo ${item_lending.prazo} dias, não foi devolvido dentro da data, e por isso enviamos um pequeno relato aos coodenadores de seu curso...\n\n`+
          `*Os mesmos estarão averiguando a situação e entrando em contato com você em breve ​ 💬✍️*`;
          break;
          case 3:
            return `*Olá ${item_student.aluno_nome}, infelizmente, houve um ocorrido não muito legal!😣☝️*\n`+
          `O alguel do livro ${item_lending.livro_titulo}, feito por você, com o prazo de ${item_lending.prazo} dias, não teve o registro de sua devolução, até a data limite de ${item_f_date} ...\n\n`+
          `*Por conta disso, estaremos enviando uma solicitação para os coordenares de seu curso, que quando possível estarão entrando em contato contigo! ​ 👨‍🏫📲*`;
          break;
          case 4:
            return `*Vish..., eai ${item_student.aluno_nome}, tenho um aviso não tão bacana...🧐✉️ *\n`+
          `Foi registrado que em ${item_i_date} você alugou o livro ${item_lending.livro_titulo}, porém, parece que você acabou não devolvendo ele no prazo de seus ${item_lending.prazo} dias...\n\n`+
          `*Com isso, não tivemos outra escolha a não ser dar uma notificação aos seus coordenadores de curso, os mesmos estarão entrando em contato com você pelo atraso do livro que deveria ser devolvido em ${item_f_date} ​ 🕵️‍♀️📆*`;
          break;
  
        }
  
      break;
  
    }


  }

  module.exports = {
    coordinatorBodyMessage,
    messageBodyGenerator
  };