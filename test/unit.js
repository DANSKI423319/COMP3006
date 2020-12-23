let chai = require("chai");
let db = require("../db");

suite("Unit Tests", function () {

    suiteSetup("Unit Tests", function () {
        this.name = "PC-1-Test",
        this.status = "Working",
        this.notes = "Works fine",
        this.room = "1",
        this.updateName = "PC-2-Test",
        this.updateStatus = "Not Working",
        this.updateNotes = "Hardware faults",
        this.updatedRoom = "2"
    });

    suiteTeardown("Update", function () {
        db.removeComputer(this.name);
    });    

    // Tests for the successful insertion of a PC to the Database
    test("Insert", function () {
        chai.assert.equal(db.addComputer(this.name, this.status, this.notes, this.room), "Success", "Should insert a new PC");
    });

    
    // Adds a new PC, and then tests for the succesful update of a PC in the database
    test("Update", function () {
        chai.assert.equal(db.addComputer(this.name, this.status, this.notes, this.room), "Success", "Should insert a new PC");
        chai.assert.equal(db.updateComputer(this.name, this.updateName, this.updateStatus, this.updateNotes, this.updatedRoom), "Success", "Should update previously input PC");
    })

    //Tests for the successful removal of a PC from the Database
    test("Remove", function () {
        chai.assert.equal(db.addComputer(this.name, this.status, this.notes, this.room), "Success", "Should insert a new PC");
        chai.assert.equal(db.removeComputer(this.name), "Success", "Should remove previously updated PC");
    });
    
});
