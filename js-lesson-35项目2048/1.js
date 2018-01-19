//生成游戏状态常量
const PLAYING = 0;
const CELL_MOVE = 1; //方块移动
const GAME_OVER = 2; //游戏结束

//生成游戏变量
var state = PLAYING;
var score = 0;

//初始化
window.onload = function() {
	//监听newGame事件
	newGame.addEventListener('click', init);
	//监听再次开始事件
	restart.addEventListener('click', init);
	//监听键盘上下左右移动事件
	window.addEventListener('keydown', onkeyPress)
	init()
}

//生成单元格数组
var cells;

//初始化函数
function init() {
	//初始化单元格数组
	cells = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	//隐藏遮罩层
	gameOver.style.display = 'none';
	//重新积分
	score = 0;
	//初始化游戏状态
	state = PLAYING;
	//生成两个随机数，并放入到单元格中
	randomNumber();
	randomNumber();

	//更新视图
	updateView();
}
//生成随机数函数
function randomNumber() {
	//判断填满单元格
	if(full()) {
		return;
	}
	while(true) { //如果没有填充随机数，就继续循环
		//1.生成行
		var row = Math.floor(Math.random() * 4)
		//2.生成列
		var col = Math.floor(Math.random() * 4)
		if(cells[row][col] == 0) { //当前位置为空
			//	百分之五十的概率随机赋值2或4
			cells[row][col] = Math.random() >= 0.5 ? 4 : 2;
			break;
		}
	}
}
//检测
function full() {
	for(var row = 0; row < 4; row++) {
		for(var col = 0; col < 4; col++) {
			if(cells[row][col] == 0) {
				return false
			}
		}
	}
	//循环结束仍然没有任何一个等于0 ，说明单元格满了
	return true
}
//更新视图   假如里面什么都没
function updateView() {
	//遍历cells将其中的非零的数字显示到cell中
	for(var row = 0; row < 4; row++) {
		for(var col = 0; col < 4; col++) {
			//单元格的值
			var n = cells[row][col];
			//获取细胞单元格
			var cell = $("cell" + row + col)
			//设置其内容和类名 重置类名  将格子变成空的状态
			cell.innerHTML = '';
			cell.className = 'cell';
			//如果值不是0，还要追加num*类名
			if(n > 0) {
				cell.className = 'cell num' + n;
				cell.innerHTML = n;
			}
		}
	}
	//设置积分
	$('score').innerHTML = score;
	$('finalScore').innerHTML = score
}

//工厂函数：根据提供的id获取dom对象
function $(id) {
	return document.getElementById(id)
}

//键盘函数
function onkeyPress() {
	if(state = PLAYING) {
		switch(event.key) {
			case 'ArrowUp':
				upAction();
				break;
			case 'ArrowDown':
				downpAction();
				break;
			case 'ArrowLeft':
				leftAction();
				break;
			case 'ArrowRight':
				rightAction();
				break
		}
	}
}