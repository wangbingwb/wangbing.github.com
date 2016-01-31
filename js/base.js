//日志目录api接口
var rootUrl = "http://api.github.com/repos/wangbingwb/wb/contents/blog"

var BodyCtrl = function ($scope,ContentService) {
    $scope.vm = {
        isDoFind:true,
        isFinish:false,
        pageSize:10,
        pageNumber:1,
        key:""
    }
    $scope.doFind = function(){
        $scope.vm.isDoFind = true;
        $scope.vm.isFinish = false;
        ContentService.getList($scope.vm).success(function (data) {
            if (data.resultList.length > 0){
                //过滤
                var temp = [];
                for(var i in data.resultList){
                    if (data.resultList[i].title.match($scope.vm.key)){
                        temp.push(data.resultList[i]);
                    }
                }
                data.resultList = temp;
                $scope.vm.totalCount = data.resultList.length;

                var startIndex = ($scope.vm.pageNumber - 1)*$scope.vm.pageSize
                var endIndex = ($scope.vm.pageNumber)*$scope.vm.pageSize
                if (data.resultList.length  < endIndex){
                    endIndex = data.resultList.length;
                }
                $scope.result = (data.resultList.slice(startIndex,endIndex))
                $scope.vm.isFinish = true;
                $scope.vm.isDoFind = true;
            }
            $scope.doPage();
        });
    }
    $scope.doFind();

    $scope.view = function(index){
        $scope.vm.isDoFind = false;
        $scope.vm.isFinish = false;
        var obj = $scope.result[index]
        var url ="blog/"+obj.type+"/"+obj.time+"-"+obj.title
        ContentService.getContent(url).success(function (data) {
            $scope.article = {
                title:$scope.result[index].title,
                time:$scope.result[index].time,
                type:$scope.result[index].type,
                content:data
            }
            $scope.vm.isFinish = true;
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
}

angular.module("index", [])
    .controller("BodyCtrl", ["$scope","ContentService",BodyCtrl])
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