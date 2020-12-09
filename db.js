let models = require("./computer-schema");
let mongoose = require("mongoose");

async function getComputers(roomid) {
    let filter = {};
    if (roomid) {
        filter.roomid = roomid;
    }
    console.log("Loaded computers")
    return await models.Computer.find(filter);
}

async function addComputer() {

    let newpc = {
        pcid: 12,
        status: "Working",
        notes: "Last words...",
        roomid: 13
    }

    models.Computer.collection.insertOne(newpc);
    console.log("SOMETHING");
}

module.exports.getComputers = getComputers;
module.exports.addComputer = addComputer;