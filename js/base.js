$(function() {
    //日志目录api接口
    var rootUrl = "http://api.github.com/repos/wangbingwb/wb/contents/blog"
    var href = window.location.href;
    //最大尝试读取lsit次数
    var tryLimit = 3;
    //最近一次url
    var lastHref = "";
    //当前显示页码
    var currentPage = 1;
    //当前显示页的list集合
    var currentList = [];
    //过滤list集合
    var searchList = [];
    //所有list集合
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
    ];

    /**
     * 获取文章list
     * @param url 目录url
     */
    var getBolgList = function (url) {
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
            },
            error: function (){
                if(tryLimit > 0){
                    tryLimit --;
                    getBolgList(url);
                }
            }
        });
    }
//service.getFileList(rootUrl+"/other");
//service.getFileList(rootUrl+"/android");
//service.getFileList(rootUrl+"/html");
//service.getFileList(rootUrl+"/java");

    /**
     * 解析名称
     * @param input 名称 -->  2000-11-11-name
     * @param type title/time title --> name time --> 2000-11-11
     */
    var getInfo = function (input, type) {
        var regExp = /\d{4}-\d{2}-\d{2}-.*/g;
        if (regExp.test(input)) {
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

    /**
     * 执行查询
     * @param key
     */
    var doSearch = function(key){
        if(key){
            searchList = [];
            for(var i in globeList){
                if (globeList[i].name.match(key)){
                    searchList.push(globeList[i]);
                }
            }
            showSearchItem(1);
        }else{
            showItem(1);
        }

    }

    /**
     * 显示搜索后的第page页
     * @param page
     */
    var showSearchItem = function (page) {
        currentPage = page;
        if (searchList.length < currentPage * 10) {
            currentList = searchList.slice((currentPage - 1) * 10);
        } else {
            currentList = searchList.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10);
        }
        $("#content ul").html("");
        for (var i in currentList) {
            currentList[i].index = i;
            var li = "<li><div class='title'><a href='#!"+currentList[i].path+"'>" + getInfo(currentList[i].name, "title") + "</a></div><div class='time'>" + getInfo(currentList[i].name, "time") + "</div></li>";
            $("#content ul").append(li);
        }
        $("#loader").hide();
        $("#showpanel").hide();
        $("#list").show();
    }

    /**
     * 显示第page页
     * @param page
     */
    var showItem = function (page) {
        currentPage = page;
        if (globeList.length < currentPage * 10) {
            currentList = globeList.slice((currentPage - 1) * 10);
        } else {
            currentList = globeList.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10);
        }
        $("#content ul").html("");
        for (var i in currentList) {
            currentList[i].index = i;
            var li = "<li><div class='title'><a href='#!"+currentList[i].path+"'>" + getInfo(currentList[i].name, "title") + "</a></div><div class='time'>" + getInfo(currentList[i].name, "time") + "</div></li>";
            $("#content ul").append(li);
        }
        $("#loader").hide();
        $("#showpanel").hide();
        $("#list").show();
    }

    var setTitleAndBody = function(name){
        $("#title").html(name.substring(11));
        for (var i in globeList){
            if(globeList[i].name == name){
                $.ajax({
                    type: "GET",
                    url: globeList[i].download_url,
                    success: function (data) {
                        $("#body").html(data);
                        $("#loader").hide();
                        $("#list").hide();
                        $("#showpanel").show();
                    },
                    error: function(){
                        console.log("请求错误一次")
                        setTitleAndBody(name)
                    }
                });
            }
        }
    }

    //绑定回车事件
    $('#key').keydown(function(e){
        if(e.keyCode==13) {
            var key = $("#key").val();
            console.log(key)
            var temp = window.location.href+"";
            if(key){
                if (/#!.*/.test(temp)){
                    temp = temp.replace(/#!.*/,"#!search="+key);
                    window.location.href = temp;
                }else{
                    window.location.href = temp+"#!search="+key
                }
            }else{
                window.location.href = temp.replace(/#!.*/,"");
            }

        }
    })

    setInterval(function(){
        var temp = window.location.href
        if (lastHref != temp){
            lastHref = temp;
            if (/#!search=.+/.test(lastHref)){
                var key = (lastHref.match(/#!search=.+/)+"").substring(9);
                doSearch(key);
                console.log(key)
            }else if (/\d{4}-\d{2}-\d{2}-.+/.test(lastHref)){
                var name = (lastHref.match(/\d{4}-\d{2}-\d{2}-.+/)+"").substring(11);
                if ($("#title").html != name){
                    $("#loader").show();
                    $("#showpanel").hide();
                    $("#list").hide();
                    setTitleAndBody(lastHref.match(/\d{4}-\d{2}-\d{2}-.+/)+"");
                }
            }else {
                showItem(1);
            }
        }
        //if (dircount >= 4) {
        //    globeList.sort();
        //    globeList.reverse();
        //    showItem(1);
        //    dircount--;
        //}
    },200)
})
