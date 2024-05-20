const request = require('../api/requests');

const debug = async (c, m) => {
    console.log(`[Debug] | ${m.from}`);

}


module.exports = {debug};