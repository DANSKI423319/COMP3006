let express = require("express");
let http = require("http");
let mongoose = require("mongoose");
let path = require("path");
let routes = require("./routes");
let socketIo = require("socket.io");

// Connect to DB...
let url = "mongodb+srv://D29:Skillerz357@cluster-0.rkj1r.mongodb.net/computerdb?retryWrites=true&w=majority";
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
let port = 9000;

// Start app
let app = express();
let server = http.createServer(app);

// Statics
app.use(express.static(path.join(__dirname, "files")));

// Websocket
let io = socketIo(server);
io.on("connection", function(socket) { // Establishing connection
    socket.emit("confirm connection", "Client has connected..."); // Confirm connection from server

    socket.on("request", function(msg) { // Request from client
        console.log("Recieved message: '" + msg + "'");
        socket.emit("response", "Hello from the server"); // Response from server
    })
})

// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Enable post...
app.use(express.urlencoded({ extended: true }));

// Get routes
app.get("/olddc", function (request, response) { response.render("olddc"); })
app.get("/pcs", routes.allComputers);
app.get("/dc", routes.listComputers);

// Post routes
app.post("/dcfilter", routes.listComputers);
app.post("/insert", routes.insertComputer);
app.post("/update", routes.updateComputer);
app.post("/remove", routes.removeComputer);

app.listen(port, function () {
    console.log("Listening on " + port);
});