原代码
```java
public void setCompoundDrawables(@Nullable Drawable left, @Nullable Drawable top,
            @Nullable Drawable right, @Nullable Drawable bottom)
```
该方法是用来设置TextView上下左右的Drawable的，也就是说它的上下左右都是可以设置图片或者自己draw一个标志的。
####具体看一下如何使用:
```java
        ColorDrawable left = new ColorDrawable(Color.RED);
        left.setBounds(0,0,50,150);

        ColorDrawable top = new ColorDrawable(Color.BLUE);
        top.setBounds(0,0,150,50);

        ColorDrawable right = new ColorDrawable(Color.YELLOW);
        right.setBounds(0,0,50,50);

        ColorDrawable bottom = new ColorDrawable(Color.BLACK);
        bottom.setBounds(0,0,50,50);

        txt.setCompoundDrawables(left,top,right,bottom);
```
####效果图:
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20161021103334.jpg)

之前还在想，对角处是如何处理的，看到效果图就一目了然了，对角处是会留白的。