

function createStart(pageid){
	var img=document.createElement('img');
	img.setAttribute('id','startimg');
	img.setAttribute('class','startimg');
	img.setAttribute('src','img/start/start.jpg');
	img.setAttribute('onclick','clickStart()');
	document.getElementById('game').appendChild(img);
}


function clickStart(){
	deleteImgById('startimg');
	playmusic();
	newpage();
}