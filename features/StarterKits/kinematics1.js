var mvmnt = [];
var loaded = {
	arr: [],
	play: false,
	record: false
};
var Arm = {
	length: 30,
	angle: 0,
	x: 0,
	y: 0,
	rx: 0,
	ry: 0,
	parent: null,
	create: function(x,y,length,angle) {
		var obj = Object.create(this);
		obj.init(x,y,length,angle);
		return obj;
	},
	init: function(x,y,length,angle) {
		this.x	= x;
		this.y	= y;
		this.rx	= x;
		this.ry	= y;
		this.length	= length;
		this.angle	= angle;
	},
	getendX: function() {
		return this.x + Math.cos(this.angle) * this.length;
	},
	getendY: function() {
		return this.y + Math.sin(this.angle) * this.length;
	},
	pointTo: function(x,y) {
		var dx = x - this.x,
			dy = y - this.y;
		this.angle = Math.atan2(dy,dx);
	},
	drag: function(x,y) {
		this.x = x - Math.cos(this.angle) * this.length;
		this.y = y - Math.sin(this.angle) * this.length;
	},
	render: function(context) {
		width = window.innerWidth;
		height = window.innerHeight;
		context.beginPath();
		context.lineWidth = 3;
		context.moveTo(this.x%width,this.y%height);
		context.lineTo(this.getendX(),this.getendY());
		context.stroke();
		context.beginPath();
		context.arc(this.x,this.y,3,0,Math.PI*2);
		context.fill();
	}
}
var joint = {
	arm: 0,
	create: function(x,y,length,angle) {
		var obj	= Object.create(this);
		obj.arm = Arm.create(x,y,length,angle);
		return obj;
	},
	update: function(context) {
		if(this.arm.parent) {
			this.arm.pointTo(this.arm.parent.x,this.arm.parent.y);
			this.arm.drag(this.arm.parent.x,this.arm.parent.y);
		}
		this.render(context);
	},
	render: function(context) {
		this.arm.render(context);
	}
}
window.addEventListener("load",function() {
	var canvas	= document.getElementsByTagName("canvas")[0],
		context	= canvas.getContext("2d"),
		width	= canvas.width	= window.innerWidth,
		height	= canvas.height	= window.innerHeight;

	var mousex = width/2,mousey = height/2;
	var joints	= [];
	var n=150;
	var valx=0;
	var valy=0;
	for(var i=0;i<n;i++) {
		joints[i] = joint.create(width/2,height/2,10,Math.random()*3);
	}
	for(var i=0;i<n;i++) {
		if(i!=0)
			joints[i].arm.parent	= joints[i-1].arm;
	}
	
	var apple = {
		x: 0,
		y: 100
	};
	
	document.addEventListener("mousemove",function(event) {
		mousey = event.clientY;
		mousex = event.clientX;
	});
	document.addEventListener("keydown",function(event) {
		if(event.keyCode == 37) {
			if(mousex > 0) {
				mousex -= 10;
				valx=-10;
				valy=0;
			}
		} else if(event.keyCode == 38) {
			if(mousey > 0) {
				mousey -= 10;
				valy=-10; valx=0;
			}
		} else if(event.keyCode == 39) {
			if(mousex < width) {
				mousex += 10;
				valx=10; valy=0
			}
		} else if(event.keyCode == 40) {
			if(mousey < height) {
				mousey += 10;
				valy=10; valx=0
			}
		} else if(event.keyCode == 80) { //p
			(loaded.play  == true) ? loaded.play = false : loaded.play = true;
		} else if(event.keyCode == 82) { //r
			(loaded.record  == true) ? loaded.record = false : loaded.record = true;
		}
		//alert(event.keyCode);
	});
	
	var angle=0;
	render();
	function render() {
		mousex+=valx;
		if(mousex < 0) mousex = 0;
		if(mousex > width) mousex = width;
		if(mousey >= height) mousey = height-5;
		if(mousey < 0) mousey = 0;
		mousey+=valy;
		
		context.clearRect(0,0,width,height);
		/*
		joints[0].arm.pointTo(mousex,mousey);
		joints[0].arm.drag(mousex,mousey);
		for(var i=0;i<n;i++) {
			joints[i].update(context);
		}
		*/
		
			joints[0].arm.pointTo(mousex,mousey);
			joints[0].arm.drag(mousex,mousey);
			for(var i=0;i<n;i++) {
				joints[i].update(context);
			}
		if(loaded.record == true) {
			loaded.arr.push(mousex);
			loaded.arr.push(mousey);
		}
		if(loaded.play == true) {
			playArray();
		} else requestAnimationFrame(render);
	}
	var j = 0;
	function playArray() {
		context.clearRect(0,0,width,height);
			//console.log("("+mvmnt[j]+","+mvmnt[++j]+")");
			joints[0].arm.pointTo(loaded.arr[j],loaded.arr[++j]);
			joints[0].arm.drag(loaded.arr[--j],loaded.arr[++j]);
			for(var i=0;i<n;i++) {
				joints[i].update(context);
			}
		j++;
		if(j < loaded.arr.length) requestAnimationFrame(playArray);
		else {
			loaded.play = false;
			render();
		}
	}
});