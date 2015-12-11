$(document).ready(function(){
  $('.shop').on('click', function(){
    var preloadAnimation =  $('<div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>')
    $('.basket').children().remove();
    $('.basket').append(preloadAnimation)
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
    popMostRecent()

    var intervalID = window.setInterval(popMostRecent, 10000)
});
