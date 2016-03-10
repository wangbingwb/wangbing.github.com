Angularjs中指令其实并不复杂，它就像html一样是写在html里的标签或属性。只是这标签或属性游览器不认识而已。而我们定义Angularjs指令，就是做一件例如‘翻译’这样的事，来让这标签或属性转换成游览器可以认识html代码。
说的直白一点就是，把我们在html中打上我们标签或属性的tag替换成我们所需要的。
例如下面
```java
<hello></hello>
```
这个标签游览器是不会认识的，但是因为前后有标签开始和结束符号，因此游览器会忽略它。它也不会影响我们显示。
如何让angularjs来‘翻译’它了，这就要用到指令
```java
angular.module("index", []) .directive("hello",function(){
        return {
            restrict: 'E',
            replace: true,
            controller: ["$scope", function($scope){
                 $scope.name = "小明"
            }],
            template:"<p>Hello {{name}}<p>"
```

#### restrict 的取值可以有三种：
- A 用于元素的 Attribute，这是默认值
- E 用于元素的名称
- C 用于 CSS 中的 class

#### replace true表示替换<hello></hello>

#### controller 便是这个指令的控制器

#### template是我们需要替换的html模板

当angularjs应用加载起来时，这边的<hello></hello>标签就会被替换成
<p>Hello 小明<p>
这样一个指令就算定义好了