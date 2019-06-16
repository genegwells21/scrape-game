module.exports = function(router)   {

    router.get("/", function(req,res)   {
        res.render("home");
    });
    // this is getting the saved path 
    router.get("/saved", function(req,res)  {
        res.render("saved");
    });

}