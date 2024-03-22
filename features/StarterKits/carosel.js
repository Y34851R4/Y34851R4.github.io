window.addEventListener("load",function() {
	var canvas	= document.getElementsByTagName("canvas")[0],
		context	= canvas.getContext("2d"),
		targetcanvas	= document.getElementsByTagName("canvas")[1],
		targetContext	= targetcanvas.getContext("2d"),
		width	= canvas.width	= targetcanvas.width	= window.innerWidth,
		height	= canvas.height	= targetcanvas.height	= window.innerHeight;

	context.translate(width/2,height/2);
	
	function randomRange(min,max) {
		return Math.random() * (max-min) + min;
	}
	
	var numCards = 15,
	cards	= [],
	fl	= 1000,
	centerZ	= 400,
	radius	= 400,
	baseAngle = 0,
	speed = 0.02,
	y = 0;
	
	for(var i=0;i<numCards;i++) {
		var card = {
			y: 0,
			angle: Math.PI*2/numCards * i
		}
		card.x = Math.cos(card.angle + baseAngle) * radius;
		card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
		cards.push(card);
	}
	
	document.addEventListener("mousemove",function() {
		speed = (event.clientX - width/2) * 0.00007;
		y = (event.clientY - height/2)*3;
	});
	
	
	render();
	function render() {
		baseAngle += speed;
		context.clearRect(-width/2,-height/2,width,height);
		for(var i = 0;i<numCards;i++) {
			context.save();
			
			var persp = fl / (fl+cards[i].z)
			context.scale(persp,persp);
			context.translate(cards[i].x,y);
			
			context.fillRect(-100,-100,100,100);
			context.restore();

			cards[i].x = Math.cos(cards[i].angle + baseAngle) * radius;
			cards[i].z = centerZ + Math.sin(cards[i].angle + baseAngle) * radius;
			
		}
		
		requestAnimationFrame(render);
	}
})