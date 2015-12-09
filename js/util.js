var util = {
    /**
     * 展示消息
     * @param msg 消息内容
     */
    showMessage: function (msg) {
        var html = "<div class='wb-ut-show-message'>"
            + "<div class='title'>"
            + "<div class='title-icon'></div>"
            + "</div>"
            + "<div class='content'>"
            + "<div class='text'>" + (msg + "")
            + "</div>"
            + "</div>"
            + "</div>"
        $(document.body).prepend(html);
        $(".wb-ut-show-message").each(function () {
            $(this).fadeIn("slow").delay(1000).fadeOut(400, function () {
                $(this).remove();
            })
        })
    }
    ,
    showDialog: function () {

    },
    showError: function (msg) {
        var html = "<div class='wb-ut-show-error'>"
            + "<div class='title'>"
            + "<div class='title-icon'></div>"
            + "</div>"
            + "<div class='content'>"
            + "<div class='text'>" + (msg + "")
            + "</div>"
            + "</div>"
            + "</div>"
        $(document.body).prepend(html);
        $(".wb-ut-show-error").each(function () {
            $(this).fadeIn("slow").delay(1000).fadeOut(400, function () {
                $(this).remove();
            })
        })
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