$(document).ready(function()    {
// we are referencing our article container with jQuery
    var articleContainer = $(".article-container");
// these are buttons that handle saving and deleting our articles and notes
    $(document).on("click", ".btn-delete", handleArticleDelete);
    $(document).on("click", "btn.notes", handleArticleNotes);
    $(document).on("click", "btn-save", handleNoteSave);
    $(document).on("click", "btn.note-delete", handleNoteDelete);

// this is loaded when we have everything rendered
initPage()  {
// we empty our container
    articleContainer.empty();
    // we are looking for saved articles
    $.get("/api/jeadlines?save=true").then(function(data)   {
        if (data && data.length)    {
            renderArticles(data);
            // if nothing is available then we render nothing
        } else{
            renderEmpty();
        }
    });
}
// this generates articles
function renderArticles(articles)   {
    // we make an empty array to place the articles
var articlePanels = [];
// loop through our articles and create a panel and place them in there
for (var i = 0; i < articles.length; i++)   {
    articlePanels.push(createPanel(articles[i]));
}
// this function creates our panel
function createPanel(article)   {

    var panel = 
    $(["<div class='panel panel-default'>",
    "<div class='panel-heading'>",
    "<h3>",
    article.headline,
    "<a class='btn btn-danger delete'>",
    "delete from saved",
    "</a>",
    "<a class='btn btn-info notes'> Article Notes</a>",
    "</h3>",
    "<div>",
    "<div class='panel-body'>",
    article.summary,
    "</div>",
    "</div>"
].join(""));

panel.data("_id", article._id);

return panel;
}

// this function is rendering nothing because there are no new articles
function renderEmpty()


var emptyAlert = 
$(["<div class='alert alert-warning text-center'>",
"<h4> Looks like there are no saved articles </h4>",
"</div>",
"<div class='panel panel-default'>",
"<div class='panel-heading text-center'>",
"<h3> Let's browse available articles!</h3>",
"</div>",
"<div class='panel-body text-center'>",
"<h4><a href='/'> Browse Articles</a></h4>",
"</div>",
"</div>"
].join(""));
// this is appending our above text into your article container
articleContainer.append(emptyAlert);
// }this renders out notes 
function renderNotesList(data)  {
    // we have an empty notes that are being rendered into an empty array
    var notesToRender = [];
    var currentNotes;
if (data.notes.length)  {
    currentNote = [
        "<li class='list-group'item'>",
        "No notes for this article yet.",
        "</li>"
    ].join("");
    notesToRender.push(currentNote);
    }
    else{

        for (var i = 0; o < data.notes.length; i++) {
            currentNote = $([
                "<li class='list-group-item note'>",
                data.notes[i].noteText,
                "<button class='btn btn-danger note-delete'>x</button>",
                "<li>"
            ].join(""));

            currentNote.children("button").data("_id", data.notes[i].id);
            notesToRender.push(currentNote);
        }
    }
    $(".note-container").append(notesToRender);
}
function handleArticleDelete()  {
    // this is selecting the article to be deleted from which ever section it is in
    var articleToDelete = $(this).parents(".panels").data();

    $.ajax({
        method: "DELETE",
        url: "/api/headlines/" + articleToDelete._id
}).then(function(data)  {
    if (data.ok)    {
        initPage();
    }
});
}
function handleArticleNotes()   {


var currentArticle = $(this).parents(".panel").data();
$.get("/api/notes/" + currentArticle._id).then(function(data)   {

    var modalText = [
        "<div class='container-fluid text-center'>",
        "<h4> Notes for Article:",
        currentArticle._id,
        "</h4>",
        "<hr/>",
        "<ul class='list-group note-container'>",
        "</ul>",
        "<textarea placeholder='New Note' rows='4' cols'60'></textarea>",
        "<button class='btn btn-success save'>Save Note</button>",
        "</div>"
    ].join("");
    // we are adding our text to our modal here
    bootbox.dialog({
        message: modalText,
        closeButton: true
    });
    var noteData = {
        _id: currentArticle._id,
        notes: data || []
    }; 
// this will take the data of our article and note
    $(".btn.save").data("article", noteData);
// this will execute the population of our notes into our data
    renderNotesList(noteData);
    });
// }this function saves a note for an article
function handleNoteSave()   {

    var noteData;
    var newNote = $(".bootbox-body textarea").val().trim();
// if the user types anything we assign it do an id and to a new note
    if (newNote)    {
        noteData= {
            _id: $(this).data("article")._id,
            noteText: newNote
        };
        // we are posting our data to api/notes
        $.post("/api/notes", noteDate).then(function()  {
// during the the end of the post hide the bootbox modal box
            bootbox.hideAll();
        });
    }
}
// we are deleting notes with this function
           function handleNoteDelete()  {
// we are grabbing the id of the note that is selected and putting it into a variable
            var noteToDelete = $(this).data("_id");
// we are executing an ajax delete request
            $.ajax({
                url: "/api/notes/" + noteToDelete,
                method: "DELETE"
            }).then(function()  {
                bootbox.hideAll();
            });
           }     
        });
