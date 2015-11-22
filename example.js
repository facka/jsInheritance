var Define = require('./jsinheritance');

var Shape = function Shape(properties) {
  this.position = properties.position;
};

Shape.prototype.toString = function() {
  return "I am a Shape at " + this.position;
};

Shape.prototype.move = function(x, y) {
  this.position.x += x;
  this.position.y += y;
};

Define(Shape).as('Object');

var Rectangle = function Rectangle(properties) {
  Rectangle.super(this, properties);
  this.width = properties.width;
  this.height = properties.height;
};

Rectangle.super = Define(Rectangle).as(['Shape']);

Rectangle.prototype.toString = function() {
  return "I am a Rectangle!" + JSON.stringify(this);
};

Rectangle.prototype.getArea = function() {
  return this.width * this.height;
};

var Square = function Square(properties) {
  var parentProps = {
      width: properties.size,
      height: properties.size,
      position: properties.position
  };
  Square.super(this, parentProps);
};

Square.super = Define(Square).as(['Rectangle']);

Square.prototype.toString = function() {
  return "I am a Square!" + JSON.stringify(this);
};

var square = new Square({size: 100});
var rect = new Rectangle({width: 100, height: 200});


console.log(square.toString());
console.log(rect.toString());

rect.move(10, 10);

console.log(rect.toString());
