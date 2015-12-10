var randomKeyword = function(){
  var keywordLibrary = ['book', 'screw', 'baseball', 'orange', 'jello', 'nuclear', 'balls',
    'crime', 'spice', 'grammar', 'whip', 'bag', 'supplies', 'tools', 'fruit', 'plant', 'apparel', 'furniture', 'electronics', 'sports', 'diy', 'parts', 'accessories'];
  var keyword = keywordLibrary[Math.floor(Math.random() * keywordLibrary.length)];
  return keyword;
}

module.exports = randomKeyword
