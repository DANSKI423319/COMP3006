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

var dt = new Date();
var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

// Websocket
let io = socketIo(server);
let clientCount = 0;

// Establishing connection
io.on('connection', function (socket) {                             

    // Confirm connection from server
    socket.emit('confirm connection', 'Client Connected');        

    // Count users
    clientCount++;
    socket.emit('connected users', { clientCount: clientCount });   
    console.log(time +': Connected users: ' + clientCount);

    // Request from client
    socket.on('request', function (msg) {                           

        // Response from server
        console.log('S.IO: ' + msg + '');
        socket.emit('response', 'Server Response');                

    });

    // On disconnect, minus the user count (F5 counts as a disconnect, duh)
    socket.on('disconnect', function () {                          

        clientCount--;
        socket.emit('connected users', { clientCount: clientCount });
        console.log(time +': User disconnected (Users:  ' + clientCount + ')');

    });

});

server.listen(port, function () {
    console.log(time + ": Listening on " + port);
});

// Export for tests
module.exports.app = app;