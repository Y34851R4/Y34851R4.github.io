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
	
	var numCards = 200,
	cards	= [],
	fl	= 100,
	centerZ	= 10,
	radius	= 200,
	angle = 0,
	speed = 0.02,
	y = 0;
	
	for(var i=0;i<numCards;i++) {
		var card = {
			y: -200 + i * 2,
			angle: 0.2 * i,
		}
		card.x = Math.cos(angle) * radius;
		card.z = Math.sin(angle) * radius;
		
		cards.push(card);
	}
	var posy  = 0;
	document.addEventListener("mousemove",function(event) {
		posy = (event.clientY - height/2) * 0.009;
		console.log(posy);
	})
	
	render();
	function render() {
		context.clearRect(-width/2,-height/2,width,height);
		for(var i=0;i<numCards;i++) {
			var card	= cards[i],
				persp	= fl / (fl + card.z);
			
			context.save();
			context.scale(persp,persp);
			context.translate(card.x,card.y);

			context.beginPath();
			context.arc(0,0,5,0,Math.PI*2);
			context.fill();

			context.restore();
			
			card.x = Math.cos(card.angle + speed) * radius;
			card.z = centerZ + Math.sin(card.angle + speed) * radius;
			card.y += posy;
		}
		speed += 0.03;
		requestAnimationFrame(render);
	}
})