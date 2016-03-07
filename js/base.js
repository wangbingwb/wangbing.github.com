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
    $scope.doFind();
    $scope.add = function(){
        $scope.vm.isDoFind = !$scope.vm.isDoFind
    };

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
