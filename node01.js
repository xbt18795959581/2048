var  http = require('http');
var  hostname = '127.0.0.1';
var port = 3000;
var server = http.createServer(function(req,res) {
	res.writeHead(200,{'Content-Type':'text/html',});
	res.write('<h1>这是我在新的电脑上安装新的node环境，先来创建一个文件运行看看是否可以成功打开,为什么我修改了sublime的保存设置，在失去焦点的时候他还是不能自动保存呢？</h1>');
	res.write('<h1>这是我在新的电脑上安装新的node环境，先来创建一个文件运行看看是否可以成功打开</h1>');
	res.end('<h1>Hello World</h1>');
});
server.listen(port,hostname,function () {
	console.log('server running at http://'+port+'');
})