

// Attach a submit handler to the form
$( "#addPhotoForm" ).submit(function( event ) {

  // Stop form from submitting normally
  event.preventDefault();

  // Get some values from elements on the page:
  var $form = $( this ),
    author = $form.find( "input[name='author']" ).val(),
    link = $form.find( "input[name='link']" ).val(),
    description = $form.find( "input[name='description']" ).val(),
    url = $form.attr( "action" );

  // Send the data using post
  var posting = $.post( url, { author : author, link : link, description : description} );

  // Put the results in a div
  posting.done(function( data ) {
    var content = $( data ).find( "#content" );
    $( "#testingAjax" ).empty().append( content );
  });
});
