$(document).ready(function(){
  $('.shop').on('click', function(){
    var data = {
      // user: currentUser,
      budget: this.value
    }
    console.log(data)
    var request = $.ajax({
      url: '/baskets',
      method: 'post',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).then(
      function(res) {
        console.log('success')
        console.log(res)
      }, function(res) {
        console.log(res)
      }
    );
    return request;
  })

});
