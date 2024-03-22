window.addEventListener("load",function() {
	var canvas	= document.getElementsByTagName("canvas")[0],
		context	= canvas.getContext("2d"),
		width	= canvas.width	= window.innerWidth,
		height	= canvas.height	= window.innerHeight,
		
		spoint	= vector.create(width/2,height/2),
		part	= particle.create(Math.random()*width,Math.random()*height,0,Math.PI/3),
		k	= 0.1;
		
		part.friction = .9;
		
		document.addEventListener("mousemove",function(event) {
			spoint.x = event.clientX;
			spoint.y = event.clientY;
		});
		

		var spring = {
			create: function(x,y,l,angle) {
				var obj = Object.create(this);
				obj.spoint	= vector.create(x,y),
				obj.part	= particle.create(Math.random()*width,Math.random()*height,l,angle)
				return obj;
			},
			update: function() {
				var sdist = this.spoint.subtract(this.part.positon),
					sforce = sdidst.multiply(k);

				this.part.velocity.addTo(sforce);
				this.part.update();
			}
		}

		render();
		function render() {
			
			var sdist = spoint.subtract(part.position),
				sforce = sdist.multiply(k);
			
			part.velocity.addTo(sforce);
			
			part.update();
			
			context.beginPath();
			context.clearRect(0,0,width,height);
			context.arc(spoint.x,spoint.y,2,0,Math.PI*2);
			context.fill();
			
			context.beginPath();
			context.arc(part.position.getX(),part.position.getY(),20,0,Math.PI*2);
			context.fill();
			
			context.beginPath();
			context.moveTo(spoint.x,spoint.y);
			context.lineTo(part.position.getX(),part.position.getY());
			context.stroke();
			
			requestAnimationFrame(render);
		}
});






















