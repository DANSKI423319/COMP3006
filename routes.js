let db = require("./db");

// Show raw API
async function allComputers(req, res) {
    let computers = await db.getComputers();
    res.setHeader("content-type", "text/json");
    res.send({ "computers": computers });
};

// List computers
async function listComputers(req, res) {
    let computers = await db.getComputers(req.body.roomFilter);
    res.render("dc", { "computers": computers });
}

// Add computer
async function insertComputer(req, res) {
    db.addComputer(
        req.body.addName,
        req.body.addStatus,
        req.body.addNotes,
        req.body.addRoom
    );

    let computers = await db.getComputers(req.body.roomFilter);
    res.render("dc", { "computers": computers });
}

// Update computer
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
}

// Remove computer
async function removeComputer(req, res) {
    db.removeComputer(
        req.body.removeInput
    );

    let computers = await db.getComputers();
    res.render("dc", { "computers": computers });
}

// API
module.exports.allComputers = allComputers;

// CRUD
module.exports.listComputers = listComputers;
module.exports.insertComputer = insertComputer;
module.exports.updateComputer = updateComputer;
module.exports.removeComputer = removeComputer;