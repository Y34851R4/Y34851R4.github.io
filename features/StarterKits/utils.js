function randRange(min,max,func=parseInt) {
	if(min < 0) prod = -1*min
	else prod = 0
	return func(min+(Math.random()*(max+prod)));
}
