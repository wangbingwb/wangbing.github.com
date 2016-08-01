//日志目录api接口
var rootUrl = "http://api.github.com/repos/wangbingwb/wb/contents/blog"

var GlobalCtrl = function($scope,ContentService,CookieService) {

    $scope.nav = {

    }

    $scope.navshow = CookieService.getNavShow("true");
    Log.i("导航是否显示:"+$scope.navshow)
    console.log($scope.navshow == "true")
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

    $scope.header = {
        lastTime:0,
        viewflag:[],
        mousemove:function(e){
            if(new Date().getTime() - $scope.header.lastTime < 100){
                return;
            }
            if($scope.header.viewflag.length > 0){
                $scope.header.viewflag.splice(0,1,{x:e.clientX,y:e.clientY});
            }else{
                $scope.header.viewflag.push({x:e.clientX,y:e.clientY});
            }
            $scope.header.lastTime = new Date().getTime();
        },
        mouseout:function(){
            $scope.header.viewflag.splice(0,1, {x:-999,y:-999});
        }
    }
    $scope.themeEmum={
        normal:1,
        night:2
    }

    $scope.theme = Number(CookieService.getTheme());

    $scope.themeChange = function(){
        $scope.theme = $scope.theme%2+1;
        CookieService.setTheme($scope.theme);
        if ($scope.theme == Number(CookieService.getTheme())){
            Log.d("theme cookie save successed")
        }else{
            Log.d("theme cookie save failed")
        }
    }
}

