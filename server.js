var express = require("express");
var bodyParser = require("body-parser");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

var PORT = process.env.PORT || 4200;
var app = express();
var router = express.Router();
// this is referencing and requiring the routes with our router
require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"

}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(router);

var db = process.env.MONGODB_URI || "mongodb: //localhost/mongoHeadLines";

mongoose.connect(db, function(error)    {

    if(error)   {
        console.log(error);
    }
else{
    console.log("mongoose connection is working");
}
});
app.listen(PORT, function() {
    console.log("listening on port" + PORT);
});


