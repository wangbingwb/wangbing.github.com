$(function(){
    //url根目录
    var url = location.href.match(".*/wb/webApp/")+"";

    //加载header
    var header = $("#header");
    if(header.length > 0){
        $.ajax({
            url:url+"header.html",
            async:true,
            dataType:"html",
            success:function(data){
                header.html(data);
                angular.bootstrap(document.getElementById("index"),["index"])
                $(".icon-home").attr("href",url+"index.html")
            },
            error:function(data){
                util.showError("服务器开了小差!")
            }
        });
    }
        //加载页脚
//        var footer = $("#footer");
//        if(header.length > 0){
//            $.ajax({
//                url:url+"footer.html",
//                async:true,
//                dataType:"html",
//                success:function(data){
//                    footer.html(data);
//                },
//                error:function(data){
//                    util.showError("服务器开了小差!")
//                }
//            });
//        }
    })

angular.module("index",[]).controller("indexController",function($scope){
    $scope.recordList = [];
    $scope.info = "asaasdasd";
    for(var i = 0; i<31; i++){
        var item = {};
        item.title = "title"+i;
        item.link = "aaaaa.html";
        $scope.recordList.push(item);
    }
    $scope.search = function(){
        var key = $("#key").val();
        $scope.key = key;
    }
    $scope.hide = function(){
        var obj = $("a.flag.hide");
        if(obj.length > 0){
            $("#header .info").animate({width:"200px"},400,"linear");
            $("a.flag.hide").removeClass("hide");
            $("#main").removeClass("full");
        }else{
            $("#header .info").animate({width:"0px"},400,"linear");
            $("a.flag").addClass("hide");
            $("#main").addClass("full");
        }
    }
})