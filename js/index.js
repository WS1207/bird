window.onload=function(){
  "use strict";
  // var W  = document.documentElement.clientWidth,
  //     H = document.documentElement.clientHeight;
  var W = 400,H = 600;
  // 检测矩形之间的碰撞
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

  // 根据屏幕大小生成管道数据
  var generateTunel = (function(){
    var spec = 100, w = 100,
	len = Math.ceil( W/(spec+w) );
    return function(){
      var r =  [],tun,x,h;
      for ( var i = 0;  i < len;  i++){
	x = (W/2) + (spec+w)*i;
	h = Math.floor( Math.random()*50  + H*0.4 );
	tun = {
	  top:{x:x,y:0,w:w,h:h},
	  bottom:{x:x,y:h+200,w:w,h:H-200-h}
	};
	r.push(tun);
      }
      return r;
    };
  })();

  var
  ctx = canvas.getContext('2d'),
  //是否检测到碰撞
  vs = false,
  //管道间隙
  spec,
  //鸟
  bird = {x:100,y:310,w:30,h:30},
  //管道
  tunel = generateTunel();
  canvas.width = W;
  canvas.height = H;

  canvas.addEventListener('click',function(e){
    bird.y -= upspeed;
  },false);

  var dropspeed = 2;
  var movespeed = 3;
  var upspeed  = 30;

  var draw = function(){
    ctx.clearRect(0,0,W,H);
    bird.y += dropspeed;
    ctx.fillRect(bird.x,bird.y,bird.w,bird.h);

    tunel.map(function(d,i){
      d.top.x -= movespeed;  d.bottom.x -= movespeed;
      //柱子超出画布后 随机生成符合一定规则的柱子
      if( d.top.x < -d.top.w){
	d.top.x = d.bottom.x = W;

	d.top.h = Math.floor( Math.random()*50  + H*0.2 );
	// spec = Math.floor( Math.random()*20 + 100);
	spec = 200;
	d.bottom.y = d.top.h + spec;
	d.bottom.h = H - d.bottom.y;
      }

      // 只在鸟过柱子区域的时候才判断碰撞
      if(d.top.x < (bird.x+bird.w)  && d.top.x > (bird.x - d.top.w) ){
	if( recvsrec(bird,d.top) || recvsrec(bird,d.bottom) ){
	  vs = true;
	}
      }
      ctx.fillRect(d.top.x,d.top.y,d.top.w,d.top.h);
      ctx.fillRect(d.bottom.x,d.bottom.y,d.bottom.w,d.bottom.h);
    });
    if( bird.y > H-bird.h || bird.y < 0 || vs ){
      return;
    }
    requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
};
