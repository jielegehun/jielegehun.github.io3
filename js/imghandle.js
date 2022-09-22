
var allimg=[];
var deleteimg=[];
var imgsrc=[];

var clickstyle='border:4px solid green;border-radius:10%';
var disclickstyle='border:2px solid gray;border-radius:10%';

//创建图片
function createGame(pageid){
	allimg=[];
	deleteimg=[];
	imgsrc=[];
	var tmp=pageid.split('-');
	var maxlevel=tmp[0];
	var path='img/'+tmp[1]
	var imgnum=tmp[2];
    document.body.background = path+"/background.jpg";
	console.log(document.body.style);
	for(i=0;i<imgnum;i++){
		imgsrc.push(path+'/'+i+'.jpg');
	}
	// createRandom(maxlevel);
	createCorrect(maxlevel);
}

function createCorrect(maxlevel){
	var n=maxlevel;
	var imgMaxNum=Math.floor(n*(n+1)*(2*n+1)/6/3)*3;

	var putimglist=[];//放置图片的顺序
	for(i=0;i<imgMaxNum/3;i++){
		// var rand=Math.floor(Math.random()*imgsrc.length);//随机选图片
		var rand=i%imgsrc.length;//轮流选图片
		var thissrc=imgsrc[rand];
		putimglist.push(thissrc);//同一张图片连着3次放，保证有解
		putimglist.push(thissrc);
		putimglist.push(thissrc);
	}

	var putidlist=[];
	var l,ll;//记录上一个和上上个的位置
	for(var src of putimglist){
		var canPut=getCanPut(putidlist,maxlevel);//可以放的位置
		if(canPut.length==0){break;}
		var rand=1-Math.random();//得到一个更接近1的随机数
		var i=Math.floor(rand*canPut.length);//随机挑一个位置
		var id=canPut[i];
		putidlist.push(id);
	}

	var finalNum=Math.floor(putidlist.length/3)*3;
	allimg=[];
	for(i=0;i<finalNum;i++){
		var id=putidlist[i];
		var src=putimglist[i];
		createImgById(id,src);
		allimg.push(id);
	}

}

function getCanPut(allimg,maxlevel){
	var canPut=[];//可以放的位置
	for(z=0;z<maxlevel;z++){
		num=maxlevel-z; //一行多少个
		for(i=0;i<num;i++){
			for(j=0;j<num;j++){
				if(checkCanPut(allimg,maxlevel,z,i,j)){
					var id='l'+maxlevel+'-'+z+'-'+i+'-'+j;
					canPut.push(id);
				}
			}
		}
	}
	return canPut;
}


function checkCanPut(allimg,maxlevel,z,i,j){
	var id='l'+maxlevel+'-'+z+'-'+i+'-'+j;
	if(allimg.includes(id)){return false;}
	if(z==0){return true;}
	var zs='l'+maxlevel+'-'+(z-1)+'-'+i+'-'+j;//左上
	var ys='l'+maxlevel+'-'+(z-1)+'-'+i+'-'+(j+1);//右上
	var zx='l'+maxlevel+'-'+(z-1)+'-'+(i+1)+'-'+j;//左下
	var yx='l'+maxlevel+'-'+(z-1)+'-'+(i+1)+'-'+(j+1);//右下
	var list=[zs,ys,zx,yx]
	if(allimg.includes(zs) && allimg.includes(ys) && allimg.includes(zx) && allimg.includes(yx)){
		if(allimg.length>1 && list.includes(allimg[allimg.length-1])){return false;}
		if(allimg.length>12&& list.includes(allimg[allimg.length-2])){return false;}
		return true;
	}else{
		return false;
	}
}

function createRandom(maxlevel){
	allimg=[];
	deleteimg=[];
	var n=maxlevel;
	var imgMaxNum=Math.floor(n*(n+1)*(2*n+1)/6/3)*3;
	var num,i,j,z;
	for(z=0;z<maxlevel;z++){
		num=maxlevel-z; //一行多少个
		for(i=0;i<num;i++){
			for(j=0;j<num;j++){
				if(allimg.length>=imgMaxNum){break;}
				var id='l'+maxlevel+'-'+z+'-'+i+'-'+j;
				var thissrc=imgsrc[Math.floor(Math.random()*imgsrc.length)]
				createImgById(id,thissrc);
				allimg.push(id);
			}
		}
	}
}

//根据ID创建图片
function createImgById(id,src){
	var img=document.createElement('img');
	img.setAttribute('id',id);
	img.setAttribute('class',id);
	img.setAttribute('isclick','0');
	img.setAttribute('style',disclickstyle);
	// img.setAttribute('','30%');
	img.setAttribute('onclick','clickImg("'+id+'")');
	img.setAttribute('src',src);
	document.getElementById('game').appendChild(img);
}

function test(){

}

function deleteImgById(id){
	var delimg=document.getElementById(id);
	$("img#"+id).fadeOut(500);
	deleteimg.push(id);
	setTimeout(()=>$("img#"+id).remove(),500);
}


function clickImg(id){
	palymusic();
	if(checkcanclick(id)==false){return;}
	var img=document.getElementById(id);
	var lastclick=img.getAttribute('isclick');
	img.setAttribute('style',clickstyle);
	img.setAttribute('isclick','1');
	var canDelete=checkDetele(id);
	if(lastclick==1 && canDelete==false){
		img.setAttribute('style',disclickstyle);
		img.setAttribute('isclick','0');
	}
	if(deleteimg.length>=allimg.length){
		newgame();
	}
}

function checkcanclick(id){
	return true;
}

function disclickImg(id){
	var img=document.getElementById(id);
	img.setAttribute('style',disclickstyle);
	img.setAttribute('isclick','0');
}


function checkDetele(lastId){
	var leftimg=[];//剩余列表
	var clickedimg=[];//选中列表
	for(var id of allimg){
		if(deleteimg.includes(id)){}else{leftimg.push(id);}
	}

	// console.log(leftimg);
	for(var id of leftimg){
		var img=document.getElementById(id);
		var isclick=img.getAttribute('isclick');
		if(isclick=='1'){clickedimg.push(id)}
	}
	if(clickedimg.length>=3){
		var imgsrc=[];
		for(var id of clickedimg){
			var img=document.getElementById(id);
			var src=img.getAttribute('src');
			imgsrc.push(src);
		}
		var set=new Set(imgsrc);
		// console.log(imgsrc);
		// console.log(set);
		if(set.size==1){
			for(var id of clickedimg){
				deleteImgById(id);
			}
			return true
		}else{
			for(var id of clickedimg){
				disclickImg(id);
			}
		}
	}
	return false
}


