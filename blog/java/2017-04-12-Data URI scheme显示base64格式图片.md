首先理解一下Data URI scheme，先看下Http URI scheme。

<img src="http://www.XXXX.net/files/images/check.png"/>
这种取得数据的方法称为 http URI scheme，其中src中给定的是http形式，也就是做需要一次请求才能获得数据。

这种方式虽然简单，但是为增加网络请求次数，那么为了减少网络请求次数。随之而来的有另一种策略，即 Data URI scheme。
用于替代以上写法，可以写成如下：

<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIA...............AAAQAAe0xFAMAAAAASUVORK5CYII="/>

同样可以完成第一种方式的效果。

#####Http URI scheme它包含一下部分：

data - 取得数据的协定名称
image/png - 数据类型名称
base64 - 数据的编码方法
iVBOR.... - 编码后的数据


#####目前，Data URI scheme支持的类型有:
data:,文本数据
data:text/plain,文本数据
data:text/html,HTML代码
data:text/html;base64,base64编码的HTML代码
data:text/css,CSS代码
data:text/css;base64,base64编码的CSS代码
data:text/javascript,Javascript代码
data:text/javascript;base64,base64编码的Javascript代码
data:image/gif;base64,base64编码的gif图片数据
data:image/png;base64,base64编码的png图片数据
data:image/jpeg;base64,base64编码的jpeg图片数据
data:image/x-icon;base64,base64编码的icon图片数据