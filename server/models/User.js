const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    birth: String,
    img: String
});

module.exports = mongoose.model('User', UserSchema);