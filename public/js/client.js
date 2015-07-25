
$(function(){

  $( "#addPhotoForm" ).submit(function ( event ) {

    event.preventDefault();

    var data = $(this).serialize();

    $.post($(this).attr('action'), data, function (serverRes){
      addImageToHome(serverRes);
      $('#plusButton').foundation('reveal', 'close');
    })
    .error(function(error){
      alert('Youve got an error man')
    });
  });



  $('.edit_button').on('click', function (){
    //hide the edit button from the page

      $('.edit_button').hide();

      var imgInfo = $(this).data('imgdata');

      console.log(imgInfo);
    //Insert a form to the page two buttons to submit/cancel
      createEditForm(imgInfo);

    //attach another listener to this form.
      //replace the content on the page with new data
      //remove the form
      //unhide the edit button
  })



});


function createEditForm(imgInfo){
  var postContainer = $('.individual_page_content_container');

  var editForm = $('<form>', {
    class : '#editForm'
  })

  var editFormInputA = $('<input>', {
    type : 'hidden',
    name : '_method',
    value : 'PUT'
  })

  var editFormInputB = $('<input>', {
    type : 'text',
    name : 'author',
    value : imgInfo.author,
    onFocus : "this.value=''",
    autocomplete : 'off',
    required : true
  })

  var editFormInputC = $('<input>', {
    type : 'url',
    name : 'link',
    value : imgInfo.link,
    onFocus : "this.value=''",
    autocomplete : 'off',
    required : true
  })

  var editFormInputD = $('<input>', {
    type : 'text',
    name : 'description',
    value : imgInfo.description,
    onFocus : "this.value=''",
    autocomplete : 'off',
    required : true
  })

  var submitFormButton = $('<input>', {
    type : 'submit',
    value : 'Submit'
  })

  editForm.append(editFormInputA, editFormInputB, editFormInputC, editFormInputD, submitFormButton);
  postContainer.append(editForm);
}







function addImageToHome (imgData){

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