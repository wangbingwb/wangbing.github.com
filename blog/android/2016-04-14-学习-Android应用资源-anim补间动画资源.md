/res/anim文件夹中可以存放补间(Tween)动画。
什么是补间动画了？补间动画只需要开发者指定开始，结束的“关键帧”，而动画变化的中间帧是由系统来计算并补齐。
```flow
1=>start: 开始帧
2=>operation: 系统补充帧
3=>operation: 系统补充帧
4=>end: 结束帧

1->2->3->4
```

对于补间动画而言，我们无须“逐一”定义动画的过程的每一帧，而是只要定义开始于结束的关键帧，并且指定持续时间。因为他简明的定义方式，所以补间动画的方式也只支持一些简单的变化，比如图形放大、缩小等简单变化。
Android中的用Animation代表抽象的动画类，它包括如下几个子类：
- AlphaAnimation：透明度动画，透明度从0~1
- ScaleAnimation：大小缩放动画，缩放比通过X、Y轴缩放参数来控制，可以指定pivotX、pivotY“中心坐标”
- TranslateAnimation：位移变化
- RotateAnimation：旋转变化，可以指定pivotX、pivotY“中心坐标”

它们对应的XML标签分别为<alpha../>、<scale../>、<translate../>及<rotate../>
1. <alpha../>
android:fromAlpha="1" : 开始值
android:toAlpha="0" ： 结束值
android:duration="1000" ： 持续时间
2. <scale../>
android:fromXScale="1" : X轴开始缩放比例值
android:toXScale="1.5" X轴结束缩放比例值
android:fromYScale="1" Y轴开始缩放比例值
android:toYScale="1.5" Y轴结束缩放比例值
android:duration="1000" ： 持续时间
3. <translate../>
android:fromXDelta="0%" : X轴相对自身的的开始值,0%p表示相对屏幕
android:toXDelta="100%" : X轴相对自身的的结束值
android:fromYDelta="0%" : Y轴相对自身的的开始值
android:toYDelta="100%" : Y轴相对自身的的结束值
android:duration="500" : 持续时间

4. <rotate../>
android:pivotX="50%" ： 旋转中心点X轴位置
android:pivotY="50%" ： 旋转中心点Y轴位置
android:fromDegrees="0" ： 旋转开始角度值
android:toDegrees="360" ： 旋转结束角度值
android:duration="1000" : 持续时间

##### 动画的状态控制：
一但3个条件满足后，Android会计算中需要补如多少帧。至于在动画期间如何控制插入的方式就需要Interpolator这个对象了。
Interpolator是一个接口，系统提供了以下一些常用的实现类：

| Interpolator对象 | 资源ID | 功能作用
| ------------ | ------------ |
| AccelerateDecelerateInterpolator | @android:anim/accelerate_decelerate_interpolator | 先加速再减速 |
| AccelerateInterpolator | @android:anim/accelerate_interpolator | 加速 |
| AnticipateInterpolator | @android:anim/anticipate_interpolator | 先回退一小步然后加速前进 |
| AnticipateOvershootInterpolator | @android:anim/anticipate_overshoot_interpolator | 在上一个基础上超出终点一小步再回到终点 |
| BounceInterpolator | @android:anim/bounce_interpolator | 最后阶段弹球效果 |
| CycleInterpolator | @android:anim/cycle_interpolator | 周期运动 |
| DecelerateInterpolator | @android:anim/decelerate_interpolator | 减速 |
| LinearInterpolator | @android:anim/linear_interpolator | 匀速 |
| OvershootInterpolator | @android:anim/overshoot_interpolator | 快速到达终点并超出一小步最后回到终点 |


#### 下面一个简单的动画展示：
##### 布局文件
```java
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <Button
        android:id="@+id/btn"
        android:text="show animation"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

    <ImageView
        android:id="@+id/img1"
        android:src="@drawable/zh_1"
        android:layout_width="100dp"
        android:layout_height="100dp" />
    <ImageView
        android:id="@+id/img2"
        android:src="@drawable/zh_1"
        android:layout_width="100dp"
        android:layout_height="100dp" />
    <ImageView
        android:id="@+id/img3"
        android:src="@drawable/zh_1"
        android:layout_width="100dp"
        android:layout_height="100dp" />
    <ImageView
        android:id="@+id/img4"
        android:src="@drawable/zh_1"
        android:layout_width="100dp"
        android:layout_height="100dp" />
</LinearLayout>
```

```java
btn.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        Animation animation1 = AnimationUtils.loadAnimation(MainActivity.this, R.anim.alpha);
        Animation animation2 = AnimationUtils.loadAnimation(MainActivity.this, R.anim.scale);
        Animation animation3 = AnimationUtils.loadAnimation(MainActivity.this, R.anim.transalte);
        Animation animation4 = AnimationUtils.loadAnimation(MainActivity.this, R.anim.rotate);
        img1.startAnimation(animation1);
        img2.startAnimation(animation2);
        img3.startAnimation(animation3);
        img4.startAnimation(animation4);
    }
});
```

<alpha../>
```java
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <alpha android:fromAlpha="1" android:toAlpha="0" android:duration="1000"></alpha>
</set>
```
<scale../>
```java
<set xmlns:android="http://schemas.android.com/apk/res/android" android:interpolator="">
    <scale android:fromXScale="1" android:toXScale="1.5" android:fromYScale="1" android:toYScale="1.5" android:duration="1000"></scale>
</set>
```
<translate../>
```java
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="0%" android:toXDelta="100%" android:duration="500"></translate>
    <translate android:fromXDelta="0%" android:toXDelta="-100%" android:duration="500" android:startOffset="500"></translate>
</set>
```
<rotate../>
```java
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <rotate android:pivotX="50%" android:pivotY="50%" android:fromDegrees="0" android:toDegrees="360" android:duration="1000"></rotate>
</set>
```
##### 效果图如下:
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160414220942.gif)