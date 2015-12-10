$(document).ready(function(){
  $('.shop').on('click', function(){
    $('.bakset').append('<div')
    var data = {
      // user: currentUser,
      budget: this.value
    }
    var request = $.ajax({
      url: '/baskets',
      method: 'post',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(function(res){
        console.log(res)
        console.log(res._id)
        $.getJSON('/baskets/'+res._id).done(function(res){
          console.log("success:" + res)
          alert('hi')
        }).fail(function(res){
          console.log("failure:" + res)
        })

        })
    })
    // return request;





});
