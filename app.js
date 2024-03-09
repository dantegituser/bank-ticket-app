require('dotenv').config();

const Server = require('./models/server');

// instanciate the Server class
const server = new Server();

// runs the server on specified port
server.listen();


