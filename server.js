// psuedo steps
/*
    front end html pages
    json data
    express routes for pages and api
    api logic for json get/post
    table logic
*/

// class psuedo

// Create the front-end (visuals) for home page, reservation form, and reservation views.

// Create a basic server using Express.JS

// Create a few array variables that will hold the data

// Create a set of routes for getting and posting table data

// Create a set of routes for displaying the HTML pages

// Use jQuery to run AJAX calls to GET and POST data from users to the Express server

// packages
let express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser");

// set up express with port 3000 and make sure it can handle data parsing
let app = express();
let PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// trying to bypass CORS error
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// json data
let data = {
  tableData: [
    {
      customerName: "Ahmed",
      customerEmail: "afhaque89@gmail.com",
      customerID: "afhaque89",
      phoneNumber: "979-587-0887"
    },
    {
      customerName: "Joe",
      customerEmail: "fake@email.com",
      customerID: "afaque69",
      phoneNumber: "555-555-5555"
    }
  ],
  reserveData: [
    {
      customerName: "Saima",
      customerEmail: "saima@gmail.com",
      phoneNumber: "979-587-0887",
      customerID: "saimacool"
    },
    {
      customerName: "Saima2",
      customerEmail: "saima2@gmail.com",
      phoneNumber: "979-587-0882",
      customerID: "saimacool2"
    }
  ]
};

// html routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "views/home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "views/tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "views/reserve.html"));
});

// api routes
app.get("/api/tables", function(req, res) {
  res.send(data.tableData);
});

app.get("/api/reserve", function(req, res) {
  res.send(data.reserveData);
});

app.post("/api/tables", function(req, res) {
  let newTable = {};
  newTable.customerName = req.body.customerName;
  newTable.customerEmail = req.body.customerEmail;
  newTable.customerID = req.body.customerID;
  newTable.phoneNumber = req.body.phoneNumber;
  //   console.log(req);
  //   console.log(req.body);

  //   console.log(newTable);

  if (data.tableData.length < 5) {
    data.tableData.push(newTable);
    console.log("New table:");
    console.log(data.tableData);
    res.send(true);
  } else {
    data.reserveData.push(newTable);
    console.log("waiting list");
    console.log(data.reserveData);
    res.send(false);
  }
});

// run server
app.listen(PORT, function() {
  console.log("listening on " + PORT);
});
