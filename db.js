const { exception } = require("console");
let models = require("./computer-schema");

/*
*   The use of try / catches have been used for running tests as that the DB commands
*   called from the schema part of the file (that starts with: models.Computer.collection...) 
*   is seen by the code as out of scope, as a result of this it will only return 'undefined'.
*/

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
    let object = {
        name: _name,
        status: _status,
        notes: _notes,
        room: parseInt(_room)
    };

    try {

        models.Computer.collection.insertOne(object, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Inserted: " + res.insertedCount);
            }
        });

        return "Success";

    } catch (e) {

        console.log(e);
        return "Fail";

    };

};

// Update a computer 
function updateComputer(_search, _name, _status, _notes, _room) {

    try {

        models.Computer.updateOne({ name: _search }, {
            $set:
            {
                name: _name,
                status: _status,
                notes: _notes,
                room: _room
            }
        }, (err, res) => {
            if (res.nModified == 0) {
                throw "Update Error: Search out of bounds [" + _search +"]";
            } else {
                console.log("Updated: " + res.nModified);
            }
        });

        return "Success";

    } catch (e) {

        console.log(e);
        return "Fail";

    };

}

// Remove a computer
function removeComputer(_search) {

    try {

        models.Computer.deleteOne({ name: _search },
            (err, res) => {
                if (res.deletedCount == 0) {
                    throw "Remove Error: Search out of bounds [" + _search + "]";
                } else {
                    console.log("Removed: " + res.deletedCount);
                }
            })

        return "Success";

    } catch (e) {

        console.log(e);
        return "Fail";

    };

}

// Accessors...
module.exports.getComputers = getComputers;
module.exports.addComputer = addComputer;
module.exports.updateComputer = updateComputer;
module.exports.removeComputer = removeComputer;