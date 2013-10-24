(function (objectToModify) {
  var bulletLib = objectToModify.bulletLib = (objectToModify.bulletLib || {});

	var MovingObject = objectToModify.movingObjectLib.MovingObject;

	var Bullet = bulletLib.Bullet = function(pos, vel,game) {
		this.lifetime = Bullet.LIFETIME;
		this.game = game;
		MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
  }

  Bullet.inherits(MovingObject);
	Bullet.RADIUS = 4;
	Bullet.COLOR = "blue";
	Bullet.LIFETIME = 5000;

	Bullet.prototype.age = function (time){
		this.lifetime -= time;
		if (this.lifetime <= 0) {
			this.game.removeBullet(this);
		}
	}

	Bullet.prototype.hitAsteroids = function(asteroids) {
		var that = this;
		asteroids.forEach( function(asteroid) {
			if (that.isCollidedWith(asteroid)) {
				that.game.removeAsteroid(asteroid);
				that.game.removeBullet(that);
			}
		});
	}

})(this);