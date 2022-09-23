
//样式-图片文件夹-几层-图片数量
// var pages=['3-t0-8','4-t2-8','5-t1-13'];
var pages=[
	'start',
	'ylgy-pic1-4-9',
	'ylgy-pic2-5-17',
	// 'ylgy-pic1-6-17',
	'single-single1',
	'single-single2'
];
var songs=[
	//音乐下载网站 tools.liumingye.cn/music/
	//《娃娃脸》-后弦
	'http://freetyst.nf.migu.cn/public/ringmaker01/n4/swsj/2012/09/2012%E5%B9%B49%E6%9C%884%E6%97%A5/2012%E5%B9%B408%E6%9C%8827%E6%97%A5%E5%A4%A9%E6%B5%A9%E7%9B%9B%E4%B8%96%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A515%E9%A6%96/%E5%85%A8%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_128_16_Stero/%E5%A8%83%E5%A8%83%E8%84%B8-%E5%90%8E%E5%BC%A6.mp3?channelid=02&amp;msisdn=26bb2629-5c7e-4bde-b6fe-3396572c0b13&amp;Tim=1663928991935&amp;Key=a771fc68efa31ea4',
	//《有点甜》-汪苏泷
	'http://freetyst.nf.migu.cn/public/product07/2018/02/05/2012%E5%B9%B46%E6%9C%8825%E6%97%A5%E7%B4%A7%E6%80%A5%E5%87%86%E5%85%A5%E5%94%90%E7%BE%BD%E6%96%87%E5%8C%965%E9%A6%96/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_128_16_Stero/%E6%9C%89%E7%82%B9%E7%94%9C-%E6%B1%AA%E8%8B%8F%E6%B3%B7%2BBY2.mp3',
]
var pid=-1;
var startmusic=0;


$(document).ready(function(){
	// disdbclick();
	newpage();
});


//新页面
function newpage(reload=0){
	if(reload==0){pid+=1};
	if(pid>=pages.length){
		endpage();
		return;
	}
	var tmp=pages[pid].split('-');
	if(tmp[0]=='start'){
		setTimeout(()=>createStart(pages[pid]),500);
	}else if(tmp[0]=='ylgy'){
		setTimeout(()=>createYlgy(pages[pid]),500);
	}else if(tmp[0]=='single'){
		setTimeout(()=>createSingle(pages[pid]),500);
	}
	// setTimeout(()=>pid+=1,500);
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
		var rand=Math.floor(Math.random()*songs.length);//随机选音乐
		var mp3 = new Audio(songs[rand])
		var duration=mp3.duration;
		mp3.loop=true;
		mp3.volume=0.7;
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



