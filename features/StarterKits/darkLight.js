var canvas  = document.createElement("canvas"),
    context = canvas.getContext("2d"),
    width   = canvas.width = window.innerWidth,
    height  = canvas.height = window.innerHeight;

  
document.getElementsByTagName("body")[0].appendChild(canvas);

var ball = {
  x: 0,
  y: 0,
  r: 160,
  onMove: false,
  update: function() {
    if(!this.onMove)
      this.r > 20 ? this.r -= this.r/100 : null;
    this.render();
    this.onMove = false;
  },
  render: function() {
    context.clearRect(0,0,width,height);
    context.fillStyle = "white";
    context.beginPath();
    context.arc(this.x,this.y,this.r,0,Math.PI*2);
    context.fill();
  }
}

document.addEventListener("mousemove",(ev) => {
  ball.x = ev.clientX;
  ball.y = ev.clientY;
  if(ball.r <= width/3)
    ball.r+= ball.r / 20;
  ball.onMove = true;
})

animate();
function animate() {

  ball.update();

  requestAnimationFrame(animate);
}
// context.fillRect(0,0,width,height);