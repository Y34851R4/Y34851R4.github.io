import vector from './vector.js'

var particle = {
	position: null,
	velocity: null,
	friction: 1,
	mass: 1,

	
	create: function(x,y,len,dir,grav) {
		var obj = Object.create(this);
		obj.position = vector.create(x,y);
		obj.velocity = vector.create(x,y);
		obj.velocity.setLength(len);
		obj.velocity.setAngle(dir);
		obj.gravity = vector.create(0,grav || 0);
		
		return obj;
	},
	update: function() {
		this.velocity.multiplyBy(this.friction);
		this.velocity.addTo(this.gravity);
		this.position.addTo(this.velocity);
	},
	angleTo: function(p2) {
		return Math.atan2(p2.position.getY() - this.position.getY(),p2.position.getX() - this.position.getX());
	},
	distanceTo: function(p2) {
		var dx = p2.position.getX() - this.position.getX(),
				dy = p2.position.getY() - this.position.getY();

		return Math.sqrt(dx * dx + dy * dy);
	},
	gravitateTo: function(p2) {
		var grav = vector.create(0,0),
				dist = this.distanceTo(p2);

		grav.setLength(p2.mass / (dist*dist));
		grav.setAngle(this.angleTo(p2));

		this.velocity.addTo(grav);
	}
}

export default particle;