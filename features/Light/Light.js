import { createStore } from 'state-pool';
import particle from '../../utils/particle'
import { springObj } from '../../utils/Spring';
import ray from './Ray';


ray.obj = springObj;

const Bulb = createStore();
Bulb.setState('LightOff',false);


async function Light(canv='lightCanvas') {
	// const [light] = Bulb.useState('LightOff');
	var light = true;

  const canvas  = document.getElementById(canv),
        context = canvas.getContext("2d"),
        width   = canvas.width  = window.innerWidth,
        height  = canvas.height = window.innerHeight;
				
	const blackhole = particle.create((canvas.width/2) - (springObj.l) - 150,(canvas.width)/7,10,0);
	blackhole.mass = canvas.width*30;
	const blackhole2 = particle.create(width-(width/4),(springObj.l)+120,10,0);
	blackhole2.mass = 10000;
	const blackhole3 = particle.create((canvas.width/2) + (springObj.l) + 150,(canvas.width)/7,10,0);
	blackhole3.mass = canvas.width*30;


	
	const gradient = context.createRadialGradient(0,0,0,0,ray.w,ray.w);
	// const gradient = context.createLinearGradient(0,ray.w,ray.w,0);
	gradient.addColorStop(0, 'orange');
	gradient.addColorStop(1, 'black');
	ray.color = gradient;
	
	const img = new Image();
	img.src = require('../../assets/images/jcole.png')
	ray.image = img;
	
	// ray.w = canvas.width/2;

// setTimeout(() => LightOff = true,3000)
	var t  = render();
	
	function mouseHandle(event) {
		if(!light) {
		// 	requestAnimationFrame(render);
			light=true;
		}
		blackhole2.position.x = event.clientX;
		if(event.clientX < (width/2)-250) blackhole2.position.x = (width/2)-250;
		if(event.clientX > (width/2)+250) blackhole2.position.x = (width/2)+250;
	}
	canvas.parentElement.addEventListener("mouseenter",() => {
		light=true;
		render();
	})

	canvas.parentElement.addEventListener("mousemove",(ev) => mouseHandle(ev));
	canvas.parentElement.addEventListener("mouseout",function(event) {
		light=false;
		// cancelAnimationFrame(t);
		// console.log('light out')
	})


	function render() {
		// if(!light)
		// 	return true;

		context.beginPath();
		context.clearRect(0,0,width,height);		
		springObj.part.gravitateTo(blackhole);
		springObj.part.gravitateTo(blackhole2);
		springObj.part.gravitateTo(blackhole3);

		springObj.update();
		springObj.render(context);

		context.save();
		context.translate(springObj.part.position.x,springObj.part.position.y);		
		context.rotate(ray.angle+(Math.PI/2));

		
		context.fill();
		ray.udpate();
		ray.render(context);
		context.restore();
		
		// // blackhole helpers
		// context.beginPath();
		// context.arc(blackhole.position.x,blackhole.position.y,20,0,Math.PI*2);
		// context.fill();
		// context.save();
		// context.fillStyle = "grey";
		// context.beginPath();
		// context.arc(blackhole2.position.x,blackhole2.position.y,20,0,Math.PI*2);
		// context.fill();
		// context.restore();
		// context.beginPath();
		// context.arc(blackhole3.position.x,blackhole3.position.y,20,0,Math.PI*2);
		// context.fill();


		if(light) requestAnimationFrame(render);
	}

}


export {Light as default, Bulb};