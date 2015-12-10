var findBudget = function(budget){
  var shopFor = []

  // determines number of items to shop for
  var numItems = Math.floor(Math.random()*5)+1;
  var numItemsArr = []

  // determines array of prices to shop for
  for (var i = 0; i < numItems; i++) {
      var itemAmt = Math.floor(Math.random()*100)+1
      numItemsArr.push(itemAmt)
  }
  var numItemsSum = numItemsArr.reduce((a,b) => a+b)

  for (var i = 0; i < numItemsArr.length; i++) {
    shopFor.push(Math.floor(numItemsArr[i]/numItemsSum*budget))
  }

  return shopFor;
}

module.exports = findBudget
