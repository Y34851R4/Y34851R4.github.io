window.addEventListener("load",function() {
	var canvas	= document.getElementsByTagName("canvas")[0],
		context	= canvas.getContext("2d"),
		width	= canvas.width	= window.innerWidth,
		height	= canvas.height	= window.innerHeight;


	var row = 10,
		col = 5,
		gap = 100,
		pts	= []

	for(var i=0;i<row;i++) {
		for(var j=0;j<col;j++) {
			pts.push({x: i*gap+gap,y: j*gap+gap});
		}
	}
	pts.forEach((pnt,ind) => {
		context.beginPath();
		context.arc(pnt.x,pnt.y,5,0,Math.PI*2);
		context.fill();
		if(ind > 10) {
			context.beginPath();
			context.moveTo(pnt.x,pnt.y);
			context.lineTo(pts[ind-10].x,pts[ind-10].y);
			context.stroke();
		}
	});
})