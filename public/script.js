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
  // var shop = function( value ) {
  //   alert(value)
  // }
  //
  // $(".shop").click( function(){
  //   var shopFor =[]
  //   var value = this.value
  //   var numItems = Math.floor(Math.random()*5)+1
  //   var numItemsArr = []
  //   for (var i = 0; i < numItems; i++) {
  //       var itemAmt = Math.floor(Math.random()*100)+1
  //       numItemsArr.push(itemAmt)
  //   }
  //   var numItemsSum = numItemsArr.reduce((a,b) => a+b)
  //   console.log(numItemsArr)
  //   console.log(numItemsSum)
  //   for (var i = 0; i < numItemsArr.length; i++) {
  //     shopFor.push(Math.floor(numItemsArr[i]/numItemsSum*value))
  //   }
  //   console.log(shopFor.reduce((a,b) => a+b))
  //   alert(shopFor)
  // })
  //
  // console.log(Basket.fetch())

});
