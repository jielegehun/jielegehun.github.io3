

function createSingle(pageid){
	var tmp=pageid.split('-');
	var path='img/'+tmp[1]

	var img=document.createElement('img');
	img.setAttribute('id','singleimg');
	img.setAttribute('class','singleimg');
	img.setAttribute('src',path+'/0.jpg');
	img.setAttribute('onclick','clickSingle()');
	document.getElementById('game').appendChild(img);
	document.body.background='';
}


function clickSingle(){
	deleteImgById('singleimg');
	newpage();
}