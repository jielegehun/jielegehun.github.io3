/**
 * 主要的js
 * 用来控制页面顺序、放音乐
*/

/**
 * 页面的展示顺序，start表示开始界面，ylgy是羊了个羊游戏界面，single表示只有一个图片的界面
 *1、如果开头是ylgy，则第二段表示图片文件夹路径，第三段表示是个n×n的棋盘，第4段表示这个文件夹下有几张图片
 *2、如果卡头是single，则第二段表示图片文件夹路径
 *ps:其实可以写个自动检测文件夹有多少张图片的方法，但没必要，看一眼就能写上的数字，我费劲写个方法干嘛？
*/
var pages=[
	'start',//为啥需要个开始页面呢，因为现在不允许点进网站就直接放音乐，必须在用户操作一下之后才能放音乐，所以加个开始页面
	'ylgy-pic1-4-9',
	'ylgy-pic2-5-19',
	// 'ylgy-pic1-6-17', //这个超高难度的就不放在主流程里面了，放一个"挑战高难度"的按钮链接过来好了
	'single-single1',
	'single-single2',
	'single-single3',
	'single-single4',
	'single-single5',
	'single-single6',
]

var storypages=[
	// 'single-single1',
	'single-single2',
	'single-single3',
	'single-single4',
	'single-single5',
	'single-single6',
];

var ylgypages=[
	'ylgy-pic1-4-9',
	'ylgy-pic2-5-19',
];

var g2048pages=[
	'2048'
];
var startimgs=['img/start/start-0.jpg','img/start/start-1.jpg','img/start/start-2.jpg'];
var startpages=[storypages,ylgypages,g2048pages];




//是否需要放音乐
var needmusic=1;


//本来只想放一首歌的，结果女朋友在好几首歌之间选择困难症了，所以整个数组存好几首歌，然后随机播放好了
var songs=[
	//音乐下载网站  tools.liumingye.cn/music/
	//《娃娃脸》-后弦
	'http://freetyst.nf.migu.cn/public/ringmaker01/n4/swsj/2012/09/2012%E5%B9%B49%E6%9C%884%E6%97%A5/2012%E5%B9%B408%E6%9C%8827%E6%97%A5%E5%A4%A9%E6%B5%A9%E7%9B%9B%E4%B8%96%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A515%E9%A6%96/%E5%85%A8%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_128_16_Stero/%E5%A8%83%E5%A8%83%E8%84%B8-%E5%90%8E%E5%BC%A6.mp3',
	//《有点甜》-汪苏泷
	'http://freetyst.nf.migu.cn/public/product07/2018/02/05/2012%E5%B9%B46%E6%9C%8825%E6%97%A5%E7%B4%A7%E6%80%A5%E5%87%86%E5%85%A5%E5%94%90%E7%BE%BD%E6%96%87%E5%8C%965%E9%A6%96/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/MP3_128_16_Stero/%E6%9C%89%E7%82%B9%E7%94%9C-%E6%B1%AA%E8%8B%8F%E6%B3%B7%2BBY2.mp3',
]


//页面id，进入newpage()的时候会自动加一，所以相当于从0开始
var pid=-1;




//自动打开第一个页面
$(document).ready(function(){
	// disdbclick();
	createStart(startpages,startimgs);
});



function init(which){
	playmusic();

	for(i=0;i<startpages.length;i++){
	 	var img=document.createElement('img');
	 	var id='startimg-'+i;
	 	deleteImgById(id);
	};

	pages=startpages[which];
	newpage();
}


function createpage(pagestr){
	var tmp=pagestr.split('-');
	if(tmp[0]=='start'){
		setTimeout(()=>createStart(pages[pid]),500);
	}else if(tmp[0]=='single'){
		setTimeout(()=>gamesingle.createSingle(pages[pid]),500);
	}else if(tmp[0]=='ylgy'){
		setTimeout(()=>createYlgy(pages[pid]),500);
	}else if(tmp[0]=='2048'){
		setTimeout(()=>game2048.create2048(pages[pid]),500);
	}

}


//开启新页面，如果relaoad=0，则按pid打开下一个页面；如果reload=1，则重新打开当前页面
function newpage(reload=0){
	if(reload==0){pid+=1};
	if(pid>=pages.length){
		endpage();
		return;
	}
	var tmp=pages[pid].split('-');
	if(tmp[0]=='start'){
		setTimeout(()=>createStart(pages[pid]),500);
	}else if(tmp[0]=='single'){
		setTimeout(()=>gamesingle.createSingle(pages[pid]),500);
	}else if(tmp[0]=='ylgy'){
		setTimeout(()=>createYlgy(pages[pid]),500);
	}else if(tmp[0]=='2048'){
		setTimeout(()=>game2048.create2048(pages[pid]),500);
	}
}


//展示最后的页面
function endpage(){
	var img=document.createElement('img');
	img.setAttribute('id','endimg');
	img.setAttribute('class','endimg');
	img.setAttribute('src','img/end.jpg');
	document.getElementById('game').appendChild(img);
}


//接着奏乐接着舞！
function playmusic(){
	if(needmusic==1){
		var rand=Math.floor(Math.random()*songs.length);//随机选音乐
		var mp3 = new Audio(songs[rand])
		var duration=mp3.duration;
		mp3.loop=true;//单曲循环
		mp3.volume=0.7;
		mp3.play();
		//打开页面的时候就已经确定是哪首歌了，不会进行列表循环。其实可以做成列表循环，但没必要，我估计一首歌唱不完就把页面浏览完了
	}
}


// 禁用双击放大，但这个方法不好用，把双击直接屏蔽了，导致第二下点击没有任何反应，实际操作的时候显得特别不丝滑，有卡顿感，所以不用这个方法了。改成index.html里的user-scalable=no
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


