let mongoose = require("mongoose");

// Create an object of the db item
let computerSchema = new mongoose.Schema({
    pcid: String, 
    status: String,
    notes: String,
    roomid: Number
});

let Computers = mongoose.model("computers", computerSchema);

// Accessor...
module.exports.Computer = Computers;