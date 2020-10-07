const mongoose = require("./connectMongo.js").mongoose;
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const Account = new Schema({
    username: String,
    password: String,
    email: String,
    role: String,
    created: { type: Date, default: Date.now }
});

Account.method.generateHash = function (password) {
    return bcrypt.hashSync(password, 8);
}

Account.methods.validateHash = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('accounts', Account);
