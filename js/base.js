$(function() {
    var rootUrl = "http://api.github.com/repos/wangbingwb/wb/contents/blog"
    var html = window.location.href;
    console.log(html)
    var globeList = [
        {
            "name": "2013-04-09-一个新的开始",
            "path": "md/2013-04-09-一个新的开始",
            "sha": "ca7f4129cc994d58ffb18576ecb8280638a1e511",
            "size": 763,
            "url": "https://api.github.com/repos/wangbingwb/wangbing/contents/md/2013-04-09-%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84%E5%BC%80%E5%A7%8B?ref=gh-pages",
            "html_url": "https://github.com/wangbingwb/wangbing/blob/gh-pages/md/2013-04-09-%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84%E5%BC%80%E5%A7%8B",
            "git_url": "https://api.github.com/repos/wangbingwb/wangbing/git/blobs/ca7f4129cc994d58ffb18576ecb8280638a1e511",
            "download_url": "https://raw.githubusercontent.com/wangbingwb/wangbing/gh-pages/md/2013-04-09-%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84%E5%BC%80%E5%A7%8B",
            "type": "file",
            "_links": {
                "self": "https://api.github.com/repos/wangbingwb/wangbing/contents/md/2013-04-09-%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84%E5%BC%80%E5%A7%8B?ref=gh-pages",
                "git": "https://api.github.com/repos/wangbingwb/wangbing/git/blobs/ca7f4129cc994d58ffb18576ecb8280638a1e511",
                "html": "https://github.com/wangbingwb/wangbing/blob/gh-pages/md/2013-04-09-%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84%E5%BC%80%E5%A7%8B"
            }
        },
        {
            "name": "2013-04-10-一个新的开始",
            "path": "md/2013-04-10-一个新的开始",
            "sha": "ca7f4129cc994d58ffb18576ecb8280638a1e511",
            "size": 763,
            "url": "https://api.github.com/repos/wangbingwb/wangbing/contents/md/2013-04-10-%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84%E5%BC%80%E5%A7%8B?ref=gh-pages",
            "html_url": "https://github.com/wangbingwb/wangbing/blob/gh-pages/md/2013-04-10-%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84%E5%BC%80%E5%A7%8B",
            "git_url": "https://api.github.com/repos/wangbingwb/wangbing/git/blobs/ca7f4129cc994d58ffb18576ecb8280638a1e511",
            "download_url": "https://raw.githubusercontent.com/wangbingwb/wangbing/gh-pages/md/2013-04-10-%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84%E5%BC%80%E5%A7%8B",
            "type": "file",
            "_links": {
                "self": "https://api.github.com/repos/wangbingwb/wangbing/contents/md/2013-04-10-%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84%E5%BC%80%E5%A7%8B?ref=gh-pages",
                "git": "https://api.github.com/repos/wangbingwb/wangbing/git/blobs/ca7f4129cc994d58ffb18576ecb8280638a1e511",
                "html": "https://github.com/wangbingwb/wangbing/blob/gh-pages/md/2013-04-10-%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84%E5%BC%80%E5%A7%8B"
            }
        },
        {
            "name": "2014-02-10-Hello World",
            "path": "md/2014-02-10-Hello World",
            "sha": "813fd5193130f51f81e11ecb6d6a1dacc4d3fe58",
            "size": 15,
            "url": "https://api.github.com/repos/wangbingwb/wangbing/contents/md/2014-02-10-Hello%20World?ref=gh-pages",
            "html_url": "https://github.com/wangbingwb/wangbing/blob/gh-pages/md/2014-02-10-Hello%20World",
            "git_url": "https://api.github.com/repos/wangbingwb/wangbing/git/blobs/813fd5193130f51f81e11ecb6d6a1dacc4d3fe58",
            "download_url": "https://raw.githubusercontent.com/wangbingwb/wangbing/gh-pages/md/2014-02-10-Hello%20World",
            "type": "file",
            "_links": {
                "self": "https://api.github.com/repos/wangbingwb/wangbing/contents/md/2014-02-10-Hello%20World?ref=gh-pages",
                "git": "https://api.github.com/repos/wangbingwb/wangbing/git/blobs/813fd5193130f51f81e11ecb6d6a1dacc4d3fe58",
                "html": "https://github.com/wangbingwb/wangbing/blob/gh-pages/md/2014-02-10-Hello%20World"
            }
        },
        {
            "name": "2014-02-11-Hello World",
            "path": "md/2014-02-11-Hello World",
            "sha": "813fd5193130f51f81e11ecb6d6a1dacc4d3fe58",
            "size": 15,
            "url": "https://api.github.com/repos/wangbingwb/wangbing/contents/md/2014-02-11-Hello%20World?ref=gh-pages",
            "html_url": "https://github.com/wangbingwb/wangbing/blob/gh-pages/md/2014-02-11-Hello%20World",
            "git_url": "https://api.github.com/repos/wangbingwb/wangbing/git/blobs/813fd5193130f51f81e11ecb6d6a1dacc4d3fe58",
            "download_url": "https://raw.githubusercontent.com/wangbingwb/wangbing/gh-pages/md/2014-02-11-Hello%20World",
            "type": "file",
            "_links": {
                "self": "https://api.github.com/repos/wangbingwb/wangbing/contents/md/2014-02-11-Hello%20World?ref=gh-pages",
                "git": "https://api.github.com/repos/wangbingwb/wangbing/git/blobs/813fd5193130f51f81e11ecb6d6a1dacc4d3fe58",
                "html": "https://github.com/wangbingwb/wangbing/blob/gh-pages/md/2014-02-11-Hello%20World"
            }
        },
        {
            "name": "test1",
            "path": "md/test1",
            "sha": "7c995404a26a20d00878f14541fc2691ae270867",
            "size": 0,
            "url": "https://api.github.com/repos/wangbingwb/wangbing/contents/md/test1?ref=gh-pages",
            "html_url": "https://github.com/wangbingwb/wangbing/tree/gh-pages/md/test1",
            "git_url": "https://api.github.com/repos/wangbingwb/wangbing/git/trees/7c995404a26a20d00878f14541fc2691ae270867",
            "download_url": null,
            "type": "dir",
            "_links": {
                "self": "https://api.github.com/repos/wangbingwb/wangbing/contents/md/test1?ref=gh-pages",
                "git": "https://api.github.com/repos/wangbingwb/wangbing/git/trees/7c995404a26a20d00878f14541fc2691ae270867",
                "html": "https://github.com/wangbingwb/wangbing/tree/gh-pages/md/test1"
            }
        }
    ];
    var dircount = 4;

    var service = {
        getFileList: function (url) {
            $.ajax({
                type: "GET",
                url: url + "?ref=gh-pages",
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "callback",
                success: function (data) {
                    var list = data.data;
                    for (var i in list) {
                        if (list[i].type == "file") {
                            globeList.push(list[i]);
                        }
                    }
                    console.log(globeList);
                }
            });
        }
    }
//service.getFileList(rootUrl+"/other");
//service.getFileList(rootUrl+"/android");
//service.getFileList(rootUrl+"/html");
//service.getFileList(rootUrl+"/java");

    var currentPage = 1;
    var currentList = [];
    var getInfo = function (input, type) {
        var regExp = /\d{4}-\d{2}-\d{2}-.*/g;
        if (regExp.test(input)) {
            //符合命名规范
            var time = input.substring(0, 10);
            var title = input.substr(11, input.length);
            if (type == "title") {
                return title;
            } else if (type == "time") {
                return time;
            }
        } else {
            if (type == "title") {
                return input;
            } else if (type == "time") {
                return "unknown";
            }
        }
    }
    var showItem = function () {
        if (globeList.length < currentPage * 10) {
            currentList = globeList.slice((currentPage - 1) * 10);
        } else {
            currentList = globeList.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10);
        }
        $("#content ul").html("");
        for (var i in currentList) {
            currentList[i].index = i;
            var li = "<li><div class='title'><a href='#!"+currentList[i].path+"' index='"+i+"'>" + getInfo(currentList[i].name, "title") + "</a></div><div class='time'>" + getInfo(currentList[i].name, "time") + "</div></li>";
            $("#content ul").append(li);
        }
        $("#content ul li a").each(function(){
            $(this).bind("click",function(){
                var index = $(this).attr("index");
                $.ajax({
                    type: "GET",
                    url: currentList[index].download_url,
                    //dataType: "jsonp",
                    //jsonp: "callback",
                    //jsonpCallback: "callback",
                    success: function (data) {
                        $("#list").hide()
                        $("#showpanel").html(data)
                        $("#showpanel").show();
                    }
                });
            })
        })
    }

    var loading = function () {
        if (dircount < 4) {
            setTimeout("loading", 200)
        } else {
            globeList.sort();
            globeList.reverse();
            showItem();
        }
    }();

})




