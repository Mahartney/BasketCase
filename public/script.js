$(document).ready(function(){

  var shop = function( value ) {
    alert(value)
  }

  $(".shop").click( function(){
    var shopFor =[]
    var value = this.value
    var numItems = Math.floor(Math.random()*5)+1
    var numItemsArr = []
    for (var i = 0; i < numItems; i++) {
        var itemAmt = Math.floor(Math.random()*100)+1
        numItemsArr.push(itemAmt)
    }
    var numItemsSum = numItemsArr.reduce((a,b) => a+b)
    console.log(numItemsArr)
    console.log(numItemsSum)
    for (var i = 0; i < numItemsArr.length; i++) {
      shopFor.push(Math.round(numItemsArr[i]/numItemsSum*value))
    }
    console.log(shopFor.reduce((a,b) => a+b))
    alert(shopFor)
  })

});
