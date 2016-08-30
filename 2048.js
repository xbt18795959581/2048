//////////////
//xubaoting //
//////////////
///
/**
 * @async
 */
/**
 * @define {[type]} [description]
 */
/**这是对单个声明的对象进行一个详细的解释说明
 * [game description]
 * @type {Object}
 */
var game = {
	data: [],
	score: 0, //保存分数
	randomNum: function() {
		if (!this.isFull()) { //如果不满才生成随机数
			/*在数组的随机1个位置生成一个2或4*/
			while (true) {
				var row = Math.floor(Math.random() * 4);
				var col = Math.floor(Math.random() * 4);
				if (this.data[row][col] == 0) {
					this.data[row][col] = Math.random() < 0.5 ? 2 : 4;
					break;
				}

			}
		}
	},
	/**
	 * 下面的注释展示了一个新的作用，可以在函数上面将次函数做一个全面的注释
	 */
	/**
	 * [isFull description]
	 * @return {Boolean} [description]
	 */
	isFull: function() { /*检查当前数组是否已满*/
		return this.data.toString().search(/(0,)|(,0)/) == -1;
	},
	start: function() {
		this.data = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
		this.score = 0;
		this.randomNum();
		this.randomNum();
		this.updateView();
	},
	updateView: function() {
		var span = document.getElementById("score");
		span.innerHTML = this.score;
		for (var row = 0; row < this.data.length; row++) {
			for (var col = 0; col < this.data[row].length; col++) {
				var div =
					document.getElementById("c" + row + col);
				if (this.data[row][col] != 0) {
					div.innerHTML = this.data[row][col];
					div.className = "cell n" + this.data[row][col];
				} else {
					div.innerHTML = "";
					div.className = "cell";
				}
			}
		}
		this.gameOver();
		var divOver = document.getElementById("gameOver");
		if (this.state == this.GAMEOVER) {
			divOver.style.display = "block";
		} else {
			divOver.style.display = "none";
		}
	},
	moveLeft: function() { /*左移方法*/
		var start = this.data.toString();
		for (var row = 0; row < 4; row++) {
			var col = 1; //左移时，第一个格不用检查
			var c = 0; //记录当前可以合并到的位置
			while (col < 4) {
				var prev = this.data[row][col - 1]; //临时存储前一个格
				var curr = this.data[row][col]; //临时存储当前格
				/*判断当前单元格能否向前移动*/
				if (curr != 0) {
					this.merge(row, col, row, col - 1);
				}
				//如果前一个元素==0，且当前格!=0，
				//则移动后下标退一格
				//其余情况下标都移动到下一格
				if (curr != 0 && prev == 0 && (col != c + 1)) {
					col--;
				} else {
					col++;
					if (curr != 0 && prev != 0 && this.data[row][c] != 0) {
						c++;
					}
				}
			}
		}
		var end = this.data.toString();
		if (start != end) { //被移动了
			//移动后，生成随机数，更新界面
			this.randomNum();
			this.updateView();
		}
	},
	moveRight: function() { /*左移方法*/
		var start = this.data.toString();
		for (var row = 0; row < 4; row++) {
			var col = 2; //右移时，第4个格不用检查
			var c = 3; //最右侧单元格
			while (col >= 0) {
				var prev = this.data[row][col + 1]; //临时存储前一个格
				var curr = this.data[row][col]; //临时存储当前格
				/*判断当前单元格能否向前移动*/
				if (curr != 0) {
					this.merge(row, col, row, col + 1);
				}
				//如果前一个元素==0，且当前格!=0时，且col>c+1时
				//则移动后下标退一格
				//其余情况下标都移动到下一格
				if (curr != 0 && prev == 0 && (col != c - 1)) {
					col++;
				} else {
					col--;
					if (curr != 0 && this.data[row][c] != 0 && prev != 0) {
						c--;
					}
				}
			}
		}
		var end = this.data.toString();
		if (start != end) { //被移动了
			//移动后，生成随机数，更新界面
			this.randomNum();
			this.updateView();
		}
	},
	/**/
	moveUp: function() { /*上移方法*/
		var start = this.data.toString();
		for (var col = 0; col < 4; col++) {
			var row = 1;
			var r = 0;
			while (row < 4) {
				var prev = this.data[row - 1][col];
				var curr = this.data[row][col];
				if (curr != 0) {
					this.merge(row, col, row - 1, col);
				}
				if (curr != 0 && prev == 0 && (row != r + 1)) {
					row--;
				} else {
					row++;
					if (curr != 0 && prev != 0 && this.data[r][col] != 0) {
						r++;
					}
				}
			}
		}
		var end = this.data.toString();
		if (start != end) {
			this.randomNum();
			this.updateView();
		}
	},
	moveDown: function() { /*下移方法*/
		var start = this.data.toString();
		for (var col = 0; col < 4; col++) {
			var row = 2;
			var r = 3;
			while (row >= 0) {
				var prev = this.data[row + 1][col];
				var curr = this.data[row][col];
				if (curr != 0) {
					this.merge(row, col, row + 1, col);
				}
				if (curr != 0 && prev == 0 && (row != r - 1)) {
					row++;
				} else {
					row--;
					if (curr != 0 && this.data[r][col] != 0 && prev != 0) {
						r--;
					}
				}
			}
		}
		/**这里可以发现注释是对单个变量的说明
		 * [end description]
		 * @type {[type]}
		 */
		var end = this.data.toString();
		if (start != end) {
			this.randomNum();
			this.updateView();
		}
	},
	/**在有入参的函数处可以讲每一个参数提取出来，自己可以加上注释，说明每一个入参的具体的作用
	 * [merge description]
	 * @param  {[type]} row     [description] 
	 * @param  {[type]} col     [description]
	 * @param  {[type]} prevRow [description]
	 * @param  {[type]} prevCol [description]
	 * @return {[type]}         [description]
	 */
	merge: function(row, col, prevRow, prevCol) {
		/*专门判断任意两个单元格合并的方法*/
		//如果前一个单元格==0
		if (this.data[prevRow][prevCol] == 0) {
			//用当前格替换前一个格
			this.data[prevRow][prevCol] = this.data[row][col];
			this.data[row][col] = 0;
		} else if (this.data[prevRow][prevCol] ==
			this.data[row][col]) {
			//否则，如果当前格==前一个格，则将前一个格*=2
			this.data[prevRow][prevCol] *= 2;
			this.score += this.data[prevRow][prevCol];
			this.data[row][col] = 0;
		}
	},
	state: 1,
	PLAYING: 1,
	GAMEOVER: 0,
	gameOver: function() {
		//如果包含8192，
		if (this.has8192()) { //则将游戏的state属性改为this.GAMEOVER
			this.state = this.GAMEOVER;
		} else if (this.isFull() && !this.canMove()) { //如果满了，且不能移动!
			this.state = this.GAMEOVER;
		} else {
			this.state = this.PLAYING;
		}
	},
	canMove: function() { /*现在的数组是否可移动*/
		//Step1: 遍历数组的每个元素
		for (var row = 0; row < 4; row++) {
			for (var col = 0; col < 4; col++) {
				//每得到一个元素，判断该元素是否可//左，右，上，下移动
				var curr = this.data[row][col];
				//左移：如果当前元素不是最左侧元素
				if (col != 0) { //再如果当前元素左侧的值==当前元素
					if (curr == this.data[row][col - 1]) {
						return true; //返回true
					}
				}
				//右移：如果当前元素不是最右侧元素
				if (col != 3) { //再如果当前元素==当前元素右侧值
					if (curr == this.data[row][col + 1]) {
						return true //返回true
					}
				}
				if (row != 0) { //再如果当前元素左侧的值==当前元素
					if (curr == this.data[row - 1][col]) {
						return true; //返回true
					}
				}
				if (row != 3) { //再如果当前元素==当前元素右侧值
					if (curr == this.data[row + 1][col]) {
						return true //返回true
					}
				}
			}
		}
		return false; //如果程序执行到此，说明无元素可移动
	},
	has8192: function() { //判断是否有8192
		//用search方法，检索/(8192,)|(,8192)/
		return this.data.toString().search(/(8192,)|(,8192)/) != -1;
	}
}
////////
//xbt //
////////
/**
 * [onload description]
 * @return {[type]} [description]
 */
var a = document.getElementById('xubaoting')
window.onload = function() {
	game.start();
	//当网页捕获到键盘按下事件时
	document.onkeydown = function( /*event*/ ) {
		if (game.state == game.PLAYING) {
			var event = window.event || arguments[0];
			var code = event.keyCode;
			//如果是37号，就执行moveLeft()
			if (code == 37) {
				game.moveLeft();
			} else if (code == 39) {
				game.moveRight();
			} else if (code == 38) {
				game.moveUp();
			} else if (code == 40) {
				game.moveDown();
			}
		}
	}
}