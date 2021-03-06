$(document).ready(function(){
  var active = false;
  var clickEvent = function(){
    $('.shop').unbind()
    var preloadAnimation =  $('<div class="preloader-wrapper big active"><div class="spinner-layer spinner-green-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>')
    $('.basket').children().remove();
    $('.basket').append(preloadAnimation)

    var data = {
      //user: currentUser,
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
          $('.shop').on('click', clickEvent)
          console.log("success:" + res)
        }).fail(function(res){
          console.log("failure:" + res)
        })

        })
    }


  $('.shop').on('click', clickEvent)
    // return request;
    popMostRecent()

    var intervalID = window.setInterval(popMostRecent, 10000)
});
