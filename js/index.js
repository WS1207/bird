window.onload=function(){
    var
    ctx = canvas.getContext('2d'),
    //是否检测到碰撞
    vs = false,
    //鸟
    bird = {x:400,y:210,w:30,h:30},
    //管道
    tunel = [
	{x:450,y:0,w:100,h:200},
	{x:450,y:310,w:100,h:200},
	{x:650,y:0,w:100,h:200},
	{x:650,y:280,w:100,h:200},
	{x:850,y:0,w:100,h:100},
	{x:850,y:240,w:100,h:200},
	{x:1050,y:0,w:100,h:180},
	{x:1050,y:240,w:100,h:200},
    ];
    canvas.addEventListener('click',function(e){
	bird.y -= 20;
    },false);

    var recvsrec =  function(rect0,rect1){
	if (rect0.x >= rect1.x && rect0.x >= rect1.x + rect1.w) {
	    return false;
	} else if (rect0.x <= rect1.x && rect0.x + rect0.w <= rect1.x) {
	    return false;
	} else if (rect0.y >= rect1.y && rect0.y >= rect1.y + rect1.h) {
	    return false;
	} else if (rect0.y <= rect1.y && rect0.y + rect0.h <= rect1.y) {
	    return false;
	}
	return true;
    };
    var draw = function(){
	ctx.clearRect(0,0,800,600);
	bird.y += 1;
	ctx.fillRect(bird.x,bird.y,bird.w,bird.h);
	tunel.map(function(d,i){
	    d.x -= 3;
	    //柱子超出画布后 随机生成符合一定规则的柱子
	    if( d.x < -100){
		d.x = 800;
		// d.h = Math.random()
		// console.log(d);
		// d.y =
	    }
	    //只在鸟过柱子区域的时候才判断碰撞
	    if(d.x < 430 && d.x >300 ){
		if( recvsrec(bird,d) ){
		    vs = true;
		}
	    }
	    ctx.fillRect(d.x,d.y,d.w,d.h);
	});
	if( bird.y > 370 || bird.y < 0 || vs ){
	    return;
	}
	requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
};
