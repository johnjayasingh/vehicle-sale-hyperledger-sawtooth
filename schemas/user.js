const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    name: String,
    pasword: String,
    privateKey: String,
    publicKey: String,
});


const User = mongoose.model('User', userSchema);


module.exports = User;