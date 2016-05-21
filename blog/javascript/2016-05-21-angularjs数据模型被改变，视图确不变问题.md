今天在使用angularjs时，发现一个奇怪的问题。就是我改变了对应的model，但是页面数据确没有变化。原本以为是controller控制器嵌套，又嵌套指令的原因。查找自己是不是有哪些代码不妥，但研究了半天也没发现什么不妥。
好在后来改变了调查方向，会不会是angularjs存在的一些缺陷或是什么了。
百度了一下，还真有这问题。
看了这篇文章，太有作用了。
[关于angularjs中,数据模型被改变,页面不刷新的解决办法](http://blog.csdn.net/baby97/article/details/50329689 "关于angularjs中,数据模型被改变,页面不刷新的解决办法")

其实原因也很简单：
在angularjs中使用了JS方法
而我却实是这样的

```java
                $scope.updateSecond = function(){
                    console.log($scope.second);
                    var now = new Date();
                    $scope.second = now.getSeconds();
                }
                setInterval(function(){
                    $scope.updateSecond();
                },1000);
```

解决办法也是很简单：

在需要更新模型的地方调用该句就行
```java
       $scope.$apply();
```

上面则可以变为
```java
                $scope.updateSecond = function(){
                    console.log($scope.second);
                    var now = new Date();
                    $scope.second = now.getSeconds();
                    $scope.$apply();//这个地方改变了数据，需要通知angularjs
                }
                setInterval(function(){
                    $scope.updateSecond();
                },1000);
```
