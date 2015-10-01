var util = {
    /**
     * 展示消息
     * @param msg 消息内容
     */
    showMessage:function(msg){
        var html = "<div class='wb-ut-show-message'>"
            +"<div class='title'>"
            +"<div class='title-icon'></div>"
            +"</div>"
            +"<div class='content'>"
            +"<div class='text'>"+(msg+"")
            +"</div>"
            +"</div>"
            +"</div>"
        $(document.body).prepend(html);
        $(".wb-ut-show-message").each(function(){
            $(this).fadeIn("slow").delay(1000).fadeOut(400,function(){
                $(this).remove();
            })
        })
    }
    ,
    showDialog:function(){

    },
    showError:function(msg){
        var html = "<div class='wb-ut-show-error'>"
            +"<div class='title'>"
            +"<div class='title-icon'></div>"
            +"</div>"
            +"<div class='content'>"
            +"<div class='text'>"+(msg+"")
            +"</div>"
            +"</div>"
            +"</div>"
        $(document.body).prepend(html);
        $(".wb-ut-show-error").each(function(){
            $(this).fadeIn("slow").delay(1000).fadeOut(400,function(){
                $(this).remove();
            })
        })
    },
}