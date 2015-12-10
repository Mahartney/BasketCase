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
    }).then(
      function(res) {
        return res;
      }, function(res) {
        console.log(res)
      }
    );
    // return request;

    var display = setInterval(displayItems, 1000);

    var displayItems = function(){
      var request = $.getJSON('/baskets/:id').then(function(res){
        $('.section').append('<div>'+res+'</div>')
      })

    }
  })




});
