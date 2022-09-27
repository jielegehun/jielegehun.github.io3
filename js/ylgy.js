/**
 * 羊了个羊
 * 负责图片生成、消除等逻辑
 * 工作时间偶尔摸🐟写一写，反正我打开的是写代码界面，旁边的领导也不会细看我是不是在写工作代码
*/

var allimg=[];
var deleteimg=[];
var imgsrc=[];
var btnsrc=[];
var btnimg=[];
var maxlevel;

//未选中 和 选中时 图片的样式
var disclickstyle='border:3px solid rgb(100,100,100,0.7); border-radius:10%; opacity:0.9';
var clickstyle='border:7px solid rgb(248, 195, 135, 0.8); border-radius:10%; opacity:1';


//创建页面
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
    document.body.background = path+"/ylgy-background.jpg";
    // document.body.background = "img/ylgy-background.jpg";
	for(i=0;i<imgnum;i++){
		imgsrc.push(path+'/'+i+'.jpg');
	}
	for(i=0;i<3;i++){
		btnsrc.push(path+'/btn'+i+'.gif');
	}
	createCorrect();
}

//这个才是真正的创建页面，上面那个只是进行一些初始化
function createCorrect(){
	var n=maxlevel;
	var imgMaxNum=Math.floor(n*(n+1)*(2*n+1)/6/3)*3;//平方和公式

	var putimglist=[];//放置图片的顺序
	for(i=0;i<imgMaxNum/3;i++){
		// var rand=Math.floor(Math.random()*imgsrc.length);//随机选图片
		var rand=i%imgsrc.length;//轮流选图片
		var thissrc=imgsrc[rand];
		putimglist.push(thissrc);//同一张图片连着3次放，保证有解
		putimglist.push(thissrc);
		putimglist.push(thissrc);
	}

	var putidlist=[];//位置的顺序
	//var last,lastlast;//因为后一张图片不能直接放在前两张图片上面，会导致可能生成无解的情况，所以需要记录上一个和上上个的位置。但是这个实现好麻烦，而且实践发现，生成无解的概率很小，就不搞了，开心(*^▽^*)
	for(var src of putimglist){
		var canPut=getCanPut(putidlist);//可以放的位置
		if(canPut.length==0){break;}
		// var rand=1-Math.random()*Math.random();//得到一个更接近1的随机数，优先放到上层，后来发现毛用没有，还不如随机放
		var rand=Math.random();
		var i=Math.floor(rand*canPut.length);
		var id=canPut[i];
		putidlist.push(id);
	}

	var finalNum=Math.floor(putidlist.length/3)*3;//最终可以放多少张图片
	allimg=[];
	for(i=0;i<finalNum;i++){
		var id=putidlist[i];
		var src=putimglist[i];
		createImgById(id,src);
		allimg.push(id);
	}

	createbtn();
}

//创建按钮
function createbtn(){
	var btn1='l'+maxlevel+'-'+0+'-'+maxlevel+'-'+0;
	var src1=btnsrc[0]
	createBtn1ById(btn1,src1)
	btnimg.push(btn1);

	var btn2='l'+maxlevel+'-'+0+'-'+maxlevel+'-'+1;
	var src2=btnsrc[1];
	createBtn2ById(btn2,src2);
	btnimg.push(btn2);

	var btn3='l'+maxlevel+'-'+0+'-'+maxlevel+'-'+2;
	var src3=btnsrc[2];
	createBtn3ById(btn3,src3);
	btnimg.push(btn3);
}

//因为要3个实现不同的功能，所以实现了三个方法，这是第1个
function createBtn1ById(id,src){
	var img=document.createElement('img');
	img.setAttribute('id',id);
	img.setAttribute('class',id);
	img.setAttribute('isclick','0');
	img.setAttribute('style',disclickstyle);
	img.setAttribute('onclick','deleteAndNewpage(1)');
	// img.setAttribute('ondblclick','');//本来想屏蔽双击的，但这个方法没啥用
	img.setAttribute('src',src);
	document.getElementById('game').appendChild(img);
}

