/**
 * node.js创建web服务器
 */
{
    var http = require('http');
    var express = require('express');
    var app = express();

    app.use("/wb", express.static(__dirname));

    // 创建服务端
    http.createServer(app).listen('3000', function() {
        console.log('启动服务器完成');
    });
}
