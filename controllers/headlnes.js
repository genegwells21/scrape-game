// we are requiring our makeDate from our Date.js file in scripts and also requiring our scrape.js file
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

var Headliens = require("../models/Headline");

module.exports = {
    // fetch will run our scrape function and grab our articles and put them into mongo
    fetch: function(cb) {
        // the data is being named as articles when being initiated by our scrape function
        scrape(function(data)   {
            var articles = data;
            // loop through our articles and make a makeDate function and articles are not saved
            for (var i=0; 1 < articles.length; i++) {
                articles[i].date= makeDate();
                articles[i].saved = false;
            }

            Headlline.collection.insertMany(articles, {ordered: false}, function (err, docs)    {
                //  cb will return any errors
                cb(err, docs);
            });
        });
    },
    // this is our delete function to remove any articles
    delete: function(query,cb)  {
        Headliens.remove(query, cb);
    },
    // sort through articles from recent ones to least recent and pass them into a call back function
    get: function(query, cb)    {
        Headlines.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, doc)    {
            cb(doc);
        });
    },
// we are using our update function here
    update: function(query, cb) {
        Headline.update({_id: query._id},   {
            $set: query
        }, {}, cb);

    }
}