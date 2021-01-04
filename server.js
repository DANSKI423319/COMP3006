let express = require("express");
let http = require("http");
let mongoose = require("mongoose");
let path = require("path");
let routes = require("./routes");
let socketIo = require("socket.io");

// Connect to DB...
let url = "mongodb+srv://D29:Skillerz357@cluster-0.rkj1r.mongodb.net/computerdb?retryWrites=true&w=majority";
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
let port = process.env.PORT || 9000;

// Start app
let app = express();
let server = http.createServer(app);

// Statics
app.use(express.static(path.join(__dirname, "files")));

// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Enable post...
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/pcs", routes.allComputers);
app.get("/dc", routes.listComputers);
app.post("/filter", routes.filterQuery);
app.post("/insert", routes.insertComputer);
app.post("/update", routes.updateComputer);
app.post("/remove", routes.removeComputer);

// Websocket
let io = socketIo(server);
io.on("connection", function (socket) { // Establishing connection
    socket.emit("confirm connection", " Client Connected"); // Confirm connection from server

    socket.on("request", function (msg) { // Request from client
        console.log("S.IO: '" + msg + "'");
        socket.emit("response", " Server Response"); // Response from server
    });
});

var dt = new Date();
var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

server.listen(port, function () {
    console.log(time +": Listening on " + port);
});

// Export for tests
module.exports.app = app;