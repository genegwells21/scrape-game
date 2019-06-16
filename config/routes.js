
var scrape = require("../scripts/scrape");

var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function(router)   {
    router.get("/", function(req,res)   {
        res.render("home");
    });
    // this is getting the saved path 
    router.get("/saved", function(req,res)  {
        res.render("saved");
    });
// wheneve our api encounters our api with fetch, we run a function
    router.get("api/fetch", function (req,res)  {
        headlinesController.fetch(function(err,docs)    {
            // we run fetch, and display a message for no articles and added articles in json format
            if (!docs || docs.insertedCount === 0)  {
                res.json    ({
                    message: "There are currently no articles today!"
                });
            }
        else{
            res.json({
                message: "There are" + docs.insertedCount + " new articles!"
            });
        }
    });
});
// this is a get function
router.get("api/headlines", function(req,res)   {
    // this is our users request
    var query = {};
    // if the user chooses something we set it to their choice of article
    if (req.query.saved)    {
        query = req.query;
    }
// return everything in json data
    headlinesController.get(query, function(data)   {
        res.json(data);
    });
});

router.delete("/api/headlines/:id", function(req,res)   {
    var query = {};
    // we are reffering to our selected id
    query._id = req.params.id;
    headlinesController.delete(query, function(err, data)   {
        res.json(data);
    });
});
// this is updating our headlines using the update function
router.patch("/api/headlines", function(req, res)   {
   headlinesController.update(req.body, function(err, data) {
       res.json(data);
   });
});
// this is displaying our notes from our headlines with our route
router.get("api/notes/:headlines_id?", function(req, res)   {
    var query = {};
    if (req.params.headline_id) {
        query._id = req.params.headline_id;
    }
//    notesController.get(query, function(err, data)  {
        res.json(data);
    });
});
// this is our with our delete method within notes in api
router.delete("/api/notes/:id", function(req,res)   {
    var query = {};
    query._id = req.params.id;
    notesController.delete(query, function(err,data)    {
        res.json(data);
    });
});
// this is our router using post to display json data with our notes
router.post("/api/notes", function(req,res)  {
    notesController.save(req.body, function(data)   {
        res.json(data);
    })
});