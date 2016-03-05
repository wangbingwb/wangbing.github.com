ViewFilpper组件继承了ViewAnimator,可以使用addView（View view）来添加多个子View。
另外ViewFolpper与AdapterViewFilpper相似，它们都可以控制视图的切换，区别只是ViewFilpper需要手动addView（），而AdapterViewFilpper是有Adapter来提供View的。因此ViewFilpper可以指定AdapterViewFilpper相同的XML属性。
##### 如下简单事例：
```java
for (int i = 0; i < 5; i++) {
    //简单的塞入TextView
    TextView textView = new TextView(this);
    textView.setText("A"+i);
    viewFlipper.addView(textView);
}
//自动轮播
viewFlipper.startFlipping();
```

##### XML布局
```java
<ViewFlipper
    android:id="@+id/viewFlipper"
    android:layout_width="match_parent"
    android:animateFirstView="true"
    android:inAnimation="@anim/slide_in_right"
    android:outAnimation="@anim/slide_out_left"
    android:layout_weight="1"
    android:flipInterval="1000"
    android:layout_height="0dp">
</ViewFlipper>
```