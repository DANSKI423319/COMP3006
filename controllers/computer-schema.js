const { ObjectID } = require("bson");
let mongoose = require("mongoose");

// Create an object of the db item
let computerSchema = new mongoose.Schema({
    _id: ObjectID,
    name: String, 
    status: String,
    notes: String,
    room: String
});

let Computers = mongoose.model("computers", computerSchema);

// Accessor
module.exports.Computer = Computers;
