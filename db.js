let models = require("./computer-schema");

// Filters database output by roomid (optional)
async function getComputers(_room) {

    let filter = {};
    if (_room) {
        filter.room = _room;
    }

    return await models.Computer.find(filter);
};

// Add a computer to the database
function createComputer(_name, _status, _notes, _room,) {

    let object = {
        name: _name,
        status: _status,
        notes: _notes,
        room: parseInt(_room)
    };

    models.Computer.collection.insertOne(object, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            // console.log("Inserted: " + res.insertedCount);
        }
    });

    return "Complete";

};

// Update a computer by name
function updateComputerByName(_search, _name, _status, _notes, _room) {

    models.Computer.updateOne({ name: _search }, {
        $set:
        {
            name: _name,
            status: _status,
            notes: _notes,
            room: _room
        }
    }, (err, res) => {
        if (err) {
            console.log(err);
        } else if (res.nModified == 0) {
            throw ("Update out of bounds")
        } else {
            // console.log("Updated: " + res.nModified);
        }
    });

    return "Complete";

};

// Update a computer 
function updateComputerByID(id_, _name, _status, _notes, _room) {

    models.Computer.updateOne({ _id: id_ }, {
        $set:
        {
            name: _name,
            status: _status,
            notes: _notes,
            room: _room
        }
    }, (err, res) => {
        if (err) {
            console.log(err);
        } else if (res.nModified == 0) {
            throw ("Update out of bounds")
        } else {
            // console.log("Updated: " + res.nModified);
        }
    });

};

// Remove a computer
function removeComputerByID(id_) {

    models.Computer.deleteOne({ _id: id_ }, (err, res) => {
        if (err) {
            console.log(err);
        } else if (res.deletedCount == 0) {
            console.error("Removal out of bounds")
        } else {
            // console.log("Updated: " + res.nModified);
        }
    });

};

// Search by name and remove (used by tests for teardown functions or cleaning)
function searchAndFunction(_search, _function, _name, _status, _notes, _room) {

    let vault = models.Computer.find({});

    vault.then(function (docs) {

        for (let i = 0; i < docs.length; i++) {

            if (docs[i].name == _search) {

                let id_ = docs[i]._id;

                if (_function == "remove") {
                    console.log("Removing: ({ _id: " + docs[i]._id + ", name: " + docs[i].name + " })")
                    removeComputerByID(id_);
                } else if (_function == "update") {
                    console.log("Updating: ({ _id: " + docs[i]._id + ", name: " + docs[i].name + " }) => ({ name: " + _name + " })")
                    updateComputerByID(id_, _name, _status, _notes, _room);
                } else {
                    // ...
                }

                { break }

            }
        }
    });

    return "Complete";

};

module.exports.getComputers = getComputers;
module.exports.createComputer = createComputer;
module.exports.updateComputerByID = updateComputerByID;
module.exports.updateComputerByName = updateComputerByName;
module.exports.removeComputerByID = removeComputerByID;
module.exports.searchAndFunction = searchAndFunction;

