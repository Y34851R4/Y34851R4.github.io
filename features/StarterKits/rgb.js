{
	var canvas	= document.getElementsByTagName("canvas")[1],
		targetCanvas	= document.getElementsByTagName("canvas")[2],
		targetContext	= targetCanvas.getContext("2d"),
		context	= canvas.getContext("2d"),
		width	= canvas.width	= targetCanvas.width	= window.innerWidth,
		height	= canvas.height	= targetCanvas.height	= window.innerHeight;
	
	var draw = false;
	
	document.addEventListener("keydown",function(ev) {
		if(ev.keyCode == 17) {
			draw = !draw;
		}
	});
	document.addEventListener("mousemove",function(event) {
		if(draw) {
			targetContext.beginPath();
			targetContext.fillRect(event.clientX,event.clientY,10,10)
		}
	})
	
	var speedx	= 0,
		speedy	= 0,
		accly	= 0,
		attrs	= 0,
		fric	= 0.9,
		gravity	= 0.1,
		bounce	= 0.9,
		bsize	= 50,
		attrpx	= width/2,
		attrpy	= height/2,
		attrf	= 1,
			x	= width/2,
			y	= bsize,
			r = 0, g = 0, b = 0;

	render();
	function render() {
		speedx *= attrf;
		speedx += (attrpx - x) * attrs;
		x += speedx;
		
		accly	+= gravity;
		speedy	+= accly;
		speedy	*= attrf;
		speedy	+= (attrpy - y) * attrs;
		y += speedy;
		
		if(x<bsize) {
			x = bsize;
			speedx = -(speedx * bounce);
			r += Math.floor(70 * bounce);
			g -= Math.floor(20 * bounce);
			b -= Math.floor(20 * bounce);
		}
		if(x > width - bsize) {
			x = width - bsize;
			speedx = -(speedx * bounce);
			b += Math.floor(70 * bounce);
			g -= Math.floor(20 * bounce);
			r -= Math.floor(20 * bounce);
		}
		if(y<bsize) {
			y = bsize;
			speedy = -(speedy * bounce);
			g += Math.floor(70 * bounce);
			r -= Math.floor(20 * bounce);
			b -= Math.floor(20 * bounce);
		}
		if(y>height-bsize) {
			y = height - bsize;
			speedx	*= fric;
			speedy	= -(speedy * bounce);
		}
		
		var imageData = targetContext.getImageData(x,y,9,9);
		if(imageData.data[3] > 0) {
			accly = 0;
			speedx = -(speedx * bounce);
			speedy	= -(speedy * bounce);
		}
		
		if(r > 255) r = 255;
		if(g > 255) g = 255;
		if(b > 255) b = 255;
		if(r < 0) r = 0;
		if(g < 0) g = 0;
		if(b < 0) b = 0;
		
		context.clearRect(0,0,width,height);
		context.beginPath();
		context.arc(x,y,bsize,0,Math.PI*2);
		context.fillStyle = "rgb("+r+","+g+","+b+")";
		context.fill();
		
		requestAnimationFrame(render);
	}
	
	document.addEventListener("mousedown", function(event) {
		attrs	= 0.1;
		bounce	= 0;
		gravity	= 0;
		accly	= 0;
		attrf	= 0.8;
	});
	document.addEventListener("mouseup", function(event) {
		attrs	= 0;
		bounce	= 0.8;
		gravity	= 0.1;
		attrf	= 1;
	});
	
	document.addEventListener("mousemove",function(event) {
		attrpx = event.clientX;
		attrpy = event.clientY;
	});
	
}