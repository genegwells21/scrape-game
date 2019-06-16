import { exists } from "fs";

// this is preventing javascript from being run initially
$(document).ready(function()    {

// these are our variables for our article div with jquery selector
    var articleContainer = $(".article-container");
    // these are buttons that save and scrape
    $(document).on("click", "btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);
// this is running an initial function
initPage();

function initPage()

articleContainer.empty();
// this is an ajax get request 
$.get("/api/headlines?saved=false")
.then(function(data)    {
    // if the data exists then we will render the data
    if (data && data.length)    {
        renderArticles(data);
    }
    // otherwise will will render nothing or empty
    else{
        renderEmpty();
    }
});
}
// this renders articles
function renderArticles(articles)   {
// we create an article panel empty erray
    var articlePanels = [];
// this creates a panel with any  of the articles and inserts it into a container
    for (var i = 0; i < articles.length; i++)   {
        articlePanels.push(createPanel(articles[i]));

        articleContainer.append(articlePanels);
    }
// this function creates the panel
    function createPanel(article)   {
        var panel =
        $(["<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        // this is our title in h3
        article.headline,
        // this is a button to save the article
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "<div>",
        "<div class='panel-body'>",
        // this is our article in our panel body
    article.summary,
    "</div>",
    "</div>"
    ].join(""));
// when the click save article we can refer to it by an id
    panel.data("_id", article._id);
    return panel;
    }

    function renderEmpty()  {


        var emptyAlert = 
        $(["<div class= 'alert alert-warning text-center'>",
        "<h4> there are unfortunately no new articles, </h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3> How would you like to proceed? </h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrape-new'> You can try scraping new articles!</a></h4>",
        "<h4> <a href='/saved'> Go To Saved Articles</a></h4>",
        "</div>",
        "</div>"
    ].join(""));
    articleContainer.append(emptyAlert);
    }
// this is triggered when a user saves an article
    function handleArticleSave()    {
    //    we are setting article to save to the user's choice
        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;
// we are running an ajax method with path on api headlines and set data to article to save
        $.ajax({
            method: "PATCH",
            url: "/api/headlines",
            data: articleToSave
        })
        // if the data exists, we run init
        .then(function(data)    {
            if(data.ok) {
                initPage();
            }
        });(
    }
// if someone scrapes we run this function
    function handleArticleScrape()  {

        $.get("/api/fetch")
        .then(function(data)    {
// this is loading our articles
            initPage();
            // this is alerting if there are new articles or not
            bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
        });

    }
});