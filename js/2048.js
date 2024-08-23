/**
 * 参考代码链接：https://blog.csdn.net/weixin_58160355/article/details/124139489 
 */


function handleLeft() {
    game2048.moveLeft();
};
function handleRight() {
    game2048.moveRight();
};

function handleUp() {
    game2048.moveUp();
};

function handleDown() {
    game2048.moveDown();
};


var game2048={

	level: 4,
	data: [],
	score:0 ,
    imgstyle:'border:3px solid rgb(100,100,100,0.7); border-radius:5%',
    gamerunning: 1,  //游戏开始时游戏状态为1
    gameover: 0,  //游戏结束时游戏状态为0
    status: 1,  //个人状态与游戏状态相对应，默认为1


	create2048: function(pageid){
		this.init2048(4);
	},

	init2048: function(n){
        document.body.background = "img/2048/2048-background.jpg";

		var domContent = document.body;
		EventUtil.bindEvent(domContent, 'swipeleft', handleLeft);
        EventUtil.bindEvent(domContent, 'swiperight', handleRight);
        EventUtil.bindEvent(domContent, 'slideup', handleDown);
        EventUtil.bindEvent(domContent, 'slidedown', handleUp);

		this.level=n
        this.data = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
		for(i=0;i<n;i++){
			for(j=0;j<n;j++){
				var id='g2048-'+i+'-'+j
				this.createImgById(id);
			}
		}

		this.newNumber();
		this.flushView();

	},


	createImgById: function(id){
		var img=document.createElement('img');
		img.setAttribute('id',id);
		img.setAttribute('class',id);
		img.setAttribute('src','img/2048/0.jpg');
        img.setAttribute('style',this.imgstyle);
		img.setAttribute('number','0');
		document.getElementById('game').appendChild(img);
	},


	//随机赋值
    newNumber: function () {
        //循环获取是否方块存在空白位置
        while (true) {
            //获取随机值
            var r = Math.floor(Math.random() * 4);   //随机生成一个行
            var c = Math.floor(Math.random() * 4);   //随机生成一个列
            //判断 
            if (this.data[r][c] == 0) {
                //随机生成2或者4
                var num = Math.random() > 0.2 ? 2 : 4;   //三元表达式
                //赋值
                this.data[r][c] = num;
                //停止循环
                break;

            }

        }
    },


    //更新视图的方法
    flushView: function () {
        //直接大循环
        for (var r = 0; r < this.level; r++) {  
            for (var c = 0; c < this.level; c++) { 
            	var id='g2048-'+r+'-'+c
                var img = document.getElementById(id);
                if (this.data[r][c] != 0) {
                	var numi=this.data[r][c];
					img.setAttribute('src','img/2048/'+numi+'.jpg');
					img.setAttribute('number',numi);
                } else {
					img.setAttribute('src','img/2048/0.jpg');
					img.setAttribute('number','0');
                }
            }
        }
        if (this.status == this.gameover){
            this.close2048();
            newpage();
        }
        // if (this.status == this.gameover) {  //游戏结束弹出框显示
        //     document.getElementById("gameover").style.display = "block";
        //     document.getElementById("score02").innerHTML = this.score;
        // } else {   //游戏没有结束的时候弹出框一直隐藏
        //     document.getElementById("gameover").style.display = "none";
        // }
    },


    gameOverMessage: function(){
        var max=0;
        for (var r = 0; r < this.level; r++) {  
            for (var c = 0; c < this.level; c++) { 
                if(this.data[r][c]>max){
                    max=this.data[r][c]
                }
            }
        }
        if(max==2048){
            return "获得一个 2048"
        }
        return "test"
    },


    close2048:function(){
        for (var r = 0; r < 4; r++) {
            for (var c = 0; c < 4; c++) {
                var id='g2048-'+r+'-'+c
                deleteImgById(id);
            }
        }

        var domContent = document.body;
        EventUtil.removeEvent(domContent, 'swipeleft', handleLeft);
        EventUtil.removeEvent(domContent, 'swiperight', handleRight);
        EventUtil.removeEvent(domContent, 'slideup', handleDown);
        EventUtil.removeEvent(domContent, 'slidedown', handleUp);
    },


    //	判断游戏是否结束的方法
    isGameover: function () {
        for (var r = 0; r < 4; r++) {
            for (var c = 0; c < 4; c++) {
                if (this.data[r][c] == 0) {  //有空白的时候
                    return false;
                }
                if (c < 3) {  //判断左右是否有相同，只需要判断到第三个格子即可
                    if (this.data[r][c] == this.data[r][c + 1]) {
                        return false;
                    }
                }
                if (r < 3) {
                    if (this.data[r][c] == this.data[r + 1][c]) {
                        return false;
                    }
                }
            }
        }
        return true;   //上面情况全都不符合，表示游戏已经GG了，返回一个true
    },

	//数字左移
    moveLeft: function () {
        //移动之前转化一次字符串
        var before = String(this.data);
        //循环每行数据
        for (var r = 0; r < 4; r++) {
            //处理每一行的函数
            this.moveLeftinRow(r);
        }
        //移动之后转换一次
        var after = String(this.data);
        //判断
        if (before != after) {
            //随机生成两个数2或者4
            this.newNumber();
            if (this.isGameover()) { //如果游戏结束
                //自己状态等于游戏结束状态
                this.status = this.gameover;
            }
            //更新视图
            this.flushView();
        }

    },

    //处理每一行的数据
    moveLeftinRow: function (r) {
        //循环获取后面的数据,最左边不用考虑
        for (var c = 0; c < 3; c++) {
            //变量接收
            var nextc = this.moveLeftNum(r, c);
            //判断是否为-1，否则则为找到数字
            if (nextc != -1) {
                if (this.data[r][c] == 0) {  //如果当前的数等于0，则当前的数和找到的数进行比较
                    this.data[r][c] = this.data[r][nextc];
                    //找到的数清空变为0
                    this.data[r][nextc] = 0;
                    //再次从最左边的数进行循环
                    c--;

                }
                else if (this.data[r][c] == this.data[r][nextc]) {
                    //如果当前的数等于找到的数，则相加
                    this.data[r][c] *= 2;
                    //找到的数清空变为0
                    this.data[r][nextc] = 0;
                    //数字相加一次分数加
                    this.score += this.data[r][c];

                }
            } else {
                //如果没有找到数，则退出循环
                break;
            }
        }

    },

    moveLeftNum: function (r, c) {	//	左移
        //循环获取后面的数据,最左边不用考虑
        for (var i = c + 1; i < 4; i++) {
            //判断后面是否找到数字
            if (this.data[r][i] != 0) {
                //返回下标
                return i;
            }
        }
        //如果没有找到，返回
        return -1;
    },

    //数字右移
    moveRight: function () {
        //移动之前转化一次字符串
        var before = String(this.data);
        //循环每行数据
        for (var r = 0; r < 4; r++) {
            //处理每一行的函数
            this.moveRightinRow(r);
        }
        //移动之后转换一次
        var after = String(this.data);
        //判断
        if (before != after) {
            //随机生成两个数2或者4
            this.newNumber();
            if (this.isGameover()) { //如果游戏结束
                //自己状态等于游戏结束状态
                this.status = this.gameover;
            }
            //更新视图
            this.flushView();
        }

    },
    //处理每一行的数据
    moveRightinRow: function (r) {
        //循环获取前面的数据,最左边不用考虑
        for (var c = 3; c >= 0; c--) {
            //变量接收
            var nextc = this.moveRightNum(r, c);
            //判断是否为-1，否则则为找到数字
            if (nextc != -1) {
                if (this.data[r][c] == 0) {  //如果当前的数等于0，则当前的数和找到的数进行比较
                    this.data[r][c] = this.data[r][nextc];
                    //找到的数清空变为0
                    this.data[r][nextc] = 0;
                    //再次从最右边的数进行循环
                    c++;

                }
                else if (this.data[r][c] == this.data[r][nextc]) {
                    //如果当前的数等于找到的数，则相加
                    this.data[r][c] *= 2;
                    //找到的数清空变为0
                    this.data[r][nextc] = 0;
                    //数字相加一次分数加
                    this.score += this.data[r][c];

                }
            } else {
                //如果没有找到数，则退出循环
                break;
            }
        }

    },
    moveRightNum: function (r, c) { //  左移
        //循环获取前面的数据,最右边不用考虑
        for (var i = c - 1; i >= 0; i--) {
            //判断前面是否找到数字
            if (this.data[r][i] != 0) {
                //返回下标
                return i;
            }
        }
        //如果没有找到，返回
        return -1;
    },
    //移动的方法
    //数字上移
    moveUp: function () {
        //移动之前转化一次字符串
        var before = String(this.data);
        //循环每行数据
        for (var c = 0; c < 4; c++) {
            //处理每一行的函数
            this.moveUpinRow(c);
        }
        //移动之后转换一次
        var after = String(this.data);
        //判断
        if (before != after) {
            //随机生成两个数2或者4
            this.newNumber();
            if (this.isGameover()) { //如果游戏结束
                //自己状态等于游戏结束状态
                this.status = this.gameover;
            }
            //更新视图
            this.flushView();
        }

    },
    //处理每一行的数据
    moveUpinRow: function (c) {
        //循环获取前面的数据,最上面不用考虑
        for (var r = 0; r < 3; r++) {
            //变量接收
            var nextr = this.moveUpNum(r, c);
            //判断是否为-1，否则则为找到数字
            if (nextr != -1) {
                if (this.data[r][c] == 0) {  //如果当前的数等于0，则当前的数和找到的数进行比较
                    this.data[r][c] = this.data[nextr][c];
                    //找到的数清空变为0
                    this.data[nextr][c] = 0;
                    //再次从最上面的数进行循环
                    r--;

                }
                else if (this.data[r][c] == this.data[nextr][c]) {
                    //如果当前的数等于找到的数，则相加
                    this.data[r][c] *= 2;
                    //找到的数清空变为0
                    this.data[nextr][c] = 0;
                    //数字相加一次分数加
                    this.score += this.data[r][c];

                }
            } else {
                //如果没有找到数，则退出循环
                break;
            }
        }

    },
    moveUpNum: function (r, c) {    //  上移
        //循环获取上面的数据,最右边不用考虑
        for (var i = r + 1; i < 4; i++) {
            //判断下面是否找到数字
            if (this.data[i][c] != 0) {
                //返回下标
                return i;
            }
        }
        //如果没有找到，返回
        return -1;
    },
    //移动的方法
    //数字下移
    moveDown: function () {
        //移动之前转化一次字符串
        var before = String(this.data);
        //循环每行数据
        for (var c = 0; c < 4; c++) {
            //处理每一行的函数
            this.moveDowninRow(c);
        }
        //移动之后转换一次
        var after = String(this.data);
        //判断
        if (before != after) {
            //随机生成两个数2或者4
            this.newNumber();
            if (this.isGameover()) { //如果游戏结束
                //自己状态等于游戏结束状态
                this.status = this.gameover;
            }
            //更新视图
            this.flushView();
        }

    },
    //处理每一行的数据
    moveDowninRow: function (c) {
        //循环获取前面的数据,最下面不用考虑
        for (var r = 3; r >= 0; r--) {
            //变量接收
            var nextr = this.moveDownNum(r, c);
            //判断是否为-1，否则则为找到数字
            if (nextr != -1) {
                if (this.data[r][c] == 0) {  //如果当前的数等于0，则当前的数和找到的数进行比较
                    this.data[r][c] = this.data[nextr][c];
                    //找到的数清空变为0
                    this.data[nextr][c] = 0;
                    //再次从最下面的数进行循环
                    r++;

                }
                else if (this.data[r][c] == this.data[nextr][c]) {
                    //如果当前的数等于找到的数，则相加
                    this.data[r][c] *= 2;
                    //找到的数清空变为0
                    this.data[nextr][c] = 0;
                    //数字相加一次分数加
                    this.score += this.data[r][c];

                }
            } else {
                //如果没有找到数，则退出循环
                break;
            }
        }

    },
    moveDownNum: function (r, c) {  //  下移
        //循环获取前面的数据,最下面不用考虑
        for (var i = r - 1; i >= 0; i--) {
            //判断上面是否找到数字
            if (this.data[i][c] != 0) {
                //返回下标
                return i;
            }
        }
        //如果没有找到，返回
        return -1;
    },
 
        
 




};




