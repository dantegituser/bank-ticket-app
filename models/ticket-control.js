const path  = require('path');
const  fs  = require('fs');

// Ticket  class/inteface
class Ticket{
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

// contains all the methods and properties to control the tickets management 
class TicketControl {
    constructor() {
        // initializing the properties
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        // starts the class execution by calling init()
        this.init();
    }

    // getter for the properties object
    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }
    // starting point of the Class
    init(){
        // retrieving tickets, desk data from the json file db
        const {hoy, tickets, ultimos4, ultimo} = require('../db/data.json');

        // validates the current day
        if(hoy === this.hoy){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }
        else{
            // it is another day different from today's, so we initialize the properties
            this.guardarDB();
        }
    }
    
    // saving the new data into the json file
    guardarDB(){
        
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    // create new ticket and updates the db
    siguiente(){
        this.ultimo +=1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.guardarDB();
        return 'Ticket '+ ticket.numero;
    }

    // when a desk is calling a ticket number
    atenderTicket(escritorio){
        //no tenemos tickets
        if(this.tickets.length === 0){
            return null;
        }

        // const ticket = this.tickets[0];
        // this.tickets.shift();
        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;

        // adds the new ticket to last4 array
        // keeping max 4 elements only in the array
        this.ultimos4.unshift(ticket);
        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1);
        }
        this.guardarDB();
        return ticket;
    }
}

module.exports = TicketControl;