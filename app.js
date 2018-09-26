var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt    = require('jsonwebtoken');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

Ticket = require('./models/ticket');
User = require('./models/user');
var config = require('./config');

app.set('superSecret', config.secret); 

mongoose.connect('mongodb://localhost/parkingapi');
var db = mongoose.connection;

app.get('/', function(req, res){
    res.send('Welcome to the Parking API!');
});var express = require('express');

//Authentication
app.post('/authenticate', function(req, res){
    User.findOne({
        name: req.body.name
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

        if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

        const payload = {
            admin: user.admin 
        };

        var token = jwt.sign(payload, app.get('superSecret'));

        res.json({
            success: true,
            token: token
        });
        }   

        }

    });
});

//Middleware function

function JWTCheckMiddleware(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
};

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

app.post('/tickets', JWTCheckMiddleware, function(req, res){
    var ticket = req.body;
    Ticket.addTicket(ticket, function(err, ticket){
        if(err){
            throw err;
        }
        res.json(ticket);
    });
});

//Update ticket

app.put('/tickets/:_id', JWTCheckMiddleware, function(req, res){
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

app.delete('/tickets/:_id', JWTCheckMiddleware, function(req, res){
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