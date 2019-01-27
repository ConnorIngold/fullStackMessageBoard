const monk = require("monk");
const connectionString = "mongodb://admin:Computer11@ds213645.mlab.com:13645/messageboard";
const db = monk(connectionString);

module.exports = db;
