let db = require("./db");

// Show raw API
async function allComputers(req, res) {
    let computers = await db.getComputers();
    res.setHeader("content-type", "text/json");
    res.send({ "computers": computers });
}

// List computers in UI, also used to filter
async function listComputers(req, res) {
    let computers = await db.getComputers(req.body.roomFilter);
    res.render("dc", { "computers": computers });
}

// Add a computer
async function insertComputer(req, res) {
    db.addComputer(
        req.body.addName,
        req.body.addStatus,
        req.body.addNotes,
        req.body.addRoom
    );

    let computers = await db.getComputers();
    res.render("dc", { "computers": computers });
    console.log("Ping from Routes");
}

async function updateComputer(req, res) {
    db.updateComputer(
        req.body.searchName,
        req.body.updateName,
        req.body.updateStatus,
        req.body.updateNotes,
        req.body.updateRoom
    );

    let computers = await db.getComputers();
    res.render("dc", { "computers": computers });
    console.log("Ping from update");
}

module.exports.allComputers = allComputers; // API

module.exports.listComputers = listComputers; // Home page
module.exports.insertComputer = insertComputer; // Insert computer
module.exports.updateComputer = updateComputer; // Update a computer
