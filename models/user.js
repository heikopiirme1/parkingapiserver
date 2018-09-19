var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String, 
    password: String,
    admin: Boolean
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.getUsers = function(callback, limit){
    User.find(callback).limit(limit);
};