(function (objectToModify) {
	var shipLib = objectToModify.shipLib = (objectToModify.shipLib || {});

	var MovingObject = objectToModify.movingObjectLib.MovingObject;
	var Bullet = objectToModify.bulletLib.Bullet;

	var Ship = shipLib.Ship = function (pos,vel,angle) {
		MovingObject.call(this, pos,vel, Ship.RADIUS, Ship.COLOR);
		this.angle = angle;
	}
	Ship.inherits(MovingObject);

	Ship.prototype.draw = function(ctx) {
		MovingObject.prototype.draw.call(this, ctx);
		var noseX = this.pos[0] + (Ship.RADIUS * Math.cos(this.angle));
		var noseY = this.pos[1] + (Ship.RADIUS * Math.sin(this.angle));
		var noseRadius = (Ship.RADIUS / 4);
		ctx.fillStyle = "black";
		    ctx.beginPath();

		    ctx.arc(
		      noseX,
		      noseY,
		      noseRadius,
		      0,
		      2 * Math.PI,
		      false
		    );

		    ctx.fill();

	}

	Ship.RADIUS = 16;
	Ship.COLOR = "red";
	Ship.TURNING_SPEED = 0.2;
	Ship.THRUST_STRENGTH = 0.2;
	Ship.FIRING_SPEED = 2;

	Ship.prototype.power = function(impulse) {
		this.vel[0] += impulse[0];
		this.vel[1] += impulse[1];
	}

	Ship.prototype.thrust = function() {
		impulseX = Math.cos(this.angle) * Ship.THRUST_STRENGTH;
		impulseY = Math.sin(this.angle) * Ship.THRUST_STRENGTH;
		this.power([impulseX, impulseY]);
	}

	Ship.prototype.turn = function(dir) {
		if (dir == "left") {
			this.angle -= Ship.TURNING_SPEED;
			this.angle = (this.angle + (2 * Math.PI)) % (2 * Math.PI);
		}
		else if (dir == "right") {
			this.angle += Ship.TURNING_SPEED;
			this.angle = (this.angle + (2 * Math.PI)) % (2 * Math.PI);
		}

	}

	Ship.prototype.fireBullet = function(game) {
		var bulletPositionX = this.pos[0];
		var bulletPositionY = this.pos[1];
		var bulletVelocityX = Math.cos(this.angle) * Ship.FIRING_SPEED;
		var bulletVelocityY = Math.sin(this.angle) * Ship.FIRING_SPEED;
		return new Bullet([bulletPositionX,bulletPositionY], [bulletVelocityX,bulletVelocityY],game);
	}

})(this);