let db = require("./db");

// Show raw API
async function allComputers(req, res) {
    let computers = await db.getComputers();
    res.setHeader("content-type", "text/json");
    res.send({ "computers": computers });
}

// List computers in UI, also used to filter
async function listComputers(req, res) {
    let computers = await db.getComputers(req.body.roomidFilter);
    res.render("dc", { "computers": computers });
}

// Add a computer
async function addTest(req, res) {
    db.addComputer(
        req.body.pcidInput,
        req.body.statusInput,
        req.body.notesInput,
        req.body.roomidInput
    );

    let computers = await db.getComputers();
    res.render("dc", { "computers": computers });
    console.log("Ping from Routes");
}

module.exports.allComputers = allComputers;
module.exports.listComputers = listComputers;
module.exports.addTest = addTest;
