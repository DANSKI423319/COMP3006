let models = require("./computer-schema");

// Filters database output by roomid (optional)
async function getComputers(_room) {
    let filter = {};
    if (_room) {
        filter.room = _room;
    }

    return await models.Computer.find(filter);
}

// Add a computer to the database
function addComputer(_name, _status, _notes, _room) {
    models.Computer.collection.insertOne(
        {
            name: _name,
            status: _status,
            notes: _notes,
            room: parseInt(_room)
        },
        (error, data) => {
            if (error) {
                console.log(error);
            } else {
                console.log(data)
            }
        }
    );

    console.log("Ping from insert function");
}

// Update a computer
function updateComputer(_search, _name, _status, _notes, _room) {
    models.Computer.findOneAndUpdate(
        {
            name: _search
        },
        {
            name: _name,
            status: _status,
            notes: _notes,
            room: _room
        },
        (error, data) => {
            if (error) {
                console.log(error);
            } else {
                console.log(data)
            }
        }
    );

    console.log("Ping from update function");
}

// Accessors...
module.exports.getComputers = getComputers;
module.exports.addComputer = addComputer;
module.exports.updateComputer = updateComputer;