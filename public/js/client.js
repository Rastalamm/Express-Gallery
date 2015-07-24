
$(function(){

  $( "#addPhotoForm" ).submit(function ( event ) {

    event.preventDefault();

    var data = $(this).serialize();

    $.post($(this).attr('action'), data, function (serverRes){
      addImage(serverRes);
    })
    .error(function(error){
      alert('Youve got an error man')
    });
  });

  $('.modal_add_submit').on('click', function(){
    $('#plusButton').foundation('reveal', 'close');
  });
  // $('a.close-reveal-modal').trigger('click');
});


function addImage (imgData){

  var postRow = $('.post_house');

  var singlePost = $('<div>', {
    class : 'small-12 medium-4 columns single_post'
  });

  var imgHref = $('<a>', {
    href: 'gallery' + imgData.id,
  })

  var homeImage = $('<div>', {
    class : 'home_page_image',
    css : {'background-image' : 'url(' + imgData.link + ')'}
  })

  var author = $('<h3>', {
    class : 'author small-centered columns',
    text : 'Author: ' + imgData.author
  })

  var description = $('<p>', {
    class : 'description small-centered columns',
    text: imgData.description
  });


  imgHref.append(homeImage, author, description);
  singlePost.append(imgHref);
  postRow.append(singlePost)
}