let models = require("./computer-schema");

// Filters database output by roomid (optional)
async function getComputers(roomid) {
    let filter = {};
    if (roomid) {
        filter.roomid = roomid;
    }

    return await models.Computer.find(filter);
}

// Add a computer to the database
function addComputer(_pcid, _status, _notes, _roomid) {
    let newpc = {
        pcid: _pcid,
        status: _status,
        notes: _notes,
        roomid: parseInt(_roomid)
    }

    models.Computer.collection.insertOne(newpc);
    console.log("Ping from db");
}

// Accessors...
module.exports.getComputers = getComputers;
module.exports.addComputer = addComputer;