
//创建开始页面
// function createStart(pageid){
// 	var img=document.createElement('img');
// 	img.setAttribute('id','startimg');
// 	img.setAttribute('class','startimg');
// 	img.setAttribute('src','img/start/start.gif');
// 	img.setAttribute('onclick','clickStart()');
// 	document.getElementById('game').appendChild(img);
// 	// document.body.style.backgroundColor='rgb(199,132,92)';
// 	document.body.background='img/start-background.jpg';
// }


//创建开始页面
function createStart(startpages,startimgs){
	for(i=0;i<startpages.length;i++){
	 	var img=document.createElement('img');
	 	var id='startimg-'+i;
		img.setAttribute('id',id);
		img.setAttribute('class',id);
		img.setAttribute('src',startimgs[i]);
		img.setAttribute('onclick','init('+i+')');
		document.getElementById('game').appendChild(img);
		document.body.background='img/start/start-background.jpg';
	}
}


function clickStart(){
	deleteImgById('startimg');
	document.body.background='';
	playmusic();
	newpage();
}