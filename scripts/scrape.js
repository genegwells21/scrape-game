
// we need the request module to procure data and post data
// as well as requiring cheerio to enabling scraping
var request = require("request");
var cheerio = require("cheerio");
// we are passing a call back function into an asynchronous function with a scrape variable
var scrape = function (cb)  {
// we are making a request to News Max
    request("https://www.newsmax.com/", function(err,res,body)   {
// we are selecting cheerio and loading our body with a dollar sign
    var $ = cheerio.load(body);
    var articles=   [];
    $(".nmNewsfrontStory").each(function(i, element) {
// this will remove white space at the end and putting into variables
        var head = $(this).children(".nmNewsfrontHead").text().trim();
        var sum = $(this.children.)(".nmNewsfrontSummary").text().trim();
// this is a replace regex method
        if(head && sum) {
            var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();
// we have an object out of headNeat and sumNeat and assigns it to headline and summary
            var dateToAdd = {
                headLine: headNeat,
                summary: sumNeat
            };

            articles.push(dataToAdd);
        }
    });
    cb(articles);
    });
};
// we are exporting the scrape module
    module.exports = scrape;