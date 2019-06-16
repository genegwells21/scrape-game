var express = require("express");
var exhbs = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

var port = process.env.PORT || 3000;
var app = express();
var router = express.Router();
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandleBars({
    defaultLayout: "main"

}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(router);
app.listen(PORT, function() {
    console.log("listening on port" + PORT);
}


