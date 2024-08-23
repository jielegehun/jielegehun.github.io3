
var gamesingle = {

	singlepid:-1,
	singlepages:[],

	// initsingle(pages){
	// 	this.singlepages=pages;
	// 	this.newsinglepage();
	// },

	// //开启新页面，如果relaoad=0，则按pid打开下一个页面；如果reload=1，则重新打开当前页面
	// newsinglepage : function(){
	// 	this.pid+=1;
	// 	if(pid>=pages.length-1){
	// 		createSingle(1);
	// 		return;
	// 	}
	// 	createSingle(0);
	// }

	//创建个只有一张图片的页面，没啥好说的
	createSingle : function(pageid){
		var tmp=pageid.split('-');
		var path='img/'+tmp[1]

		var img=document.createElement('img');
		img.setAttribute('id','singleimg');
		img.setAttribute('class','singleimg');
		img.setAttribute('src',path+'/0.jpg');
		img.setAttribute('onclick','gamesingle.clickSingle()');
		document.getElementById('game').appendChild(img);
		document.body.background='';
		document.body.style.backgroundColor='';
	},


	clickSingle:function(){
		deleteImgById('singleimg');
		newpage();
	},

}