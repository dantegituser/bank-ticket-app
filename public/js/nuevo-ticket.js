// creating elements from HTML
const lblNuevoTicket  = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

// initializing io object
const socket = io();

// event listeners
socket.on('connect', () => {
    
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

// custom event listeners
socket.on("ultimo-ticket", (ultimo) => {
    lblNuevoTicket.innerText = 'Ticket '+ultimo;
});

btnCrear.addEventListener( 'click', () => {
    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
       lblNuevoTicket.innerText = ticket;
    });

});
