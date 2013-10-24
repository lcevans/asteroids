//figure out namespacing

(function (objectToModify) {
	var movingObjectLib = objectToModify.movingObjectLib = (objectToModify.movingObjectLib || {});


	var MovingObject = movingObjectLib.MovingObject = function (pos, vel, radius, color) {
		this.pos = pos;
		this.vel = vel;
		this.radius = radius;
		this.color = color;
	};

	MovingObject.prototype.move = function (xDim,yDim) {
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
		this.pos[0] = (this.pos[0] + xDim) % xDim;
		this.pos[1] = (this.pos[1] + yDim) % yDim;
	};

	MovingObject.prototype.draw = function (ctx) {
		ctx.fillStyle = this.color;
		    ctx.beginPath();

		    ctx.arc(
		      this.pos[0],
		      this.pos[1],
		      this.radius,
		      0,
		      2 * Math.PI,
		      false
		    );

		    ctx.fill();
	};

	MovingObject.prototype.isCollidedWith = function (otherObject) {

		var distanceSquared = Math.pow((this.pos[0] - otherObject.pos[0]), 2)
											+ Math.pow((this.pos[1] - otherObject.pos[1]), 2);
		var distance = Math.sqrt(distanceSquared);
		return (distance < (this.radius + otherObject.radius));
	}
})(this);

