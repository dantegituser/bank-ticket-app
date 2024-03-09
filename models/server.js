const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');

//  contains all methods needed to start the server
class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT || 8080;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        this.paths = {};

        // Middlewares
        this.middlewares();

        // App routes
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // REnder static content from public folder
        this.app.use( express.static('public') );

    }

    // not neede for this use case
    routes() {
        
        // this.app.use( this.paths.auth, require('../routes/auth'));
        
    }

    // initializing the socket controller
    sockets() {

        this.io.on('connection', socketController );

    }
    //start the server listening on specified port
    listen() {
        this.server.listen( this.port, () => {
            console.log('Server running on port: ', this.port );
        });
    }

}

module.exports = Server;