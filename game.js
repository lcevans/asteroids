(function (objectToModify) {

  var gameLib = objectToModify.gameLib = (objectToModify.gameLib || {});

	var Asteroid = objectToModify.asteroidLib.Asteroid;
	var Ship = objectToModify.shipLib.Ship;

	var Game = gameLib.Game = function (ctx) {
		this.level = 1;
		this.ctx = ctx;
		this.asteroids = [];
		this.bullets = [];
		this.ship = new Ship([Game.DIM_X / 2, Game.DIM_Y / 2], [0,0], 0);
  }

	Game.DIM_X = 1000;
	Game.DIM_Y = 700;
	Game.FPS = 10;
	Game.MAX_BULLETS = 5;
	Game.ASTEROIDS_PER_LEVEL = 3;

	Game.prototype.addAsteroids = function (numAsteroids) {
		for (var i = 0; i < numAsteroids; i++) {
			this.asteroids.push(Asteroid.randomAsteroid(Game.DIM_X,Game.DIM_Y));
		}
	}

	Game.prototype.draw = function () {
		this.ctx.clearRect(0,0,Game.DIM_X,Game.DIM_Y);
		this.asteroids.forEach (function (asteroid) {
			asteroid.draw(this.ctx);
		});

		this.bullets.forEach (function (bullet) {
			console.log(bullet);
			bullet.draw(this.ctx);
		});
		this.ship.draw(this.ctx);
	}

	Game.prototype.fireBullet = function() {
		this.bullets.push(this.ship.fireBullet(this));
		if (this.bullets.length > Game.MAX_BULLETS) {
			this.bullets.shift();
		}

	}

	Game.prototype.move = function () {
		this.asteroids.forEach (function (asteroid) {
			asteroid.move(Game.DIM_X, Game.DIM_Y);
		})
		this.bullets.forEach (function (bullet) {
			bullet.move(Game.DIM_X, Game.DIM_Y);
			bullet.age(Game.FPS);
		});
		this.ship.move(Game.DIM_X, Game.DIM_Y);
	}

	Game.prototype.step = function () {
		if (this.checkWon()) {
			alert("You beat level " + this.level + "!");
			this.level++;
			this.resetGame();
		}

		this.checkCollisions();
		this.move();
		this.draw();
	}

	Game.prototype.start = function () {
		this.bindKeyHandlers();
		this.addAsteroids(this.level * Game.ASTEROIDS_PER_LEVEL);
		alert("Get ready for level " + this.level);
		this.ship.color = prompt("What color spaceship do you want? ")
		this.gameStart = setInterval(this.step.bind(this), Game.FPS);
	}

	Game.prototype.resetGame = function () {
		this.asteroids = [];
		this.bullets = [];
		this.ship.pos = [Game.DIM_X / 2, Game.DIM_Y / 2]
		this.ship.vel = [0,0];
		clearInterval(this.gameStart);
		this.unbindKeyHandlers();
		this.start();
	}

	Game.prototype.checkCollisions = function () {
		var that = this;
		this.bullets.forEach ( function (bullet) {
			bullet.hitAsteroids(that.asteroids);
		});

		this.asteroids.forEach (function(asteroid) {
			if (asteroid.isCollidedWith(that.ship)) {
				alert("Game over!");
				that.level = 1;
				that.resetGame();
			}
		})
	}

	Game.prototype.checkWon = function () {
		return (this.asteroids.length == 0)
	}

	Game.prototype.stop = function() {
		clearInterval(this.gameStart);
		alert("Click okay to continue.")
		this.gameStart = setInterval(this.step.bind(this), Game.FPS);
	}

	Game.prototype.removeBullet = function (bullet) {
		var index = this.bullets.indexOf(bullet);
		if (index > -1) {
			this.bullets.splice(index,1);
		}
	}

	Game.prototype.removeAsteroid = function (asteroid) {
		var index = this.asteroids.indexOf(asteroid);
		if (index > -1) {
			this.asteroids.splice(index,1);
		}
	}

	Game.prototype.bindKeyHandlers = function() {
		var that = this;
		key('p', function(){ that.stop(); });
		key('left', function(){ that.ship.turn("left")} );
		key('right', function(){ that.ship.turn("right")} );
		key('up', function(){ that.ship.thrust()} );
		key('space', function(){ that.fireBullet()} );
	}

	Game.prototype.unbindKeyHandlers = function() {
		var that = this;
		key.unbind('p');
		key.unbind('left');
		key.unbind('right');
		key.unbind('up');
		key.unbind('space');
	}


})(this);