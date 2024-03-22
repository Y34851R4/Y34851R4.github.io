window.addEventListener("load",function() {
	var canvas	= document.getElementsByTagName("canvas")[0],
		context = canvas.getContext("2d"),
		width	= canvas.width	= window.innerWidth,
		height	= canvas.height	= window.innerHeight;
	
	document.getElementsByClassName("canvcont")[0].innerHTML += "<div id='scorebar'>0</div><div id='gamebarcont'><div id='gamebar'><p>Flapyball</p><span><input type='button' value='Play'></span></div></div>";

	var gamebarcont = document.getElementById("gamebarcont"),
		gamebar	= document.getElementById("gamebar"),
		gameinf	= document.getElementById("infdisp"),
		scorebar	= document.getElementById("scorebar"),
		ball1 = null,block1 = null,block2 = null;
	
	gamebarcont.style.cssText = "display: block;position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.4);text-align: center;";
	gamebar.style.cssText = "background: #eee;display: inline-block;margin-top: 150px;padding: 10px;font-family: calibri;font-weight: bold;font-size: 20px;text-transform: capitalize;box-shadow: 0 0 5px 0 #333;";
	gamebar.children[1].children[0].style.cssText = "display: inline-block;width: 100px;height: 100px;cursor: pointer;";
	scorebar.style.cssText = "display: inline-block;position: fixed;top: 10px;left: 4%; font-size: 40px;font-weight: bold;";
	
	
	var game = {
		over: true,
		start: false,
		speed: 10,
		score: 0,
		begin: function() {
			ball.reset(ball1);
			block.reset(block1,width/2);
			block.reset(block2,width);
			gamebarcont.style.display = "none";
			this.over = false;
			scorebar.innerHTML = this.score;
			render();
		},
		end: function() {
			this.start = false;
			this.over = true;
			gamebarcont.style.display = "block";
			gamebar.children[0].innerHTML = "Game Over <br />";
			gamebar.children[0].innerHTML += "Score =  "+game.score;
			gamebar.children[1].children[0].value = "Retry";
			render();
			this.score = 0;
			this.speed = 10;
		},
		bar: function(disp) {
			document.getElementById(gamebar).style.display = disp;
		}
	}
	
	gamebar.children[1].children[0].addEventListener("click",function() {
		game.begin();
	});

	var ball = {
		x: 300,
		y: height/2,
		r: 30,
		bounce: 0.9,
		accl: 0,
		speed: 0.2,
		create: function(x,y) {
			var obj = Object.create(this);
			obj.x = x;
			obj.y = y;
			return obj;
		},
		reset: function(obj) {
			obj.x = ball.x;
			obj.y = ball.y;
			obj.accl = ball.accl;
			obj.speed = ball.speed;
		},
		update: function() {
			if(game.start)
				this.gravitate();
			this.draw();
		},
		gravitate: function() {
			this.accl += 0.9;
			this.y += this.accl;
			
			if(this.y-this.r < 0) this.y = this.r;			
			if(this.y+this.r >= height) this.hitground();
		},
		hitground: function() {
			this.y = height-this.r;
			this.accl *= -.3;
		},
		moveup: function() {
			this.accl = -13;
		},
		draw: function() {
			context.beginPath();
			context.arc(this.x,this.y,this.r,0,Math.PI*2);
			context.fill();
		},
	}
	var block = {
		x: 0,
		y: 0,
		g: 0,
		y2: 0,
		w: 30,
		h: 100,
		h2: 0,
		pass: true,
		create: function(x,y,w,h) {
			var obj = Object.create(this);
			obj.x = x;
			obj.y = y;
			obj.w = w;
			obj.g = Math.random()*300 + ball.r*2 + 50;
			obj.h = Math.random()*(height-obj.g) + 10;
			obj.y2 = obj.h + obj.g;
			obj.h2 = height - obj.h;
			return obj;
		},
		reset: function(obj,x) {
			obj.x = x;
			obj.y = block.y;
			obj.w = block.w;
			obj.g = Math.random()*300 + ball.r*2 + 50;
			obj.h = Math.random()*(height-obj.g) + 10;
			obj.y2 = obj.h + obj.g;
			obj.h2 = height - obj.h;
			obj.pass = block.pass;
		},
		update: function() {
			if(game.start) {
				this.move();
				this.collide(ball1);
				this.passcheck(ball1);
			}
			this.draw();
		},
		move: function() {
			if(game.speed >= 20) game.speed = 20;
			this.x -= game.speed;
			if(this.x+this.w < 0) this.repaint();
		},
		passcheck: function(obj) {
			if(this.pass == true) {
				if(this.x+this.w < obj.x) {
					game.score++;
					game.speed += .5;
					this.pass = false;
					scorebar.innerHTML = game.score;
				}
			}
		},
		repaint: function() {
			this.x = width;
			this.pass = true;
			this.g = Math.max(0,Math.random()*(300-game.score*5)) + ball.r*2+10;
			this.h = Math.random()*(height-this.g);
			this.y2 = this.h + this.g;
			this.h2 = height - this.h;
		},
		collide: function(obj) {
			var nearestx = Math.max(this.x,Math.min(obj.x,this.x+this.w)),
				nearesty = Math.max(this.y,Math.min(obj.y,this.y+this.h)),
				nearesty2 = Math.max(this.y2,Math.min(obj.y,this.y2+this.h2)),
				dx	= Math.max(nearestx,obj.x) - Math.min(nearestx,obj.x),
				dy	= Math.max(nearesty,obj.y) - Math.min(nearesty,obj.y),
				dy2	= Math.max(nearesty2,obj.y) - Math.min(nearesty2,obj.y),
				d	= Math.sqrt(dx*dx + dy*dy),
				d2	= Math.sqrt(dx*dx + dy2*dy2);
				
			if(d < obj.r || d2 < obj.r) game.end();
			//if(obj.x+obj.r > this.x && obj.y-obj.r <= this.y+this.h) gameover = true;
		},
		draw: function() {
			context.beginPath();
			context.fillRect(this.x,this.y,this.w,this.h);
			context.fillRect(this.x,this.y2,this.w,this.h2);
			context.fill();
		}
	}
	ball1 = ball.create(300,height/2);
	block1 = block.create(width/2,0,30,100);
	block2 = block.create(width,0,30,100);
	
	
	document.addEventListener("keydown",function(ev) {
		if(ev.keyCode == 38) {
			if(!game.over)
				game.start = true;
			ball1.moveup();
			ball1.keydown = true;
		}
	});

	render();
	function render() {
		context.clearRect(0,0,width,height);
		ball1.update();
		block1.update();
		block2.update();
		
		if(game.over == false)
		requestAnimationFrame(render);
	}
});