let express = require("express");
let mongoose = require("mongoose");
let path = require("path");
let routes = require("./routes");

// Connect to DB...
let url = "mongodb+srv://D29:Skillerz357@cluster-0.rkj1r.mongodb.net/computerdb?retryWrites=true&w=majority";
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
let port = 9000;

// Start app
let app = express();

// Statics
app.use(express.static(path.join(__dirname, "files")));

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