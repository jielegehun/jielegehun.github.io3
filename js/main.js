
//几层-图片文件夹-图片数量
var pages=['5-t1-9','3-t0-8','4-t1-9'];
var pid=0;


$(document).ready(function(){
	disdbclick();
	
	newgame();
});


//开始新游戏
function newgame(){
	setTimeout(()=>createGame(pages[pid]),500);
	setTimeout(()=>pid+=1,500);
}


function disdbclick(){
	// 禁用双击放大
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


