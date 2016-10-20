##### /res/animator目录下是用来定义属性动画（Property Animation）资源的。
这些资源都代表一个Animator类，Animator是一个抽象类，它的子类是：AnimatorSet、ValueAnimator、ObjectAnimator、TimeAnimator。
在该目录下的XML资源文件的根元素可以有3个：
- `<set.../>`：它是一个父元素，可以包含<set.../>、<objectAnimator../>或<animator.../>，该元素定义的资源代表AnimatorSet对象。
- `<objectAnimator.../>`：用于定义ObjectAnimator动画对象
- `<animator.../>`：用于定义ValueAnimator动画对象。

##### 调用方式：
```java
//加载属性动画对象
Animator animator = AnimatorInflater.loadAnimator(MainActivity.this,R.animator.object);
//设置需要执行的对象
animator.setTarget(img);
//开始动画
animator.start();
```

##### 以下一个简单的动画调用实例：
布局很简单这边就不贴代码了：
一个按钮+一个ImageView

animator: 这边只是做了一个X轴Y轴的放大动画
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android" android:ordering="together">
    <objectAnimator
        android:duration="1000"//持续时间
        android:valueType="floatType"//变化值得类型
        android:propertyName="scaleX"//变化的属性名
        android:valueFrom="1"//初始值
        android:valueTo="2"//最终值>
    </objectAnimator>
</set>
```

java调用代码
```java
btn.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {

        //1. 加载动画
        Animator animator = AnimatorInflater.loadAnimator(MainActivity.this,R.animator.object);

        //2. 这边目的是为了使缩放中心在左上角
        img.setPivotX(0);
        img.setPivotY(0);
        img.invalidate();

        //3. 设置目标
        animator.setTarget(img);

        //4. 开始动画
        animator.start();
    }
});
```
##### 实际动画效果如下：
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160413%20233920.gif)