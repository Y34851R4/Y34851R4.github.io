window.addEventListener("load",function() {
	var canvas	= document.getElementsByTagName("canvas")[0],
		context	= canvas.getContext("2d"),
		width	= canvas.width	= window.innerWidth,
		height	= canvas.height	= window.innerHeight;

	context.translate(width/2,height/2);
	
	var points	= [],
		grav 	= .9,
		fl		= 1000,
		mvspeed	= 200,
		rtspeed	= 0.3,
		centerZ	= 100,
		xwall	= width/4,
		ywall	= height/2,
		zwall	= 1000,
		needsUpdate	= true;
	
	
	points[0] = {x: -xwall,y: -ywall,z: zwall};
	points[1] = {x: xwall,y: -ywall,z: zwall};
	points[2] = {x: xwall,y: ywall,z: zwall};
	points[3] = {x: -xwall,y: ywall,z: zwall};
	points[4] = {x: -xwall,y: -ywall,z: 0};
	points[5] = {x: xwall,y: -ywall,z: 0};
	points[6] = {x: xwall,y: ywall,z: 0};
	points[7] = {x: -xwall,y: ywall,z: 0};
	
	var obj	= {
		x: 0,
		y: 0,
		z: 0,
		r: 30,
		sx: 0,
		sy: 0,
		mass: .06,
		speedX: 3,
		speedY: .6,
		speedZ: .6,
		bounce: .6,
		acclX: 0,
		acclY: 0,
		acclZ: 0,
		create: function(x,y,z) {
			var obj	= Object.create(this);
			obj.x = x;
			obj.y = y;
			obj.z = z;
			return obj;
		},
		update: function() {
			this.gravitate();
			ball.hitWall();
			this.force();
			
			project3D(this);
			this.render();
		},
		force: function() {
			this.x += this.speedX;
			this.z += this.speedZ;
		},
		gravitate: function() {
			this.acclY	+= this.speedY;
			this.y	+= this.acclY;
		},
		hitWall: function() {
			if(this.x-this.r < -xwall) {
				this.x = -xwall+this.r;
				this.speedX = -this.speedX * this.bounce;
			}
			if(this.x+this.r > xwall) {
				this.x = xwall-this.r;
				this.speedX = -this.speedX * this.bounce;
			}
			if(this.y < -ywall) {
				this.y = -ywall;
				this.acclY = -(this.acclY * this.bounce);
			}
			if(this.y >= ywall) {
				this.y = ywall;
				this.acclY = -(this.acclY * this.bounce);
				this.speedX *= .9;
				this.speedZ *= .9;
			}
			if(this.z+this.r > zwall) {
				this.z = zwall-this.r;
				this.speedZ = -(this.speedZ * this.bounce);
			}
			if(this.z-this.r < centerZ) {
				this.z = centerZ+this.r;
				this.speedZ = -(this.speedZ * this.bounce);
			}
			
		},
		render: function() {
			context.beginPath();
			context.arc(this.sx,this.sy,this.r,0,Math.PI*2);
			context.fill();
		}
	}
	var ball	= obj.create(0,0,500);
	
	var leftKey,topKey,rightKey,downKey,spaceKey = false;
	var focuson = "ball";
	
	document.addEventListener("keyup",function(event) {
		key	= event.keyCode;
		if(key == 39)
			rightKey	= false;
		if(key == 38)
			topKey	= false;
		if(key == 37)
			leftKey	= false;
		if(key == 40)
			downKey	= false;
		if(key == 32)
			spaceKey= false;
		
		if(key == 70)
			focuson	= "field";
		else if(key == 66)
			focuson	= "ball";
		
		console.log(key);
	});
	document.addEventListener("keydown",function(event) {
	if(focuson == "ball") {
		key	= event.keyCode;
		if(key == 40)
			downKey		= true;
		if(key == 39)
			rightKey	= true;
		if(key == 38)
			topKey		= true;
		if(key == 37)
			leftKey		= true;
		if(key == 32)
			spaceKey	= true;
			
		if(leftKey)
			ball.speedX -= 5;
		if(topKey)
			ball.speedZ += 5;
		if(rightKey)
			ball.speedX += 5;
		if(downKey)
			ball.speedZ -= 5;
		if(spaceKey)
			ball.acclY	= -20;
	
	} else if( focuson == "field") {
		switch(event.keyCode) {
			case 37: //left
				if(event.ctrlKey)
					rotate3D('y',-rtspeed);
				else
					translate3D(points,-mvspeed,0,0);
				break;
			case 38: //up
				if(event.shiftKey)
					translate3D(points,0,0,mvspeed)
				else if(event.ctrlKey)
					rotate3D('x',-rtspeed);
				else
					translate3D(points,0,-mvspeed,0);
				break;
			case 39: //right
				if(event.ctrlKey)
					rotate3D('y',rtspeed);
				else
					translate3D(points,mvspeed,0,0);
				break;
			case 40: //down
				if(event.shiftKey)
					translate3D(points,0,0,-mvspeed);
				else if(event.ctrlKey)
					rotate3D('x',rtspeed);
				else
					translate3D(points,0,mvspeed,0);
				break;
		}
	}
		
	})

	
	function project3D(points) {
		if(!points[0]) {
			temp = [];
			temp.push(points);
			points = temp;
		}
		for(var i=0;i<points.length;i++) {
			var point	= points[i],
				persp	= fl / (fl + point.z + centerZ);
				
			point.sx	= point.x * persp;
			point.sy	= point.y * persp;
			
		}
	}
		
	function translate3D(points,x,y,z) {
		if(!points[0]) {
			temp = [];
			temp.push(points);
			points = temp;
		}
		for(var i=0;i<points.length;i++) {
			points[i].x += x;
			points[i].y += y;
			points[i].z += z;
			if(focuson == "field") {
				wallX = points[i].x;
				wallY = points[i].y;
				wallZ = points[i].z;
				ball.x += x;
				ball.y += y;
				ball.z += z;
			}
			console.log("("+points[i].x+","+points[i].y+","+points[i].z+")");
		}
		needsUpdate = true;
	}
	
	function nofunc(val) {
		return val;
	}
	
	function rotate3D(dim='x',angle,func=nofunc) {
		var cos	= Math.cos(angle),
			sin	= Math.sin(angle);
			
		for(var i=0;i<points.length;i++) {
			var point	= points[i],
				x	= y	= z	= null;
			
			if(dim == 'x') {
				y	= point.y * cos - point.z * sin;
				z	= point.z * cos + point.y * sin;
			} else if(dim == 'y') {
				x	= point.x * cos - point.z * sin;
				z	= point.z * cos + point.x * sin;
			}
			
			if(x!=null)
				point.x	= func(x);
			if(y!=null)
				point.y	= func(y);
			if(z!=null)
				point.z	= func(z);
		}
		needsUpdate = true;
	}
	
	function drawLine() {
		var p = points[arguments[0]];
		context.moveTo(p.sx,p.sy);
		for(var i=1;i<arguments.length;i++) {
			p	= points[arguments[i]];
			context.lineTo(p.sx,p.sy);
		}
	}
	
	
	render();
	function render() {
		context.clearRect(-width/2,-height/2,width,height);
		ball.update();

		context.restore();
		project3D(points);
		
		context.beginPath();
		drawLine(0,1,2,3,0);
		drawLine(4,5,6,7,4);
		drawLine(0,4);
		drawLine(1,5);
		drawLine(2,6);
		drawLine(3,7);
		context.stroke();
		
		needsUpdate = false;
		requestAnimationFrame(render);
	}
	
})