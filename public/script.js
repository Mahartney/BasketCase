$(document).ready(function(){
  $('.shop').on('click', function(){
    $('.section').remove();
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

        $.getJSON('/baskets/'+res._id).done(function(res){
          var view = new BasketView(res);
          view.render();
          console.log("success:" + res)
        }).fail(function(res){
          console.log("failure:" + res)
        })

        })
    })
    // return request;





});