var BodyCtrl = function ($scope,ContentService,CookieService) {
    $scope.vm = {
        waiting:true,
        isView:false,
        pageSize:10,
        pageNumber:1,
        key:"",
    }
    $scope.typeCount = {};

    $scope.doFind = function(){
        //做一些初始化工作
        $scope.vm.waiting = true;
        $scope.vm.isView = false;

        ContentService.getList($scope.vm).success(function (data) {
            if (data.blog.resultList.length > 0){

                //按时间倒序
                data.blog.resultList.sort(function(a,b){return a.time< b.time?1:-1});
                $scope.writedataList = [];

                //初始化
                $scope.typeCount = {
                    android:0,
                    javascript:0,
                    java:0,
                    other:0,
                    all:0,
                }
                for(var i in data.blog.resultList){
                    $scope.writedataList.push(data.blog.resultList[i].time);
                    if (data.blog.resultList[i].type == "android"){
                        $scope.typeCount.android ++;
                    }else if(data.blog.resultList[i].type == "javascript"){
                        $scope.typeCount.javascript ++;
                    }else if(data.blog.resultList[i].type == "java"){
                        $scope.typeCount.java ++;
                    }else if(data.blog.resultList[i].type == "other"){
                        $scope.typeCount.other ++;
                    }
                    $scope.typeCount.all ++;
                }
                Log.d("总共"+$scope.typeCount.all);

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

                $scope.vm.waiting = false;
            }
            $scope.doPage();
        });
    };
    $scope.doFind();

    $scope.find = function(){
        window.history.replaceState({},0,"index.html");
        $scope.doFind();
    };

    $scope.view = function(index){
        $scope.vm.waiting = true;
        var obj = $scope.result[index]
        var url ="blog/"+obj.type+"/"+obj.time+"-"+obj.title+".md"
        ContentService.getContent(url).success(function (data) {
            $scope.article = {
                title:$scope.result[index].title,
                time:$scope.result[index].time,
                type:$scope.result[index].type,
                content:data
            }
            window.history.replaceState ({},0,window.location.pathname+"#!"+encodeURI(url.substring(5,url.length)));
            //$scope.article.content = $sce.trustAsHtml(markdown.toHTML(data));
            Log.d("文章正文-----start");
            //Log.d(data);
            Log.d("文章正文-----end");
            setTimeout("toHtmlView()",10)
            $scope.vm.waiting = false;
            $scope.vm.isView = true;
        }).error(function(){
            util.showMessage("提示","未能获取到内容",function(){
                $scope.doFind();
            })
        });
    }

    $scope.init = function(){
        var href = window.location.href;
        if(!href.match(".*html.*")){
            window.history.replaceState ({},0,"index.html");
        }
        href = window.location.href;

        if (/html#!.*/.test(href)){
            Log.d("url后参数存在");
            if(/#!.*\.md/.test(href)){
                $scope.vm.waiting = true;
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
                    Log.i("url查找文章");
                    setTimeout("toHtmlView()",10)
                    $scope.vm.waiting = false;
                    $scope.vm.isView = true;
                }).error(function(){
                    util.showMessage("提示","未能获取到内容",function(){
                        //$scope.doFind();
                        window.location.href = window.location.href.match(".*index.html");
                    })
                });
            }else{
                Log.d("url后参数不合法");
                util.showMessage("提示","未能获取到内容",function(){
                    //$scope.doFind();
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

    //地址变化监听
    window.onpopstate = function () {
        $scope.init();
    }

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
        Log.d("分页对象-----start");
        Log.d(JSON.stringify($scope.pages));
        Log.d("分页对象-----end");
    };

}

var LibCtrl = function ($scope,ContentService,CookieService) {
    $scope.androidLibList = [
        {name:"文本TextView",type:"textview",checked:true},
        {name:"消息Toast",type:"toast",checked:false},
        {name:"对话框Dialog",type:"dialog",checked:false},
        {name:"图片ImageView",type:"imageview",checked:false},
        {name:"按钮Button",type:"button",checked:false},
        {name:"RadioButton",type:"radiobutton",checked:false},
        {name:"滚动ScrollView",type:"scrollview",checked:false},
        {name:"列表ListView",type:"listview",checked:false},
        {name:"布局类Layout",type:"layout",checked:false},
        {name:"页卡切换TabView",type:"tabview",checked:false},
        {name:"进度条Process",type:"process",checked:false},
        {name:"时间控件",type:"dateview",checked:false},
        {name:"其他控件",type:"otherview",checked:false}
    ];

    ContentService.getList({}).success(function (data) {
        if(data.lib && data.lib.resultList.length > 0){
            $scope.allList = data.lib.resultList;
            $scope.obtain();
        }
    });

    $scope.obtain = function(){
        for(var i in $scope.androidLibList){
            if($scope.androidLibList[i].checked){
                $scope.result = [];
                for(var j in $scope.allList){
                    if($scope.androidLibList[i].type ==$scope.allList[j].type){
                        $scope.result.push($scope.allList[j]);
                    }
                }
                console.log($scope.result);
                break;
            }
        }
    }

    $scope.selectlib = function(index){
        $scope.androidLibList.forEach(function(item){
            item.checked=false;
        })
        $scope.androidLibList[index].checked=true;
        $scope.obtain();
    }
}

var WriteCtrl = function ($scope,ContentService,CookieService) {
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
    .controller("GlobalCtrl", ["$scope","ContentService","CookieService",GlobalCtrl])
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
            Log.d("NavShow find")
            var ck = document.cookie.split(";");
            for (var i in ck){
                if(/NavShow/.test(ck[i].split("=")[0])){
                    Log.d(ck[i]);
                    return ck[i].split("=")[1]
                }
            }
            return def;
        };
        service.setClockPostion = function (postion) {
            var now=new Date();
            now.setTime(now.getTime()+30*24*60*60*1000)
            var cookie= "ClockPostion="+JSON.stringify(postion)+";path=/;expires="+now.toUTCString();
            document.cookie = cookie;
        };
        service.getClockPostion = function () {
            Log.d("ClockPostion find")
            var ck = document.cookie.split(";");
            for (var i in ck){
                if(/ClockPostion/.test(ck[i].split("=")[0])){
                    Log.d(ck[i]);
                    return JSON.parse(ck[i].split("=")[1]);
                }
            }
            return {top:0,left:0};
        };
        service.setTheme = function (value) {
            var now=new Date();
            now.setTime(now.getTime()+30*24*60*60*1000)
            var cookie= "Theme="+value+";path=/;expires="+now.toUTCString();
            document.cookie = cookie;
        };
        service.getTheme = function () {
            Log.d("Theme find")
            var ck = document.cookie.split(";");
            for (var i in ck){
                if(/Theme/.test(ck[i].split("=")[0])){
                    Log.d(ck[i]);
                    return ck[i].split("=")[1];
                }
            }
            return 1;
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
                    Log.d("第一天是星期"+ dayStart)
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
                    Log.d("最后一天是星期"+ dayEnd)
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
                $scope.direction = "";
                $scope.lastMonth = function(){
                    $scope.now = new Date($scope.now.getFullYear(),$scope.now.getMonth()-1,$scope.now.getDate());
                    $scope.direction = "left";
                    $scope.exc();
                }
                $scope.nextMonth = function(){
                    $scope.now = new Date($scope.now.getFullYear(),$scope.now.getMonth()+1,$scope.now.getDate());
                    $scope.direction = "right";
                    $scope.exc();
                }
                $scope.lastYear = function(){
                    $scope.now = new Date($scope.now.getFullYear()-1,$scope.now.getMonth(),$scope.now.getDate());
                    $scope.direction = "left";
                    $scope.exc();
                }
                $scope.nextYear = function(){
                    $scope.now = new Date($scope.now.getFullYear()+1,$scope.now.getMonth(),$scope.now.getDate());
                    $scope.direction = "right";
                    $scope.exc();
                }
                $scope.show = function(index){
                    var to = new Date();
                    var t = to.getFullYear()+"-"+((to.getMonth()+1)<10?"0"+(to.getMonth()+1):(to.getMonth()+1))+"-"+(to.getDate()<10?"0"+to.getDate():to.getDate());

                    if($scope.dateList[index].time == t){
                        if($scope.dateList[index].isWrite){
                            util.showSlideMessage("我今天写了，怎么了?")
                        }else{
                            util.showSlideMessage("我今天没写，怎么了?")
                        }
                    }else if($scope.dateList[index].time < t){
                        if($scope.dateList[index].isWrite){
                            util.showSlideMessage("我那天写了，怎么了?")
                        }else{
                            util.showSlideMessage("我那天没写，怎么了?")
                        }
                    }else{
                        util.showSlideMessage("这天还没到我怎么写啊?")
                    }
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
            '<div class="content" ng-view><ul><li ng-click="show($index)" ng-class="{true:&quot;tag&quot;}[date.isWrite]" class="{{direction}}" ng-repeat="date in dateList">' +
            '<a ng-class="{false:&quot;cover&quot;}[date.isCurrent]">{{ date.day}}</a></li></ul></div></div>',
        }
    })
    .directive("clock",function(){
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            controller: ["$scope","CookieService", function($scope,CookieService){
                $scope.position = CookieService.getClockPostion();
                Log.d("clock位置:("+$scope.position.left+","+$scope.position.top+")")

                $scope.clockMousedown = function(event){
                    $scope.pressPostionX = event.clientX;
                    $scope.pressPostionY = event.clientY;
                    $scope.pressed = true;
                    Log.d("鼠标down:("+$scope.pressPostionX+","+$scope.pressPostionY+")")
                }

                $scope.clockMousemove = function(event){
                    if($scope.pressed){
                        $scope.position.left += (event.clientX - $scope.pressPostionX);
                        $scope.position.top += (event.clientY- $scope.pressPostionY);

                        $scope.pressPostionX = event.clientX;
                        $scope.pressPostionY = event.clientY;

                        Log.d("鼠标drag:("+$scope.position.left+","+$scope.position.top+")")
                    }
                }

                $scope.clockMouseup = function(event){
                    Log.d("鼠标up:("+event.clientX+","+event.clientY+")")
                    $scope.pressPostionX = "";
                    $scope.pressPostionY = "";
                    $scope.pressed = false;
                    CookieService.setClockPostion($scope.position);
                }

                $scope.clockMouseout = function(event){
                    Log.d("鼠标out:("+event.clientX+","+event.clientY+")")
                    $scope.pressPostionX = "";
                    $scope.pressPostionY = "";
                    $scope.pressed = false;
                    CookieService.setClockPostion($scope.position);
                }

                var now = new Date();
                $scope.hour = [now.getHours()<10?("0"+now.getHours()):now.getHours()];
                $scope.minute = [now.getMinutes()<10?("0"+now.getMinutes()):now.getMinutes()];
                $scope.second = [now.getSeconds()<10?("0"+now.getSeconds()):now.getSeconds()];
                $scope.showSecond = true;

                $scope.updateSecond = function(){
                    var now = new Date();
                    $scope.hour = [now.getHours()<10?("0"+now.getHours()):now.getHours()];
                    $scope.minute = [now.getMinutes()<10?("0"+now.getMinutes()):now.getMinutes()];
                    $scope.second = [now.getSeconds()<10?("0"+now.getSeconds()):now.getSeconds()];
                    $scope.showSecond = true;
                    $scope.$apply();
                }
                setInterval(function(){
                    $scope.showSecond = false;
                    $scope.$apply();
                    $scope.updateSecond();
                },1000);
            }],
            template: '<div class="wb-clock" style="top:{{position.top}}px;left:{{position.left}}px;" ng-mousedown="clockMousedown($event)" ng-mouseup="clockMouseup($event)" ng-mousemove="clockMousemove($event)" ng-mouseout="clockMouseout($event)">'+
            '<a><div class="background">'+
            '<div class="second" ng-if="showSecond"></div>' +
            '<div class="center"><div class="content">' +
            '<span class="h"><span ng-repeat="h in  hour">{{h}}</span></span>' +
            '<span>:</span>' +
            '<span class="m"><span ng-repeat="m in minute">{{m}}</span></span>' +
            '<span>:</span>' +
            '<span class="s"><span ng-repeat="s in second">{{s}}</span></span>' +
            '</div></div></div></a></div>',
        }
    })
    .directive("nav",function(){
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            controller: ["$scope", function($scope){
                $scope.wbnavs=[
                    {name:"主",action:function(){window.location.href="/wb/index.html";}},
                    {name:"写",action:function(){window.location.href="/wb/write.html";}},
                    {name:"库",action:function(){window.location.href="/wb/lib.html";}},
                    {name:"转",action:function(){$scope.themeChange();}},
                    {name:"↑",action:function(){
                        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                        if(scrollTop>5){
                            window.scrollTo( 0, scrollTop -scrollTop*0.1);
                            var cb = this;
                            setTimeout(function(){
                                cb.action();
                            },10);
                        }else{
                            window.scrollTo( 0, 0);
                        }
                    }},
                ]
                $scope.wbnavsoffset = -36;
                window.onscroll = function(){
                    var scrollTop = -36+(document.documentElement.scrollTop || document.body.scrollTop);
                    if(scrollTop > 0){
                        $scope.wbnavsoffset = 0;
                    }else{
                        $scope.wbnavsoffset = scrollTop;
                    }
                }
            }],
            template: '<div class="wb-nav" style="right: {{wbnavsoffset}}px;"><ul>'+
            '<li ng-repeat="n in wbnavs"><a ng-click="n.action()">{{n.name}}</a></li>'+
            '</ul></div>',
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
