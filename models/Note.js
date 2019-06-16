// we are referencing mongoose with require
var mongoose = require("mongoose");
// we are referencing our schema with mongoose
var Schema = mongoose.Schema;
// we are cloning schema with "new Schema"
var noteSchema = new Schema({
// this refers to our desired article
    _headlineId:    {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
//    we have our dates and user's note text as strings
    date: String,
    noteText: String
});

var Note = mongoose.model("Note", noteSchema);
// we are exporting Notes
module.exports = Note;