let chai = require("chai");
let db = require("../db");

/*
suite("Unit Tests", function () {

    suiteSetup("Unit Tests", function () {
        this.name = "PC-1-Test",
            this.name2 = "PC-2-Test",
            this.name3 = "PC-3-Test",
            this.name4 = "PC-4-Test",
            this.name5 = "PC-5-Test",
            this.status = "Working",
            this.notes = "Works fine",
            this.room = "1"
    });

    test("Insert", function () {
        chai.assert.equal(db.createComputer(this.name, this.status, this.notes, this.room), "Complete", "Should insert a new PC");
        //db.createComputer(this.name, this.status, this.notes, this.room);
    });

    test("Update by name", function () {
        chai.assert.equal(db.createComputer(this.name2, this.status, this.notes, this.room), "Complete", "Should insert a new PC");
        chai.assert.equal(db.updateComputerByName(this.name2, this.name3, this.status, this.notes, this.room), "Complete", "Should update PC");
    });
    
    test("Update by ID", function () {
        chai.assert.equal(db.createComputer(this.name4, this.status, this.notes, this.room), "Complete", "Should insert a new PC");
        chai.assert.equal(db.searchAndFunction(this.name4, "update", this.name5, this.status, this.notes, this.room), "Complete", "Should update by an ID that is searched for");
    });

    test("Remove by ID", function () {
        chai.assert.equal(db.createComputer(this.name5, this.status, this.notes, this.room), "Complete", "Should insert a new PC");
        chai.assert.equal(db.searchAndFunction(this.name5, "remove"), "Complete", "Remove a PC by ID");
    });

    suiteTeardown("Unit Tests", function () {
        db.searchAndFunction(this.name, "remove");
        db.searchAndFunction(this.name3, "remove");
        db.searchAndFunction(this.name4, "remove"); // Bug in the tests?
    });

});
*/