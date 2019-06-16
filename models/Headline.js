// we are referencing mongoose with require
var mongoose = require("mongoose");
// we are referencing our schema with mongoose
var Schema = mongoose.Schema;
// we are cloning schema with "new Schema"
var headLineSchema = new Schema({
    headline:   {
        type: String,
        required: true,
        unique: true
    },
    summary:    {
        type: String,
        required: true
    },
    date: String,
    saved:  {
        type: Boolean,
        default: false
    }
});

var Headline = mongoose.model("Headline", headlineSchema);
// we are exporting headlines
module.exports = Headline;