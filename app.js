var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

Ticket = require('./models/ticket');

mongoose.connect('mongodb://localhost/parkingapi');
var db = mongoose.connection;

app.get('/', function(req, res){
    res.send('Welcome to the Parking API!');
});var express = require('express');

//Get all tickets

app.get('/tickets', function(req, res){
    Ticket.getTickets(function(err, tickets){
        if(err){
            throw err;
        }
        res.json(tickets);
    });
});

//Get a ticket by ID

app.get('/tickets/:_id', function(req, res){
    Ticket.getTicketById(req.params._id, function(err, ticket){
        if(err){
            throw err;
        }
        res.json(ticket);
    });
});

//Get a ticket by registration number

app.get('/tickets/reg/:vehRegistration', function(req, res){
    Ticket.getTicketByReg(req.params.vehRegistration, function(err, ticket){
        if(err){
            throw err;
        }
        res.json(ticket);
    });
});

//Add ticket

app.post('/tickets', function(req, res){
    var ticket = req.body;
    Ticket.addTicket(ticket, function(err, ticket){
        if(err){
            throw err;
        }
        res.json(ticket);
    });
});

//Update ticket

app.put('/tickets/:_id', function(req, res){
    var id = req.params._id;
    var ticket = req.body;
    Ticket.updateTicket(id, ticket, {}, function(err, ticket){
        if(err){
            throw err;
        }
        res.json(ticket);
    });
});

//Delete ticket

app.delete('/tickets/:_id', function(req, res){
    var id = req.params._id;
    Ticket.deleteTicket(id, function(err, ticket){
        if(err){
            throw err;
        }
        res.json(ticket);
    });
});

app.listen(3000);
console.log('Running on port 3000...');