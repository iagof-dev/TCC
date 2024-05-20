const axios = require('axios');
require("dotenv").config();


// console.log(process.env.API_AUTH);

const makeGetRequest = (url) => {
  return axios.get(`http://${process.env.API_URL}${url}`)
      .then(function (r) { 
          return r; 
      })
      .catch(function (e) { 
          console.log("Houve um erro tentando acessar a API.\n" + e); 
          return false;
      });
};

const makePostRequest = (url, data, value) => {
  var data_v = new FormData();
  data_v.append('authpass', process.env.API_AUTH);

  for (let [key, value] of data) {
    data_v.append(key, value);
  }

  axios({ method: "post", url: `https://${process.env.API_URL}${url}`, data: data_v, headers: { "Content-Type": "multipart/form-data" }, })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      console.log(response);
    });


  return false;
};




module.exports = {makeGetRequest, makePostRequest};