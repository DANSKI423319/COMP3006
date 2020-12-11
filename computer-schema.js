let mongoose = require("mongoose");

// Create an object of the db item
let computerSchema = new mongoose.Schema({
    _id: String,
    name: String, 
    status: String,
    notes: String,
    room: Number
});

let Computers = mongoose.model("computers", computerSchema);

// Accessor...
module.exports.Computer = Computers;