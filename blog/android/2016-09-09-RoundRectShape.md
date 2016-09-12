RoundRectShape是ShapeDrawable的一个辅助类，用来描述具体的形状。所以ShapeDrawable的形状实际是由一系列的Shape类来实现的。

RoundRectShape从名称中就可以看出是描述圆角矩形的。

构造函数
`public RoundRectShape(float[] outerRadii, RectF inset, float[] innerRadii)`

参数1 外矩形各圆角的大小
    参照例图 R1-R8
    例如: new float[]{5,5,5,5,5,5,5,5}
参数2 外矩形与内矩形各边的距离
    RectF类的4个参数分别表示各边的距离
    参照例图 L,T,R,B
    例如: new RectF(1,1,1,1)
参数3 内矩形各圆角的大小
    参照例图 r1-r8
    例如: new float[]{4,4,4,4,4,4,4,4}

![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160912155615.jpg)