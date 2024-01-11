const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

//Esquema
const userSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: String
});

//hash de una password
userSchema.statics.hashPassword = function(passwordClaro) {
    return bcrypt.hash(passwordClaro, 5)
}

//metodo que comprueba la password de un usuario
userSchema.methods.comparePassword = function(passwordClaro) {
    return bcrypt.compare(passwordClaro, this.password)
}

//Modelo
const user = mongoose.model('user', userSchema);


module.exports = user;

