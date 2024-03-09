// Creating elements from HTML

const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

// looking for params in the url
const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error('Desk is mandatory');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
divAlerta.style.display = 'none';

// initializing io object
const socket = io();

// crating event listeners
socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

// custom event listeners
socket.on('tickets-pendientes', (pendientes) => {
    if(pendientes === 0){
        lblPendientes.style.display = 'none';
    }else{
        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes;
    }
});

btnAtender.addEventListener( 'click', () => {
    socket.emit('atender-ticket', {escritorio}, ({ok, ticket}) => {
        if(!ok){
            lblTicket.innerText = `None`;
            return divAlerta.style.display = '';
        }
        lblTicket.innerText = `Ticket ${ticket.numero}`;
    })
    
});
