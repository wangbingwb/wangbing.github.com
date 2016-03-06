AdapterViewFlipper继承了AdapterViewAnimator，它也会显示Adapter提供的View，但是它每次只能显示一个View。程序可以调用showNext()和showPrevious()控制该组件显示下一个和上一个组件。View切换时也可以使用动画效果。
下面是AdapterViewFlipper的可以设置的XML属性。

```java
    <AdapterViewFlipper
        android:animateFirstView="true"//是否显示第一个view的动画效果
        android:loopViews="true"//是否自动循环
        android:inAnimation="@anim/slide_in_left"//显示动画
        android:outAnimation="@anim/slide_out_right"//退出动画
        android:autoStart="true"//自动播放
        android:flipInterval="1000"//播放间隔
        android:layout_width="match_parent"
        android:layout_height="match_parent">
```

java代码中只需要为 AdapterViewFlipper设置Adapter即可。
此处省略...

另外可以调用
showPrevious()显示上一个组件
showNext()显示下一个
startFlipping()自动播放
stopFlipper()停止播放
