
//样式-几层-图片文件夹-图片数量
// var pages=['3-t0-8','4-t2-8','5-t1-13'];
var pages=[
	'start',
	'ylgy-t2-4-8',
	'ylgy-t1-5-13',
	'single-s1',
	'single-s2'
];
var pid=0;
var startmusic=0;


$(document).ready(function(){
	disdbclick();
	newpage();
});


//新页面
function newpage(){
	if(pid>=pages.length){
		endpage();
		return;
	}
	var tmp=pages[pid].split('-');
	// setTimeout(()=>createylgy(pages[pid]),500);
	if(tmp[0]=='start'){
		setTimeout(()=>createStart(pages[pid]),500);
	}else if(tmp[0]=='ylgy'){
		setTimeout(()=>createYlgy(pages[pid]),500);
	}else if(tmp[0]=='single'){
		setTimeout(()=>createSingle(pages[pid]),500);
	}
	setTimeout(()=>pid+=1,500);
}

function endpage(){
	var img=document.createElement('img');
	img.setAttribute('id','endimg');
	img.setAttribute('class','endimg');
	img.setAttribute('src','img/end.jpg');
	document.getElementById('game').appendChild(img);
}

function playmusic(){
	if(startmusic==0){
		//音乐下载网站 tools.liumingye.cn/music/
		var mp3 = new Audio('http://freetyst.nf.migu.cn/public/product07/2018/02/05/2012%E5%B9%B46%E6%9C%8825%E6%97%A5%E7%B4%A7%E6%80%A5%E5%87%86%E5%85%A5%E5%94%90%E7%BE%BD%E6%96%87%E5%8C%965%E9%A6%96/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_128_16_Stero/%E6%9C%89%E7%82%B9%E7%94%9C-%E6%B1%AA%E8%8B%8F%E6%B3%B7%2BBY2.mp3');  // 创建音频对象
		var duration=mp3.duration;
		mp3.loop=true;
		mp3.volume=0.3;
		mp3.play();
		startmusic=1;
	}
}

// 禁用双击放大
function disdbclick(){
  var lastTouchEnd = 0
  document.documentElement.addEventListener(
    'touchend',
    function(event) {
      var now = Date.now()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    },
    {
      passive: false
    }
  )
}



