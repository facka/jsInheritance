
var classes = {
  'Object' : Object
};

var Define = function(child) {

  var name = child.name;
  if (name === 'Function') {
    throw 'Error: Cannot define an unnamed class.';
  }

  classes[name] = child;

  var extend = function(child, parent) {
    for (var i in parent.prototype) {
      child.prototype[i] = parent.prototype[i];
    }
  };


  return {
    as : function(parents) {
      if ( !( (typeof parents) === "object" && parents.length) ) {
        parents = [parents];
      }
      child.parents = {};

      parents.forEach(function(parent) {
        var Parent = classes[parent];
        if (!Parent) {
          throw 'Parent ' + parent + ' is not defined.'
        }
        extend(child, Parent);
        child.parents[parent] = Parent.prototype;
      });

      child.prototype.constructor = child;

      return function(/*this, arguments*/) {
        var args = Array.prototype.slice.call(arguments);
        var self = args.shift();
        parents.forEach(function(parent) {
            var Parent = classes[parent];
            Parent.apply(self, args);
        });
      };
    }
  };
};

module.exports = Define;
