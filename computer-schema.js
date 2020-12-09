let mongoose = require("mongoose");

// Create an object of the db item
let computerSchema = new mongoose.Schema({
    pcid: Number, 
    status: String,
    notes: String,
    roomid: Number
});

let Computers = mongoose.model("computers", computerSchema);

module.exports.Computer = Computers;