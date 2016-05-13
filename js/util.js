var util = {
    /**
     * 展示消息
     * @param msg 消息内容
     */
    showMessage: function (title,msg,cb) {
        var html = "<div id='wb-tip' style='position:fixed;height: 100%;width: 100%; z-index: 99999;display: table'>"+
            "<div style='display:table-cell;vertical-align: middle;text-align:center;'>" +
            "<div style='width: 200px;background-color: #FFFFFF;;display: inline-block;border: 1px solid #E0E0E0;box-shadow: 4px 4px 8px -2px;'>" +
            "<h5 style='border-bottom: 1px solid #CACACA;;line-height: 30px;'>"+title+"</h5>" +
            "<p style='padding: 10px;text-align: left'>"+msg+"</p>" +
            "</div></div></div>"
        $(document.body).prepend(html);
        setTimeout(function(){
            $("#wb-tip").slideUp(400,function(){
                cb();
            });
        },800)
    },
    showSlideMessage: function(msg,cb){
        var html = "<div id='wb-tip' style='position:fixed;height: 100%;width: 100%; z-index: 99999;display: table'>"+
            "<div style='display:table-cell;vertical-align: middle;text-align:center;'>" +
            "<div style='width:100%;background-color: rgba(0, 0, 0, 0.5);display: inline-block;'>" +
            "<p class='msg' style='color:white;line-height: 40px;font-size:25px;pxtext-align:center;transform: translateX(-999px);transition:all 1s'>"+msg+"</div>" +
            "</div></div></div>"
        $(document.body).prepend(html);
        setTimeout(function(){
            $("#wb-tip .msg").css("transform","translateX(0px)")
        },0)
        setTimeout(function(){
            $("#wb-tip .msg").css("transform","translateX(999px)");
        },2000)
        setTimeout(function(){
            $("#wb-tip").remove();
            if(cb instanceof Function){
                cb();
            }
        },3000)
    },
    /**
     * js动态加载js，css文件
     * @param filename 文件地址
     * @param filetype 文件类型
     */
    loadjscssfile: function (filename, filetype) {
        if (filetype == "js") { //判定文件类型
            var fileref = document.createElement('script')//创建标签
            fileref.setAttribute("type", "text/javascript")//定义属性type的值为text/javascript
            fileref.setAttribute("src", filename)//文件的地址
        }
        else if (filetype == "css") { //判定文件类型
            var fileref = document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", filename)
        }
        if (typeof fileref != "undefined"){
            document.getElementsByTagName("head")[0].appendChild(fileref)
        }
    }
}