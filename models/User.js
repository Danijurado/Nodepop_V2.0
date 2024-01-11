const mongoose = require('mongoose');

//Esquema
const userSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: String
});

//Modelo
const user = mongoose.model('user', userSchema);

module.exports = user;

