var Define = require('jsinheritance');

//Define Shape class as usually using prototype pattern
var Shape = function Shape(properties) {
  this.position = properties.position || {x:0 , y:0};
};
//Define Shape class extends Object class
Define(Shape).as('Object');
Shape.prototype.toString = function() {
  return "I am a Shape at " + this.position;
};
Shape.prototype.move = function(x, y) {
  this.position.x += x;
  this.position.y += y;
};


//Define Rectangle class as usually using prototype pattern
var Rectangle = function Rectangle(properties) {
  Rectangle.super(this, properties); //Call super constructor
  this.width = properties.width;
  this.height = properties.height;
};
//Define Rectangle class extends Shape class and save super constructor
//Important: this line must be after the constructor and before prototype functions definition
Rectangle.super = Define(Rectangle).as(['Shape']);

Rectangle.prototype.toString = function() {
  return "I am a Rectangle!" + JSON.stringify(this);
};
Rectangle.prototype.getArea = function() {
  return this.width * this.height;
};

//Define Square class as usually using prototype pattern
var Square = function Square(properties) {
  //Transform the constructor arguments before calling the super constructor
  var parentProps = {
      width: properties.size,
      height: properties.size,
      position: properties.position
  };
  Square.super(this, parentProps); //Call super constructor
};
//Define Square class extends Rectangle class and save super constructor
//Important: this line must be after the constructor and before prototype functions definition
Square.super = Define(Square).as(['Rectangle']);
Square.prototype.toString = function() {
  return "I am a Square!" + JSON.stringify(this);
};

//Now create the instance of the objects
var square = new Square({size: 100});
var rect = new Rectangle({width: 100, height: 200});
console.log('square',square); // It prints the type of the object!! :)
console.log('rect', rect); // It prints the type of the object!! :)
rect.move(10, 10);
console.log('rect', rect);
