var Blink1 = require('node-blink1');

module.exports = blink =function(){
  this.blink1 = new Blink1();
}
blink.prototype.red = function(){
  this.blink1.setRGB(255, 0, 0, function(){});
};
blink.prototype.green = function(){
  this.blink1.setRGB(0, 255, 0, function(){});
};
blink.prototype.off = function(){
  this.blink1.setRGB(0, 0, 0);
  // this.blink1.close();
};
