
//创建开始页面
function createStart(pageid){
	var img=document.createElement('img');
	img.setAttribute('id','startimg');
	img.setAttribute('class','startimg');
	img.setAttribute('src','img/start/start.gif');
	img.setAttribute('onclick','clickStart()');
	document.getElementById('game').appendChild(img);
	// document.body.style.backgroundColor='rgb(199,132,92)';
	document.body.background='img/start-background.jpg';
}


function clickStart(){
	deleteImgById('startimg');
	playmusic();
	newpage();
}