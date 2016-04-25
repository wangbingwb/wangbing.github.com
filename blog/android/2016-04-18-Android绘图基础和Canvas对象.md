其实之前Swing也是接触不多。其中自定义View时也是需要继承原有的View的。通过重写paint(Graphices g)方法来绘制我们自己的控件。
Android中自定义View方式也是与Swing类似。Android中通常是继承View组件，重写onDraw(Canvas canvas)方法。
所以这里需要掌握Canvas的一些绘图Api才行。
Canvas代表“画布”，它提供了一些常用的绘制一些基本图形的方法：

例如
- drawArc - 绘制一个弧
- drawBitmap- 绘制一个位图
- drawCircle- 绘制一个圆
- drawLines- 绘制一条直线
- drawPoint- 绘制一个点
- drawPath- 绘制一个path指定的形状
- drawText- 绘制文字
- drawRect- 绘制矩形
- drawRoundRect- 绘制一个圆角矩形
- drawOval- 绘制椭圆
- clipRect- 剪切一个矩形

绘制图形时还会涉及一个对象Paint，有画布当然有画笔，不然怎么画了。
既然是画笔，当然可以设置一些特点：
例如：
- setARGB - 设置颜色
- setAlpha- 设置透明度
- setAntiAlias - 设置是否抗锯齿
- setColor - 设置颜色
- setPathEffect - 绘制路径效果
- setShadowLayer - 设置阴影效果
- setStrokeWidth-  设置画笔宽度
- setStrokeJoin-设置画笔转弯的连接风格
- setStyle - 设置填充风格
- setTextAlign - 设置文本对齐方式
- setTextSize - 设置文本字体大小

这里只是简单有个概念，不涉及具体用法，以后再针对具体用法写个日志。


Canvas在绘制图形时
还可以进行变换：例如旋转，缩放，斜变和平移
Canvas.rotate(float degrees, float px, float py)
Canvas.scale(float sx, float sy, float px, float py)
Canvas.skew(float sx, float sy)
Canvas.translate(float dx, float dy)

Path类
通过意思就可以基本理解，Canvas在绘制路径时会沿着path类所指定路径的进行绘制。

以上基本就是android的绘图需要掌握的基础了。不过想要熟练掌握可能需要多花时间。