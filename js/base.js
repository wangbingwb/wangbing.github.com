//日志目录api接口
var rootUrl = "http://api.github.com/repos/wangbingwb/wb/contents/blog"

var BodyCtrl = function ($scope,ContentService,CookieService) {
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
            if (data.blog.resultList.length > 0){

                //按时间倒序
                data.blog.resultList.sort(function(a,b){return a.time< b.time?1:-1});
                $scope.writedataList = [];
                for(var i in data.blog.resultList){
                    $scope.writedataList.push(data.blog.resultList[i].time);
                }

                //过滤
                var temp = [];
                for(var i in data.blog.resultList){
                    if (data.blog.resultList[i].title.match($scope.vm.key)){
                        temp.push(data.blog.resultList[i]);
                    }
                }
                data.blog.resultList = temp;
                $scope.vm.totalCount = data.blog.resultList.length;

                var startIndex = ($scope.vm.pageNumber - 1)*$scope.vm.pageSize;
                var endIndex = ($scope.vm.pageNumber)*$scope.vm.pageSize;
                if (data.blog.resultList.length  < endIndex){
                    endIndex = data.blog.resultList.length;
                }

                $scope.result = (data.blog.resultList.slice(startIndex,endIndex));

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
            if(/#!.*\.md/.test(href)){
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

var LibCtrl = function ($scope,ContentService,CookieService) {
    $scope.nav = {

    }

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

    $scope.androidLibList = [
        {name:"文本TextView",type:"textview",checked:true},
        {name:"对话框Dialog",type:"dialog",checked:false},
        {name:"图片ImageView",type:"imageview",checked:false},
        {name:"按钮Button",type:"button",checked:false},
        {name:"滚动ScrollView",type:"scrollview",checked:false},
        {name:"列表ListView",type:"listview",checked:false},
        {name:"布局类Layout",type:"layout",checked:false},
        {name:"页卡切换TabView",type:"tabview",checked:false},
        {name:"进度条Process",type:"process",checked:false},
        {name:"文本TextView",type:"textview",checked:false},
        {name:"时间控件",type:"dateview",checked:false},
        {name:"其他控件",type:"otherview",checked:false}
    ]

    $scope.selectlib = function(index){
        $scope.androidLibList.forEach(function(item){
            item.checked=false;
        })
        $scope.androidLibList[index].checked=true;
    }
}

var WriteCtrl = function ($scope,ContentService,CookieService) {
    $scope.nav = {

    }

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

    $scope.clip = function(){

        var copyText = $("span.cm-cm-overlay.cm-matchhighlight").text();

        var isIE = false;
        if(!+[1,]) {
            isIE = true;
        }
        if(isIE) {
            if(window.clipboardData) {
                window.clipboardData.setData(format, copyText);
            }
        }else{

        }
    }
}

angular.module("index", ['ngAnimate'])
    .controller("BodyCtrl", ["$scope","ContentService","CookieService",BodyCtrl])
    .controller("LibCtrl", ["$scope","ContentService","CookieService",LibCtrl])
    .controller("WriteCtrl", ["$scope","ContentService","CookieService",WriteCtrl])
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
    .directive("calender",function(){
        return {
            restrict: 'A',
            replace: true,
            scope: false,
            controller: ["$scope", function($scope){
                $scope.$watch("writedataList",function(){
                    for(var i in $scope.dateList){
                        for(var j in $scope.writedataList){
                            if ($scope.dateList[i].time == $scope.writedataList[j]){
                                $scope.dateList[i].isWrite = true;
                            }
                        }
                    }
                });
                $scope.$watch("dateList",function(){
                    for(var i in $scope.dateList){
                        for(var j in $scope.writedataList){
                            if ($scope.dateList[i].time == $scope.writedataList[j]){
                                $scope.dateList[i].isWrite = true;
                            }
                        }
                    }
                });
                $scope.now = new Date();
                $scope.exc = function(){
                    $scope.dateList = [];
                    //当月总天数
                    var daysCount= new Date($scope.now.getFullYear(),($scope.now.getMonth()+1),0).getDate();
                    //当月第一天星期
                    var dayStart = new Date($scope.now.getFullYear(),($scope.now.getMonth()),1).getDay();
                    console.log("第一天是星期"+ dayStart)
                    for (var i = dayStart;i>0;i--){
                        var cursor = new Date($scope.now.getFullYear(),($scope.now.getMonth()),(-i));
                        $scope.dateList.push({
                            year:cursor.getFullYear(),
                            month:cursor.getMonth()+1,
                            day:cursor.getDate(),
                            time:cursor.getFullYear()+"-" + ((cursor.getMonth()+1)<10?("0"+(cursor.getMonth()+1)):(cursor.getMonth()+1))+ "-" + (cursor.getDate()<10?("0"+cursor.getDate()):cursor.getDate()),
                            isCurrent:false
                        });
                    }
                    for (var i = 1; i<=daysCount;i++){
                        var cursor = new Date($scope.now.getFullYear(),($scope.now.getMonth()),i);
                        $scope.dateList.push({
                            year:cursor.getFullYear(),
                            month:cursor.getMonth()+1,
                            day:cursor.getDate(),
                            time:cursor.getFullYear()+"-" + ((cursor.getMonth()+1)<10?("0"+(cursor.getMonth()+1)):(cursor.getMonth()+1))+ "-" + (cursor.getDate()<10?("0"+cursor.getDate()):cursor.getDate()),
                            isCurrent:true
                        });
                    }
                    var dayEnd =new Date($scope.now.getFullYear(),($scope.now.getMonth()),daysCount).getDay();
                    console.log("最后一天是星期"+ dayEnd)
                    for(var i = 1;i < 7-dayEnd;i++){
                        var cursor = new Date($scope.now.getFullYear(),($scope.now.getMonth()+1),i);
                        $scope.dateList.push({
                            year:cursor.getFullYear(),
                            month:cursor.getMonth()+1,
                            day:cursor.getDate(),
                            time:cursor.getFullYear()+"-" + ((cursor.getMonth()+1)<10?("0"+(cursor.getMonth()+1)):(cursor.getMonth()+1))+ "-" + (cursor.getDate()<10?("0"+cursor.getDate()):cursor.getDate()),
                            isCurrent:false
                        });
                    }
                };
                $scope.exc();
                $scope.lastMonth = function(){
                    $scope.now = new Date($scope.now.getFullYear(),$scope.now.getMonth()-1,$scope.now.getDate());
                    $scope.exc();
                }
                $scope.nextMonth = function(){
                    $scope.now = new Date($scope.now.getFullYear(),$scope.now.getMonth()+1,$scope.now.getDate());
                    $scope.exc();
                }
                $scope.lastYear = function(){
                    $scope.now = new Date($scope.now.getFullYear()-1,$scope.now.getMonth(),$scope.now.getDate());
                    $scope.exc();
                }
                $scope.nextYear = function(){
                    $scope.now = new Date($scope.now.getFullYear()+1,$scope.now.getMonth(),$scope.now.getDate());
                    $scope.exc();
                }

            }],
            template: '<div class="wb-calender">' +
            '<div class="ctrl">' +
            '<ul><li ng-click="lastMonth()"><a>&lt;</a></li>' +
            '<li ng-click="lastYear()"><a>&lt;&lt;</a></li>' +
            '<li class="date" ng-view><a>{{now | date:"yyyy-MM"}}</a></li>' +
            '<li ng-click="nextYear()"><a>&gt;&gt;</a></li>' +
            '<li ng-click="nextMonth()"><a>&gt;</a></li>' +
            '</ul>' +
            '</div>' +
            '<div class="nav"><ul><li>Su</li><li>Mo</li><li>Tu</li><li>We</li><li>Th</li><li>Fr</li><li>Sa</li></ul></div>' +
            '<div class="content" ng-view><ul><li ng-class="{true:&quot;tag&quot;}[date.isWrite]" ng-repeat="date in dateList"><a ng-class="{false:&quot;cover&quot;}[date.isCurrent]">{{ date.day}}</a></li></ul></div></div>',
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
