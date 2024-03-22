const ray = {
	dx: 0,
	dy: 0,
	angle: 0,
  obj: null,
  w: 400,
	color: '',
	image: null,
	udpate: function() {
		this.dx = this.obj.spoint.x - this.obj.part.position.getX();
		this.dy = this.obj.spoint.y - this.obj.part.position.getY();
		this.angle = Math.atan2(this.dy,this.dx);
	},
	render: function(context) {
		context.beginPath();
		context.moveTo(0,0);

		
		context.fillStyle = this.color;
		context.lineTo(-this.w,this.w);
		context.arc(0,this.w,this.w,0,Math.PI)
		context.lineTo(this.w,this.w);
		context.moveTo(0,0);
		context.fill();	

		if(this.image) {
			// context.globalCompositeOperation = "destination-over";
			context.drawImage(this.image, -15, -20, 30, 30);
			context.globalCompositeOperation = "source-over";
		}
		
	}
}

export default ray;