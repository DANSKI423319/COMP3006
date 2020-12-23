let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

chai.use(chaiHttp);

suite("Integration Tests", function () {

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