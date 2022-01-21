const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    guildID: { type: String, require: true},
    money: { type: Number, default: 0},
    bank: { type: Number}
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;