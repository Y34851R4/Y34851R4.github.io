window.addEventListener("load",function() {
	var canvas	= document.getElementsByTagName("canvas")[0],
		context	= canvas.getContext("2d"),
		width	= canvas.width	= window.innerWidth,
		height	= canvas.height	= window.innerHeight,
		fl = 300,
		obj = [],
		num = 100;
	
	for(i=0;i<num;i++) {
		obj[i] = {
			x: -1000+Math.random()*1000*2,
			y: -1000+Math.random()*1000*2,
			z: Math.random()*10000,
			a: 5
		}
	}

	context.translate(width/2,height/2);
	
	render();
	function render() {
		context.clearRect(-width/2,-height/2,width,height);
		for(i=0;i<num;i++) {
			var persp = fl/(fl+obj[i].z);
			
			context.save();
			context.translate(obj[i].x*persp,obj[i].y*persp);
			context.scale(persp,persp);
			context.beginPath();
			context.arc(-100,-100,10,0,Math.PI*2);
			context.fill();

				context.beginPath();
				context.moveTo(-100,-100);
				for(k=0;k<num;k++) {
					if(obj[i].z+400 > obj[k].z && obj[i].z < obj[k].z) {
					context.restore();
					context.save();
					persp = fl/(fl+obj[k].z);
					context.translate(obj[k].x*persp,obj[k].y*persp);
					context.scale(persp,persp);
					context.lineTo(-100,-100);
					context.stroke();
					}
				}
			
			context.restore();
			
			obj[i].z -= obj[i].a;
			if(obj[i].a < 50)
			obj[i].a += .1;
			if(obj[i].z < 0) {
				obj[i].x = -1000+Math.random()*1000*2;
				obj[i].y = -1000+Math.random()*1000*2;
				obj[i].z = 10000;
			}
		}
		requestAnimationFrame(render);
	}

});