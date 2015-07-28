
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

    console.log('user', user);

      $('.edit_button').hide();
      $('.delete_button').hide();

      var imgInfo = $(this).data('imgdata');

    //Insert a form to the page two buttons to submit/cancel
      createEditForm(imgInfo);

    //attach another listener to this form.

    $('.edit_form').submit(function (event){

      event.preventDefault();
      var data = $(this).serialize();

      $.ajax({
        url : $(this).attr('action'),
        type : 'PUT',
        data : data,
        success : function (serverRes) {
                  replaceContent(serverRes);
                  $('.edit_form').hide();
                  $('.edit_button').show();
                  $('.delete_button').show();
                }
      });
    });
  });

  //used for login ajax funtionality
  // $('.login_form').submit(function (event){

  //   event.preventDefault();



  //   var data = $(this).serialize();

  //   $.post($(this).attr('action'), data, function (serverRes){

  //       //repost the plus button with just the add photo button

  //       //render the top heading with the logout button



  //     $('#plusButton').foundation('reveal', 'close');
  //   })
  //   .error(function(error){
  //     alert('Youve got an error man')
  //   });


  // })

});


function replaceContent(imgData){
  var individualPageAuthorHead = $('.individual_page_author_head');
  var individualPageAuthorHeadUrl = $('<span>',{
    class : 'spanlink',
    text : imgData.link
  })

  var individualPageImage = $('.individual_page_image')
  var individuualPageDesc = $('.individual_description');

  individualPageAuthorHead.html(imgData.author + ' - ');
  individualPageAuthorHead.append(individualPageAuthorHeadUrl);
  individualPageImage.css('background-image', 'url(' + imgData.link + ')')
  individuualPageDesc.html(imgData.description);
};

function createEditForm(imgInfo){
  var postContainer = $('.individual_page_content_container');

  var editForm = $('<form>', {
    class : 'edit_form'
  })

  var editFormInputA = $('<input>', {
    type : 'text',
    name : 'author',
    value : imgInfo.author,
    onFocus : "this.value=''",
    autocomplete : 'off',
    required : true
  })

  var editFormInputB = $('<input>', {
    type : 'url',
    name : 'link',
    value : imgInfo.link,
    onFocus : "this.value=''",
    autocomplete : 'off',
    required : true
  })

  var editFormInputC = $('<input>', {
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

  editForm.append(editFormInputA, editFormInputB, editFormInputC, submitFormButton);
  postContainer.append(editForm);
};

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
};