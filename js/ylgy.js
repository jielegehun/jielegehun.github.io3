
var allimg=[];
var deleteimg=[];
var imgsrc=[];
var btnsrc=[];
var btnimg=[];
var maxlevel;

var disclickstyle='border:3px solid rgb(100,100,100,0.7); border-radius:10%; opacity:1';
var clickstyle='border:7px solid rgb(248, 195, 135, 0.8); border-radius:10%; opacity:1';

//创建图片
function createYlgy(pageid){
	allimg=[];
	deleteimg=[];
	imgsrc=[];
	btnsrc=[];
	btnimg=[];
	var tmp=pageid.split('-');
	var path='img/'+tmp[1];
	maxlevel=tmp[2];
	var imgnum=tmp[3];
    document.body.background = path+"/background.jpg";
	for(i=0;i<imgnum;i++){
		imgsrc.push(path+'/'+i+'.jpg');
	}
	for(i=0;i<2;i++){
		btnsrc.push(path+'/btn'+i+'.gif');
	}
	createCorrect();
}

function createCorrect(){
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
		var canPut=getCanPut(putidlist);//可以放的位置
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

	createbtn();
}

function createbtn(){
	var btn1='l'+maxlevel+'-'+0+'-'+maxlevel+'-'+0;
	var src1=btnsrc[0]
	createBtn1ById(btn1,src1)
	btnimg.push(btn1);

	var btn2='l'+maxlevel+'-'+0+'-'+maxlevel+'-'+1;
	var src2=btnsrc[1];
	createBtn2ById(btn2,src2);
	btnimg.push(btn2);
}

function createBtn1ById(id,src){
	var img=document.createElement('img');
	img.setAttribute('id',id);
	img.setAttribute('class',id);
	img.setAttribute('isclick','0');
	img.setAttribute('style',disclickstyle);
	// img.setAttribute('','30%');
	img.setAttribute('onclick','deleteandnewpage(1)');
	img.setAttribute('src',src);
	document.getElementById('game').appendChild(img);
}

function createBtn2ById(id,src){
	var img=document.createElement('img');
	img.setAttribute('id',id);
	img.setAttribute('class',id);
	img.setAttribute('isclick','0');
	img.setAttribute('style',disclickstyle);
	// img.setAttribute('','30%');
	img.setAttribute('onclick','deleteandnewpage()');
	img.setAttribute('src',src);
	document.getElementById('game').appendChild(img);
}

function deleteandnewpage(reload=0){
	for(img of allimg){
		deleteImgById(img);
	}
	for(img of btnimg){
		deleteImgById(img);
	}
	newpage(reload);
}

function getCanPut(allimg){
	var canPut=[];//可以放的位置
	for(z=0;z<maxlevel;z++){
		num=maxlevel-z; //一行多少个
		for(i=0;i<num;i++){
			for(j=0;j<num;j++){
				if(checkCanPut(allimg,z,i,j)){
					var id='l'+maxlevel+'-'+z+'-'+i+'-'+j;
					canPut.push(id);
				}
			}
		}
	}
	return canPut;
}


function checkCanPut(allimg,z,i,j){
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

function createRandom(){
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


function deleteImgById(id){
	var delimg=document.getElementById(id);
	$("img#"+id).fadeOut(500);
	deleteimg.push(id);
	setTimeout(()=>$("img#"+id).remove(),500);
}


function clickImg(id){
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
		deleteandnewpage();
	}
}

function checkcanclick(id){
	var tmp=id.split('-');
	var z=parseInt(tmp[1]);
	var i=parseInt(tmp[2]);
	var j=parseInt(tmp[3]);
	var zs='l'+maxlevel+'-'+(z+1)+'-'+i+'-'+j;
	var ys='l'+maxlevel+'-'+(z+1)+'-'+i+'-'+(j-1);
	var zx='l'+maxlevel+'-'+(z+1)+'-'+(i-1)+'-'+j;
	var yx='l'+maxlevel+'-'+(z+1)+'-'+(i-1)+'-'+(j-1);

	var leftimg=getLeftimg();
	if(leftimg.includes(zs)||leftimg.includes(ys)||leftimg.includes(zx)||leftimg.includes(yx)){
		return false;
	}
	return true;
}


function getLeftimg(){
	var leftimg=[];//剩余列表
	for(var id of allimg){
		if(deleteimg.includes(id)){}else{leftimg.push(id);}
	}
	return leftimg;
}

function disclickImg(id){
	var img=document.getElementById(id);
	img.setAttribute('style',disclickstyle);
	img.setAttribute('isclick','0');
}


function checkDetele(lastId){
	var leftimg=getLeftimg();

	var clickedimg=[];//选中列表
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


