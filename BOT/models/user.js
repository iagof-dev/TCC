//
//      Arquivo para gerenciar e salvar estado de cada chat
//

const usersState = {};

/*

List code user state:

-1 = Never Received/Sent Message (to bot)
0 = Initial
1 = Extend loan period
2 = ?


*/


const setUserState = (id, value) => {
    usersState[id] = value;
};

const getUserState = (id) => {
    return usersState[id];
};


module.exports = {setUserState, getUserState};