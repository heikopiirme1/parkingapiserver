var mongoose = require('mongoose');

var ticketSchema = mongoose.Schema({
    timeInHours:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    vehRegistration:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var Ticket = module.exports = mongoose.model('Ticket', ticketSchema);

module.exports.getTickets = function(callback, limit){
    Ticket.find(callback).limit(limit);
};

module.exports.getTicketById = function(id, callback){
    Ticket.findById(id, callback);
};

module.exports.getTicketByReg = function(reg, callback){
    Ticket.find({ vehRegistration: reg }, callback)
}

//Add ticket

module.exports.addTicket = function(ticket, callback){
    Ticket.create(ticket, callback);
};

//Update ticket

module.exports.updateTicket = function(id, ticket, options, callback){
    var query = {_id: id};
    var update = {
        timeInHours: ticket.timeInHours,
        location: ticket.location,
        price: ticket.price,
        vehRegistration: ticket.vehRegistration,
        email: ticket.email,
        mobile: ticket.mobile
    }
    Ticket.findOneAndUpdate(query, update, options, callback);
};

//Delete ticket

module.exports.deleteTicket = function(id, callback){
    var query = {_id: id};
    Ticket.remove(query, callback);
};