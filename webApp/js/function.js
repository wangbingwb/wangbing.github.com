/**
 * 轻量级控件，调用函数生成时间选择控件，确认后调用回调函数返回data;
 * @param cb 回调函数 例:selectTime(function(data){console.log(data.time.toString()))}
 */
var selectTime = function(cb){
    var html = '<div id="time-line" style="width:100%;background-color:#eee;font-size:0px;position:fixed">'
        +'<div style="width:70%;margin:0px auto;position:relative">'
        +        '<div class="focus" style="position:absolute;height:30px;background-color:rgba(236, 154, 154, 0.11);top:60px;left:0px;width:100%;border-radius:30px;">'
        +            '<div style="line-height: inherit;font-size: inherit;display: inline;position:absolute;left:30%;">:</div>'
        +           '<div style="line-height: inherit;font-size: inherit;display: inline;position:absolute;right:30%;">:</div>'
        +       '</div>'
        +       '<div class="hour" style="width:33.33%;height:100%;display:inline-block;overflow:hidden;position:relative;">'
        +           '<ul style="padding:0px;margin:0px;width: 100%;height:480%;;font-size:initial;display:block;position: absolute;top:60px;">'
        +           '</ul>'
        +       '</div>'
        +       '<div class="minute" style="width:33.33%;height:100%;display:inline-block;overflow:hidden;position:relative;">'
        +            '<ul style="padding:0px;margin:0px;width: 100%;height:1200%;;font-size:initial;display:block;position: absolute;top:60px;">'
        +            '</ul>'
        +        '</div>'
        +        '<div class="second" style="width:33.33%;height:100%;display:inline-block;overflow:hidden;position:relative;">'
        +            '<ul style="padding:0px;margin:0px;width: 100%;height:1200%;font-size:initial;display:block;position: absolute;top:60px;">'
        +            '</ul>'
        +        '</div>'
        +        '<div class="make-cancel"style="position:absolute;height:100%;width:20%;background-color:rgb(255, 75, 75);left:-20%;top:0px;">'
        +            '<div style="display: table;height: 100%;width: 100%">'
        +                '<div style="display:table-cell;font-size: initial;vertical-align: middle">'
        +                    '<div style="font-size: initial;text-align: center;font-weight: bold;color: white;">'
        +                        '取消'
        +                    '</div>'
        +                '</div>'
        +            '</div>'
        +        '</div>'
        +        '<div class="make-sure"style="position:absolute;height:100%;width:20%;background-color:rgb(85, 219, 102);right:-20%;top:0px;">'
        +            '<div style="display: table;height: 100%;width: 100%">'
        +                '<div style="display:table-cell;font-size: initial;vertical-align: middle">'
        +                    '<div style="font-size: initial;text-align: center;font-weight:bold;color:white;">'
        +                        '确认'
        +                    '</div>'
        +                '</div>'
        +            '</div>'
        +        '</div>'
        +    '</div>'
        +'</div>'
    $("body").append(html);

    var html = "<li style='list-style:none;height:4.16667%;width:50%;margin:0px auto;text-align: center'>";
    for(var i = 0;i<24;i++){
        if(i<10){
            $("#time-line .hour ul").append(html+"0"+i+"</li>");
        }else{
            $("#time-line .hour ul").append(html+i+"</li>")
        }
    }

    var html = "<li style='list-style:none;height:1.66667%;width:50%;margin:0px auto;text-align: center;'>";
    for(var i = 0;i<60;i++){
        if(i<10){
            $("#time-line .minute ul").append(html+"0"+i+"</li>");
        }else{
            $("#time-line .minute ul").append(html+i+"</li>")
        }
    }

    var html = "<li style='list-style:none;height:1.66667%;width:50%;margin:0px auto;text-align: center;'>";
    for(var i = 0;i<60;i++){
        if(i<10){
            $("#time-line .second ul").append(html+"0"+i+"</li>");
        }else{
            $("#time-line .second ul").append(html+i+"</li>")
        }
    }

    var liHeight = 30;
    var startY;//按下抬起的开始点
    var touchPosition;//触摸点
    var beginY;//计算速度开始位置，随时更新
    var v;//滑动速度
    var time = {};
    time.toString = function(){
        return time.hours+":"+time.minutes+":"+time.seconds;
    }
    $("#time-line").css("height",liHeight*5+"px")
    $("#time-line .focus").css("lineHeight",liHeight+"px").css("fontSize",liHeight+"px").css("color","#55DB66")

    $("#time-line ul li:nth-child(1)").each(function(){
        $(this).css("color","#55DB66")
        $(this).css("fontSize",liHeight+"px")
    });

    $("#time-line ul li").css("line-height",parseInt($("#time-line ul li").css("height"))+"px")

    $("#time-line ul").bind("touchstart",function(event){
        if(event.originalEvent.targetTouches.length == 1){
            event.preventDefault();
            var touch = event.originalEvent.targetTouches[0];
            startY = touch.screenY;
            touchPosition = touch.screenY;

            //开始记录
            setInterval(function(){
                beginY = touchPosition;
                setTimeout(function(){
                    var count =(touchPosition - beginY)/100
                    if(Math.abs(count) > 0.5){
                        v = count;
                    }else{
                        v = 0;
                    }
                },200)
            },100);
        }
    })

    $("#time-line ul").bind("touchmove",function(event){
        if(event.originalEvent.targetTouches.length == 1){
            event.preventDefault();
            var touch = event.originalEvent.targetTouches[0];
            var top = $(this).css("top");
            var offset = touch.screenY-startY;
            startY = touch.screenY;
            touchPosition = touch.screenY;
            $(this).css("top",(parseInt(top)+offset)+"px");

            var nowTop = parseInt($(this).css("top"));
            var index = Math.round((liHeight*3-nowTop)/liHeight);
            $(this).find("li").each(function(){
                $(this).css("color","")
                $(this).css("fontSize","initial")
            })
            $(this).find("li:nth-child("+index+")").each(function(){
                $(this).css("color","#55DB66")
                $(this).css("fontSize",liHeight+"px")
            })
        }
    })

    $("#time-line ul").bind("touchend",function(event){
        //惯性滑动
        var s = v * 300;
        var b = parseInt($(this).css("top"));
        $(this).animate({top:(b+s)+"px"},v*10,function(){
            var nowTop = parseInt($(this).css("top"));
            $(this).css("top",Math.round((nowTop/liHeight))*liHeight+"px")

            var nowTop = parseInt($(this).css("top"));
            var ulHeight = $(this).height();
            //计算溢出
            if(nowTop > liHeight*2){
                //向下溢出
                $(this).animate({top:liHeight*2+"px"},1,function(){
                    $(this).find("li").each(function(){
                        $(this).css("color","")
                        $(this).css("fontSize","initial")
                    });
                    var index = Math.round((liHeight*3-nowTop)/liHeight);
                    var i = 0;
                    $(this).find("li:nth-child(1)").each(function(){
                        $(this).css("color","#55DB66")
                        $(this).css("fontSize",liHeight+"px")
                    })
                })
            }else if(nowTop < -(ulHeight-liHeight*3)){
                //向上溢出
                $(this).animate({top: -(ulHeight-liHeight*3)+"px"},1,function(){
                    $(this).find("li").each(function(){
                        $(this).css("color","")
                        $(this).css("fontSize","initial")
                    });
                    $(this).find("li:nth-last-child(1)").each(function(){
                        $(this).css("color","#55DB66")
                        $(this).css("fontSize",liHeight+"px")
                    })
                })
            }else{
                //定位
                $(this).animate({top:nowTop+"px"},1,function(){
                    $(this).find("li").each(function(){
                        $(this).css("color","")
                        $(this).css("fontSize","initial")
                    });
                    var index = Math.round((liHeight*3-nowTop)/liHeight);
                    $(this).find("li:nth-child("+index+")").each(function(){
                        $(this).css("color","#55DB66")
                        $(this).css("fontSize",liHeight+"px")
                    })
                })
            }
        });
    })

    $("#time-line .make-sure").bind("click",function(){
        $("#time-line .hour ul").each(function(){
            index = Math.abs((parseInt($(this).css("top"))-liHeight*2)/liHeight);
            time.hours = $(this).find("li:nth-child("+(index+1)+")").html();
        })
        $("#time-line .minute ul").each(function(){
            index = Math.abs((parseInt($(this).css("top"))-liHeight*2)/liHeight);
            time.minutes = $(this).find("li:nth-child("+(index+1)+")").html();
        })
        $("#time-line .second ul").each(function(){
            index = Math.abs((parseInt($(this).css("top"))-liHeight*2)/liHeight);
            time.seconds = $(this).find("li:nth-child("+(index+1)+")").html();
        })
        $("#time-line").animate({top:'-100%'},400,"linear",function(){
            $(this).remove();
            if(cb instanceof Function){
                var data = {};
                data.time = time;
                cb(data)
            }
        })
    })
    $("#time-line .make-cancel").bind("click",function(){
        $("#time-line").animate({left:'-100%'},400,"linear",function(){
            $(this).remove();
        });
    })
}