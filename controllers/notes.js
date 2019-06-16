// we are requiring makeDate and Note
var Note = require("../models/Note");
var makeDate = require("../scripts/date");

module.exports = {
    // we are using a get function to procure our data with a call back
    get: function(data,cb)  {
        // we are using a find method with whatever the id is of the artcle
        Note.find({
            _headLineId: data._id
        }, cb);
    },
    // we have a save function
    save: function(data, db)    {
        // our object newNote has a headline Id of our data, uses makeDate to get the date, and gets our noteText
        var newNote = {
            _headLineId: data._id,
            date: makeDate(),
            noteText: data.noteText
        };
// this is ensuring our newNote object is working with a function, and will return error if error
        Note.create(newNote, function(err, doc) {
            if(err) {
                console.log(err);
            }
        else{
            console.log(doc);
            cb(doc);
        }
        });
},
// this is a delete function to get rid of an article that is contingent to our id
delete: function(data, cb) {
    Note.remove({
        _id: data._id
    }, cb);
}
};