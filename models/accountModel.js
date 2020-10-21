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

Account.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, 8);
}

Account.methods.validateHash = function (password) {
    return bcrypt.compareSync(password, this.password);
}

Account.methods.compareHash = function (password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports.mongoose = mongoose;
module.exports = mongoose.model('accounts', Account);
