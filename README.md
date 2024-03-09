# Bank ticket queue manager app

## Description

Basic **bank queue management application**, three components interconected by socket events.
Desk component, allowing the user to simulate a client support desk.
Create ticket component, allows the user to create all the needed tickets.
Public screen component, allows the people in waiting room to see the number of tickets in the queue.
Desk creation component, to allow multiple users to serve the people based on tickets.

## Features

Uses **express** to create and run a basic server
**socket.io** used to emit/listen to events in the frontend and backend.

### Screenshots

#### Main dashboard
![](https://dessinstudio.com/portfolio-imgs/03_01.png)
#### Public screen
![](https://dessinstudio.com/portfolio-imgs/03_02.png)
#### Create ticket screen
![](https://dessinstudio.com/portfolio-imgs/03_03.png)
#### Desk dashboard
![](https://dessinstudio.com/portfolio-imgs/03_04.png)

### How to install and run the app

Download the code, and run `npm install`
to launch it run `npm run start`
