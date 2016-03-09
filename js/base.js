//日志目录api接口
var rootUrl = "http://api.github.com/repos/wangbingwb/wb/contents/blog"

var BodyCtrl = function ($scope,ContentService,CookieService,$sce) {
    $scope.vm = {
        isDoFind:true,
        isFinish:false,
        pageSize:10,
        pageNumber:1,
        key:""
    }

    $scope.nav = {

    }
    $scope.doFind = function(){
        $scope.vm.isDoFind = true;
        $scope.vm.isFinish = false;
        ContentService.getList($scope.vm).success(function (data) {
            if (data.resultList.length > 0){

                //按时间倒序
                data.resultList.sort(function(a,b){return a.time< b.time?1:-1})
                //过滤
                var temp = [];
                for(var i in data.resultList){
                    if (data.resultList[i].title.match($scope.vm.key)){
                        temp.push(data.resultList[i]);
                    }
                }
                data.resultList = temp;
                $scope.vm.totalCount = data.resultList.length;

                var startIndex = ($scope.vm.pageNumber - 1)*$scope.vm.pageSize;
                var endIndex = ($scope.vm.pageNumber)*$scope.vm.pageSize;
                if (data.resultList.length  < endIndex){
                    endIndex = data.resultList.length;
                }

                $scope.result = (data.resultList.slice(startIndex,endIndex));

                $scope.vm.isFinish = true;
                $scope.vm.isDoFind = true;
            }
            $scope.doPage();
        });
    }

    $scope.view = function(index){
        $scope.vm.isDoFind = false;
        $scope.vm.isFinish = false;
        var obj = $scope.result[index]
        var url ="blog/"+obj.type+"/"+obj.time+"-"+obj.title+".md"
        ContentService.getContent(url).success(function (data) {
            $scope.article = {
                title:$scope.result[index].title,
                time:$scope.result[index].time,
                type:$scope.result[index].type,
                content:data
            }
            window.location.href = window.location.href+"#!"+encodeURI(url.substring(5,url.length));
            //$scope.article.content = $sce.trustAsHtml(markdown.toHTML(data));
            //console.log(data)
            setTimeout("toHtmlView()",10)
            $scope.vm.isFinish = true;
        }).error(function(){
            util.showMessage("提示","未能获取到内容",function(){
                $scope.doFind();
            })
        });
    }

    $scope.init = function(){
        var href = window.location.href;
        if (/html#!.*/.test(href)){
            if(/#!.*\\.md/.test(href)){
                $scope.vm.isDoFind = false;
                $scope.vm.isFinish = false;
                var url = href.match("#!.*\\.md")[0];
                url = url.substring(2,url.length);
                url ="blog/"+ url
                ContentService.getContent(url).success(function (data) {
                    $scope.article = {
                        content:data
                    }
                    var href = window.location.href;
                    href = decodeURI(href);
                    $scope.article.title = href.match("[0-9]{4}-[0-9]{2}-[0-9]{2}-.*\\.md")[0].substring(11,href.match("[0-9]{4}-[0-9]{2}-[0-9]{2}-.*\\.md")[0].length-3);
                    $scope.article.time = href.match("/[0-9]{4}-[0-9]{2}-[0-9]{2}")[0].substring(1,href.match("/[0-9]{4}-[0-9]{2}-[0-9]{2}")[0].length);
                    $scope.article.type = href.match("#!.*/")[0].substring(2,href.match("#!.*/")[0].length-1);
                    //$scope.article.content = $sce.trustAsHtml(markdown.toHTML(data));
                    console.log( $scope.article)
                    setTimeout("toHtmlView()",10)
                    $scope.vm.isFinish = true;
                }).error(function(){
                    util.showMessage("提示","未能获取到内容",function(){
                        $scope.doFind();
                        window.location.href = window.location.href.match(".*index.html");
                    })
                });
            }else{
                util.showMessage("提示","未能获取到内容",function(){
                    $scope.doFind();
                    window.location.href = window.location.href.match(".*index.html");
                })
            }
        }else{
            $scope.doFind();
        }
    }
    setTimeout(function(){
        $scope.init();
    },10);

    $scope.doSearch = function(e){
        if (e.keyCode == 13){
            $scope.vm.pageNumber = 1;
            $scope.doFind();
        }
    }

    $scope.selectPage = function(index){
        $scope.vm.pageNumber = index;
        $scope.doFind();
    }

    $scope.doPage = function(){
        $scope.pages = [];
        var count = Math.ceil($scope.vm.totalCount/$scope.vm.pageSize)
        $scope.pages.push({action:1,name:"<<",isSelect:false});
        for(var i = 0;i < count;i++){
            if( $scope.vm.pageNumber == (i+1)){
                $scope.pages.push({
                    action:(i+1),name:(i+1),isSelect:true
                })
            }else{
                $scope.pages.push({
                    action:(i+1),name:(i+1),isSelect:false
                })
            }
        }
        $scope.pages.push({action:count,name:">>",isSelect:false});
        console.log($scope.pages)
    };

    $scope.navshow = CookieService.getNavShow(true);
    if($scope.navshow == "true"){
        $scope.navshow = true;
        $scope.nav.hidetip = "隐藏"
    }else{
        $scope.navshow = false;
        $scope.nav.hidetip = "显示"
    }
    $scope.dohide = function(){
        $scope.navshow = !$scope.navshow;
        CookieService.setNavShow($scope.navshow);
        if($scope.navshow){
            $scope.nav.hidetip = "隐藏"
        }else{
            $scope.nav.hidetip = "显示"
        }
    }
}

