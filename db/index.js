const monk = require('monk')
const db = monk(process.env.MONGODB_URI || 'localhost/messages-test');

module.exports = db; 
