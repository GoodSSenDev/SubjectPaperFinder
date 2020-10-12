const mongoose = require("./connectMongo.js").mongoose;

const Schema = mongoose.Schema;

const Tag = new Schema({
    ID: Number,
    Name: String,
    Level: Number,
    Created: { type: Date, default: Date.now }
});


module.exports.mongoose = mongoose;
module.exports = mongoose.model('tags', Tag);
