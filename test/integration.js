let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let db = require("../db");

chai.use(chaiHttp);

suite("Integration Tests", function () {

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

    // Test API call
    test("GET /pcs (API)", function () {
        let app = server.app;

        chai.request(app).get("/pcs").end(function (err, res) {
            chai.assert.equal(res.status, 200, "Wrong status code response");
        });
    });

    // Test home page call
    test("GET /dc (Main Page)", function () {
        let app = server.app;

        chai.request(app).get("/dc").end(function (err, res) {
            chai.assert.equal(res.status, 200, "Wrong status code response");
        });
    });
    
});