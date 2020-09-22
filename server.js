var express = require("express");
var path = require("path");
const { getMaxListeners } = require("process");
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [
    {
      //slug: "johndoe",
      customerName: "John Doe",
      phoneNumber: "5555555555",
      customerEmail: "hello@gmail.com",
      customerID: 2000
    }
  ];

  var waitList = [
    {
      customerName: "John Doe",
      phoneNumber: "5555555555",
      customerEmail: "hello@gmail.com",
      customerID: 2000
    }
  ];



app.get("/",function(req, res){
    res.sendFile(path.join(__dirname, "index.html"))
});
app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
  });
app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });
  app.get("/api/tables", function(req, res) {
    return res.json(reservations);
  });
  app.get("/api/waitlist", function(req, res) {
    return res.json(waitList)
});


  app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
    // Using a RegEx Pattern to remove spaces from newReservation
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
   //-- newReservation.slug = newReservation.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);
    reservations.push(newReservation);
    if(reservations.length<=4){
     reservations.push(newReservation)
    }
    else{
   waitList.push(newReservation);
}
     res.json(newReservation)
  });

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

