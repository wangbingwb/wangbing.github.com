/**
 * Created by bingwang on 2016/5/22.
 */
Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Log = {
    i : function(str){
        console.log(new Date().format("MM-dd HH:mm:ss")+" "+str)
    },
    e : function(str){
        console.error(new Date().format("MM-dd HH:mm:ss")+" "+str)
    },
    d : function(str){
        if (window.debug) console.log(new Date().format("MM-dd HH:mm:ss")+" "+str)
    }
}

window.debug = true;

Log.i("Log初始化成功...");
if(window.debug){
    Log.i("当前模式: DEBUG");
}else{
    Log.i("当前模式: NORMAL");
}
