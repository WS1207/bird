var
//  画布的默认高宽
  W = 316,
  H = 478,

// 两根管道之间的距离
  spec = 100,

  playing = null,

  birdImage = document.querySelector('#bird'),

  bird = {x: W / 2 - 0.5, y: H / 2 - 0.5, w: 25, h: 21},
  ctx = document.querySelector('#canvas').getContext('2d');


// 只有两组柱子, 程序一直在变换他们的样子 以下为初始值
var tunnels = [
  {
    top: {x: 210.5, y: -1, w: 60, h: 200.5},
    bot: {x: 210.5, y: 320.5, w: 60, h: 300}
  },
  {
    top: {x: 440.5, y: -1, w: 60, h: 300.5},
    bot: {x: 440.5, y: 420.5, w: 60, h: 300}
  }
];

var drawTunnel = function (tunel) {

  //  柱子下面超出的部分,以及超出部分的高度
  var off = 8, edgeH = 11;


  for (var k in tunel) {
    var v = tunel[k];
    ctx.save();
    ctx.strokeStyle = '#555';
    ctx.strokeRect(v.x, v.y, v.w, v.h);

    // 包含上下两部分,画法略有不同
    if (k === 'top') {
      ctx.translate(v.x - off, v.y + v.h);
    } else {
      ctx.translate(v.x - off, v.y - edgeH);
    }
    ctx.strokeRect(0, 0, v.w + 2 * off, edgeH);
    ctx.restore();
  }

};

var g = 1;

var drawBird = function () {
  //画小鸟
  g += 0.05;
  bird.y += g * g;
  ctx.drawImage(birdImage, bird.x, bird.y, bird.w, bird.h);
};

var recVsRec = function (rect0, rect1) {
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

var draw = function () {
  //清理画布
  ctx.clearRect(0, 0, W, H);

  drawBird();

  //画管道
  var vs;
  for (var i = 0; i < tunnels.length; i++) {
    var tunnel = tunnels[i];

    tunnel.top.x -= 1;
    tunnel.bot.x -= 1;

    drawTunnel(tunnel);

    if (recVsRec(bird, tunnel.top) || recVsRec(bird, tunnel.bot)) {
      vs = true;
    }

    // 当一组柱子走出屏幕边缘时, 把他们的位置换到 右侧不远的地方  上高度随机 下高度计算

    if (tunnel.top.x <= -tunnel.top.w) {
      // TODO: 找到规律
      tunnel.top.x = 400.5;
      tunnel.top.h = Math.random() * 200 + 10 + 0.5;

      tunnel.bot.x = 400.5;
      tunnel.bot.y = tunnel.top.h + spec + 0.5;
      tunnel.bot.h = H - tunnel.top.h - spec;
    }
  }
  if (vs) {
    return;
  }

  //边界判断
  if (bird.y >= H - bird.h || bird.y < 0) {
    return;
  }

  requestAnimationFrame(draw);
};

var birdUp = function (e) {
  bird.y -= 26;
  g = 1;
  e.preventDefault();
};

var startGame = function () {
  requestAnimationFrame(draw);
};

// document.addEventListener('click',birdUp,false);
if ('ontouchstart' in document) {
  document.addEventListener('touchstart', birdUp, false);
} else {
  document.addEventListener('click', birdUp, false);
}
startGame();

