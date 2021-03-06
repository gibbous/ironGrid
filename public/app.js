// grab the articles as a json
$.getJSON('/articles', function(data) {
  // for each one
  for (var i = data.length-1; i>=0; i--){
    // display the apropos information on the page
    $('#articles').append('<p data-id="' + data[i]._id + '">'+ data[i].title + '<br /> <a href="http://www.cbssports.com/'+ data[i].link + ' " target="_blank"> Go! </a> </p>');
  }
});


// whenever someone clicks a p tag
$(document).on('click', 'p', function(){
  // empty the notes from the note section
  $('#notes').empty();
  $('#comments').empty();
  // save the id from the p tag
  var thisId = $(this).attr('data-id');

  // now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    // with that done, add the note information to the page
    .done(function( data ) {
      console.log(data);
      // the title of the article
      $('#notes').append('<h4>Add New Comment</h4>' + data.title + '</h4>'); 
      // an input to enter a new title
      $('#notes').append('<input id="titleinput" name="title" ><br>'); 
      // a textarea to add a new note body
      $('#notes').append('<textarea id="bodyinput" name="body"></textarea>'); 
      // a button to submit a new note, with the id of the article saved to it
      $('#notes').append('<button class="btn btn-warning" data-id="' + data._id + '" id="savenote">Save Note</button>');

      // if there's a note in the article
      if(data.note){
        // place the title of the note in the title input
        $('#comments').append('<h3>Comments</h3><h4>' + data.note.title + '</h4> <p>' + data.note.body + '</p>');
      }
    });
});

// when you click the savenote button
$(document).on('click', '#savenote', function(){
  // grab the id associated with the article from the submit button
  var thisId = $(this).attr('data-id');

  // run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $('#titleinput').val(), // value taken from title input
      body: $('#bodyinput').val() // value taken from note textarea
    }
  })
    // with that done
    .done(function( data ) {
      // log the response
      console.log(data);
      // empty the notes section
      $('#notes').empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $('#titleinput').val("");
  $('#bodyinput').val("");
});

