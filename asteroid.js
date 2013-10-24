(function (objectToModify) {
	var asteroidLib = objectToModify.asteroidLib = (objectToModify.asteroidLib || {});

	var MovingObject = objectToModify.movingObjectLib.MovingObject;

	var Asteroid = asteroidLib.Asteroid = function (pos,vel) {
		MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR );
	}

	Asteroid.COLOR = "black";
	Asteroid.RADIUS = 25;
	Asteroid.inherits(MovingObject);

	Asteroid.randomAsteroid = function(dimX,dimY) {
		var xPos = Math.random() * dimX;
		var yPos = Math.random() * dimY;
		var xVel = (Math.random() * 2) - 1;
		var yVel = (Math.random() * 2) - 1;
		return new Asteroid([xPos,yPos],[xVel,yVel]);
	}
})(this);