//var index = angular.module("app",[]).controller("indexController",["$scope","$http",function($scope,$http){
//
//    //$scope.getSublist = function(subDir){
//    //    $http.jsonp(rootUrl+"/"+subDir+"?ref=gh-pages&callback=showlist").success(function(data){
//    //        angular.forEach(data.data, function(item){
//    //            $scope.list.push(item);
//    //        });
//    //    })
//    //}
//
//    //$http.jsonp(rootUrl+"?ref=gh-pages&callback=showlist").success(function(data){
//        //响应成功
//        if (data.message != undefined && data.message == "Not Found"){
//
//        }else{
//            angular.forEach(data.data, function(item){
//                if (item.type == "file"){
//                    $scope.list.push(item);
//                }else if (item.type == "dir"){
//                    //$scope.getSublist(item.name);
//                }
//            });
//            angular.forEach($scope.list, function(item){
//                var path = item.path;
//                item.tag = "#!" + path.replace("\d{4}-\d{2}-\d{2}-.*","\d{4}/\d{2}/\d{2}/.*")
//            });
//        }
//    });
//
//    $scope.view = function(item){
//        $http({
//            url:item.download_url,
//            method:"post",
//            data:"html"
//        }).success(function(data){
//            $("#showpanel").html(data).show;
//            $("#list").hide();
//        });
//    }

    //$scope.list =

//}])

//index.filter("analysis",function(){
//    return function(input,type){
//        var regExp = /\d{4}-\d{2}-\d{2}-.*/g;
//        if(regExp.test(input)){
//            //符合命名规范
//            var time = input.substring(0,10);
//            console.log(time);
//            var title = input.substr(11,input.length);
//            console.log(title);
//            if(type == "title"){
//                return title;
//            }else if (type == "time"){
//                return time;
//            }
//        }else {
//            if(type == "title"){
//                return input;
//            }else if (type == "time"){
//                return "unknown";
//            }
//        }
//    }
//})