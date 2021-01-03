let db = require("./db");

// Show raw API
async function allComputers(req, res) {
    let computers = await db.getComputers();
    res.setHeader("content-type", "text/json");
    res.send({ "computers": computers });
};

// List computers
async function listComputers(req, res) {
    let computers = await db.getComputers(req.body.filterSearch);
    res.render("dc", { "computers": computers });
}

// Filter query, specific search
async function filterQuery(req, res) {
    let computers = await db.filterComputers(req.body.filterCategory, req.body.filterSearch);
    res.render("dc", { "computers": computers});
}

// Add computer
async function insertComputer(req, res) {
    db.createComputer(
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
    db.updateComputerByID(
        req.body.searchId,
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
    
    if(req.body.removeInput.length == 24) {
        
        db.removeComputerByID(req.body.removeInput);

        let computers = await db.getComputers();
        res.render("dc", { "computers": computers });


    } else {

        let computers = await db.getComputers();
        res.render("dc", { "computers": computers });

    }
    
}

// API
module.exports.allComputers = allComputers;

// CRUD
module.exports.listComputers = listComputers;
module.exports.insertComputer = insertComputer;
module.exports.updateComputer = updateComputer;
module.exports.removeComputer = removeComputer;

module.exports.filterQuery = filterQuery;