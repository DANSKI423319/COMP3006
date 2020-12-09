let db = require("./db");

// Show raw API
async function allComputers(req, res) {
    let computers = await db.getComputers();
    res.setHeader("content-type", "text/json");
    res.send({ "computers": computers });
}

// List computers in UI, also used to filter
async function listComputers(req, res) {
    let computers = await db.getComputers(req.body.roomid);
    res.render("dc", { "computers": computers });
}

// Add a computer
async function addTest(req, res) {
    let test = await db.addComputer();
    console.log("FROM ROUTES");
}

module.exports.allComputers = allComputers;
module.exports.listComputers = listComputers;
module.exports.addTest = addTest;
