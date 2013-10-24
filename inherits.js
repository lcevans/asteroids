// function Surrogate () {};
//
// Surrogate.prototype = SuperClass.prototype;
//
// Subclass.prototype = new Surrogate();

Function.prototype.inherits = function(superclass) {
	//this == Subclass
	//superclass methods and attributes transferred to this:
	function Surrogate () {
		this.superr = superclass;
	};
	Surrogate.prototype = superclass.prototype;
	this.prototype = new Surrogate();
	// superclass.apply(this, )

}

function Animal(name) {
	this.name = name;

}

Dog.inherits(Animal)

function Dog(name, coat){
	this.superr.call(this, name)
	this.coat = coat;
}

dog = new Dog("Buster", "red");
console.log(dog.name);

//Subclass.inherits(SuperClass);
