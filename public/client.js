function onDelete(id) {
  console.log('isthishappening');
  sel = '#id_' + id;
  userId = $(sel).find('td:eq(0)').text();
  $.ajax({url:'/users/' + userId,type:'DELETE'}).done(function() {
    window.location.href = "/";
  });
}