//因为要3个实现不同的功能，所以实现了三个方法，这是第2个
function createBtn2ById(id,src){
	var img=document.createElement('img');
	img.setAttribute('id',id);
	img.setAttribute('class',id);
	img.setAttribute('isclick','0');
	img.setAttribute('style',disclickstyle);
	img.setAttribute('onclick','deleteAndNewpage()');
	// img.setAttribute('ondblclick','');
	img.setAttribute('src',src);
	document.getElementById('game').appendChild(img);
}

//有再一再二没有再三，我不会把同一句话写三遍
function createBtn3ById(id,src){
	var img=document.createElement('img');
	img.setAttribute('id',id);
	img.setAttribute('class',id);
	img.setAttribute('isclick','0');
	img.setAttribute('style',disclickstyle);
	img.setAttribute('onclick','deleteAndSuperYlgy()');
	// img.setAttribute('ondblclick','');
	img.setAttribute('src',src);
	document.getElementById('game').appendChild(img);
}

//清空图片，生成高难度的羊了个羊
function deleteAndSuperYlgy(){
	for(img of allimg){
		deleteImgById(img);
	}
	for(img of btnimg){
		deleteImgById(img);
	}
	// var level=5;
	// //30%概率的生成6层
	// if(Math.random()<0.3){level=6;}
	var level=6;//算了，还是直接生成6层的吧
	setTimeout(()=>createYlgy('ylgy-super-'+level+'-14'),500);
}

//清空图片，生成下一个页面
function deleteAndNewpage(reload=0){
	for(img of allimg){
		deleteImgById(img);
	}
	for(img of btnimg){
		deleteImgById(img);
	}
	newpage(reload);
}

//遍历所有位置，获取可以放图片的位置
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

//判断这个位置能不能放图片
//1、如果已经放了，就不能再放（废话吗这不是，但是代码逻辑还是要这样写，这就是程序员......要考虑到各种蛋疼的情况，包括想不到的和很容易忽略的）
//2、如果是最底层，可以直接放
//3、否则要保证 下一层的左上、右上、左下、右下 都已经放了
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
		if(allimg.length>1 && list.includes(allimg[allimg.length-1])){return false;}//不能放在上一个图片的位置
		if(allimg.length>2 && list.includes(allimg[allimg.length-2])){return false;}//不能放在上上个图片的位置
		return true;
	}else{
		return false;
	}
}

//也是创建页面，只不过是随机的，不一定有解。只是刚开始测试的时候用，现在已经不用了
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

//根据id创建图片
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

//根据id删除图片
function deleteImgById(id){
	var delimg=document.getElementById(id);
	$("img#"+id).fadeOut(500);//在n毫秒内淡出
	deleteimg.push(id);
	setTimeout(()=>$("img#"+id).remove(),500);//淡出后再把图片删了，不然会有个空白图片占位置
}

//点击图片时，需要触发的操作
function clickImg(id){
	if(checkcanclick(id)==false){return;}//首先判断能否点击，被盖住的是不能点击的
	var img=document.getElementById(id);
	var lastclick=img.getAttribute('isclick');
	img.setAttribute('style',clickstyle);
	img.setAttribute('isclick','1');
	var canDelete=checkDetele(id);//这次点击之后，是否触发了消除
	if(lastclick==1 && canDelete==false){//如果已经是点击状态，但是没有触发消除，就表示用户的操作是取消选中这个图片
		img.setAttribute('style',disclickstyle);
		img.setAttribute('isclick','0');
	}
	if(deleteimg.length>=allimg.length){//如果 删除图片的数量>=全部图片的数量，就表示已经消除完了，进入下一个页面。为啥是>=不是==呢，当你做程序员做久了你就知道了 -_-||
		deleteAndNewpage();
	}
}

//判断能否点击
//如果上一层左上、右上、左下、右下还在，就不能点击
//为啥不用考虑边界呢，因为边界的ij坐标是-1，非法坐标肯定不在剩余集合中，我真是个天才哈哈哈
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

//获取剩余图片
function getLeftimg(){
	var leftimg=[];//剩余列表
	for(var id of allimg){
		if(deleteimg.includes(id)){}else{leftimg.push(id);}
	}
	return leftimg;
}

//再点一次 取消选中
function disclickImg(id){
	var img=document.getElementById(id);
	img.setAttribute('style',disclickstyle);
	img.setAttribute('isclick','0');
}

//判断是否达到了消除条件
//获取选中的图片的src，如果src一样表示是同一张图片，则可以消除
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


