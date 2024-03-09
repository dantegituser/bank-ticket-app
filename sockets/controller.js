const TicketControl = require("../models/ticket-control");

// creating new instance of TicketControl class
const ticketControl = new TicketControl();

// main controller function
const socketController = (socket) => {

    // cuando un cliente se conecta
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);
        
    // event listeners
    socket.on('disconnect', () => {
        //console.log('Cliente desconectado', socket.id );
    });

    socket.on('siguiente-ticket', ( payload, callback ) => {

        const siguiente = ticketControl.siguiente();
        callback( siguiente );
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

    });

    socket.on('atender-ticket',({escritorio}, callback) => {
        
        if(!escritorio){
            return callback({
                ok: false,
                msg: 'Desk is mandatory'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        // todo
        // notificar cambio en los ultimos 4

        socket.broadcast.emit('estado-actual', ticketControl.ultimos4); 
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
        if(!ticket){
            callback({
                ok:false,
                msg: 'There are no more pendding tickets'
            })
        }else{
            callback({
                ok:true,
                ticket
            })
        }
    })

}



module.exports = {
    socketController
}

