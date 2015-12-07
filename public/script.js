$(document).ready(function(){

  var shop = function( value ) {
    alert(value)
  }

  $(".shop").click( function(){
    var shopFor =[]
    var value = this.value
    while (value>0) {
      var tempValue = Math.max(1,Math.floor(Math.random()*value))
      value = value - tempValue
      shopFor.push(tempValue)
    }
    shop(shopFor)
    });

  console.log(Basket.fetch())

});