angular.module("index", ['ngAnimate'])
    .controller("BodyCtrl", ["$scope","ContentService","CookieService","$sce",BodyCtrl])
    .factory("ContentService", ['$http', function ($http) {
        var service = {};
        service.getList = function (data) {
            return $http({
                method: 'GET',
                url: "list.json",
                data: data
            });
        };
        service.getContent = function (url) {
            return $http({
                method: 'GET',
                url: url
            });
        };
        return service;
    }])
    .factory("CookieService", ['$http', function ($http) {
        var service = {};
        service.setNavShow = function (flag) {
            var now=new Date();
            now.setTime(now.getTime()+30*24*60*60*1000)
            var cookie= "NavShow="+flag+";path=/;expires="+now.toUTCString();
            document.cookie = cookie;
        };
        service.getNavShow = function (def) {
            console.log(document.cookie)
            var ck = document.cookie.split(";");
            for (var i in ck){
                if(ck[i].split("=")[0] == "NavShow"){
                    return ck[i].split("=")[1]
                }
            }
            return def;
        };
        return service;
    }])
    .directive("hello",function(){
        return {
            restrict: 'A',
            replace: true,
            controller: ["$scope", function($scope){
                $scope.dateList = [];

                $scope.now = new Date();
                console.log("当前月"+($scope.now.getMonth()+1))

                //当月总天数
                var daysCount= new Date($scope.now.getFullYear(),($scope.now.getMonth()+1),0).getDate();
                //当月第一天星期
                var dayStart = new Date($scope.now.getFullYear(),($scope.now.getMonth()),1).getDay();

                for (var i = dayStart;i>1;i--){
                    var cursor = new Date($scope.now.getFullYear(),($scope.now.getMonth()),(2-i));
                    $scope.dateList.push({
                        year:cursor.getFullYear(),
                        month:cursor.getMonth()+1,
                        day:cursor.getDate(),
                        isCurrent:false
                    });
                }
                for (var i = 1; i<=daysCount;i++){
                    var cursor = new Date($scope.now.getFullYear(),($scope.now.getMonth()),i);
                    $scope.dateList.push({
                        year:cursor.getFullYear(),
                        month:cursor.getMonth()+1,
                        day:cursor.getDate(),
                        isCurrent:true
                    });
                }
                var dayEnd =new Date($scope.now.getFullYear(),($scope.now.getMonth()),daysCount).getDay();
                console.log(dayEnd)
                for(var i = 1;i <= 7-dayEnd;i++){
                    var cursor = new Date($scope.now.getFullYear(),($scope.now.getMonth()+1),i);
                    $scope.dateList.push({
                        year:cursor.getFullYear(),
                        month:cursor.getMonth()+1,
                        day:cursor.getDate(),
                        isCurrent:false
                    });
                }

                console.log($scope.dateList)

                $scope.exc = function(){
                    //var m = $scope.now.get;
                }

            }],
            template: '<div class="wb-calender"><div class="content"><ul><li ng-repeat="date in dateList"><a ng-class="{false:&quot;cover&quot;}[date.isCurrent]">{{ date.day}}</a></li></ul></div></div>',

        }
    })


function toHtmlView(){
    var target = $("#articleBody").val();

    var testEditormdView = editormd.markdownToHTML("articleBody-view", {
        //markdown        : data ,//+ "\r\n" + $("#append-test").text(),
        markdown        : target ,//+ "\r\n" + $("#append-test").text(),
        //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
        htmlDecode      : "style,script,iframe",  // you can filter tags decode
        //toc             : false,
        tocm            : true,    // Using [TOCM]
        //tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
        //gfm             : false,
        //tocDropdown     : true,
        // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
        emoji           : true,
        taskList        : true,
        tex             : true,  // 默认不解析
        flowChart       : true,  // 默认不解析
        sequenceDiagram : true,  // 默认不解析
    });
}
