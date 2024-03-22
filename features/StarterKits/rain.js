var vector = {
	x: 1,
	y: 0,
	create: function(x,y) {
		var obj = Object.create(this);
		obj.setX(x);
		obj.setY(y);
		return obj;
	},
	setX: function(val) {
		this.x = val;
	},
	setY: function(val) {
		this.y = val;
	},
	getX: function() {
		return this.x;
	},
	getY: function() {
		return this.y;
	},
	setAngle: function(angle) {
		var length = this.getLength();
		this.x = Math.cos(angle)*length;
		this.y = Math.sin(angle)*length;
	},
	setLength: function(length) {
		var angle = this.getAngle();
		this.x = Math.cos(angle)*length;
		this.y = Math.sin(angle)*length;
	},
	getAngle: function() {
		return Math.atan2(this.y,this.x);
	},
	getLength: function() {
		return Math.sqrt(this.x*this.x+this.y*this.y);
	}
}
{

	console.log("raining.")

	var canvas	= document.getElementById("kitCanvas"),
		context	= canvas.getContext("2d"),
		width	= canvas.width	= window.innerWidth,
		height	= canvas.height	= window.innerHeight;
	
		// context.fillStyle = 'red';
		// context.fillRect(0,0,width,height);
	var attrpx	= width/2
		// attrpy	= width/2,
		// speedx	= 0,
		// speedy	= 0,
		// attrs	= .1;

	var particle = {
		pos: null,
		grav: 0.5,
		accl: 0,
		radius: 0,
		bounce: 0.8,
		attrpx: width/2,
		speedx: 0,
		attrs: 0,
		attrf: 0.9,
		r: 0,
		g: 0,
		b: 0,
		create: function(x,y,rad) {
			var obj = Object.create(this);
			this.pos = vector.create(x,y);
			this.radius = rad;
			this.bounce -= this.radius/100;
			this.r = Math.random()*255;
			this.g = Math.random()*255;
			this.b = Math.random()*255;
			return obj;
		},
		gravitate: function() {
			this.accl += this.grav + (this.radius/100);
			this.pos.y += this.accl;
			if(this.pos.getY() >= height-this.radius) this.scopey();//this.hitGround();
		},
		hitGround: function() {
			this.pos.setY(height-this.radius);
			this.accl *= -1*this.bounce;
		},
		update: function() {
			this.attract();
			this.gravitate();
			this.scopex();
			this.render();
		},
		scopex: function() {
			if(this.pos.x > width+this.radius) this.pos.x = 0;
			if(this.pos.x < -1*this.radius) this.pos.x = width;
		},
		scopey: function() {
			if(this.pos.y > height+this.radius) this.pos.y = 0;
			if(this.pos.y < -1*this.radius) this.pos.y = height;
			this.accl = 0;
		},
		attract: function() {
			this.speedx *= this.attrf;
			this.speedx += (attrpx - this.pos.getX())*this.attrs;
			this.pos.x += this.speedx;
		},
		render: function() {
			context.beginPath();
			context.arc(this.pos.getX(),this.pos.getY(),this.radius,0,Math.PI*2);
			context.fill();
			context.fillStyle = "rgb("+this.r+","+this.g+","+this.b+")";
		}
	}
	
	
	var ball = new Array(500);
	for(var i=0;i<ball.length;i++) {
		ball[i] = Object.create(particle);
		ball[i].create(width-(Math.random()*width),(height/2)-(Math.random()*height/2),10-(Math.random()*8));
	}

	render();
	function render() {
		context.clearRect(0,0,width,height);
		for(i=0;i<ball.length;i++) {
			ball[i].update();
		}
		
		requestAnimationFrame(render);
	}
	
	document.addEventListener("mousemove",function(event) {
		attrpx = event.clientX;
	});
	document.addEventListener("mousedown",function(event) {
		for(i=0;i<ball.length;i++) {
			ball[i].attrs = .1;
		}
	});
	document.addEventListener("mouseup",function(event) {
		for(i=0;i<ball.length;i++) {
			ball[i].attrs = 0;
		}
	});
};






















