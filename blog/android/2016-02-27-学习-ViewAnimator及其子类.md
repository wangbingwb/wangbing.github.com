ViewAnimator是一个基类，它继承了FrameLayout，因此它表现出FrameLayout的特征，可以将多个view叠加在一起。另外ViewAnimatore额外增加的功能，在View切换时可以表现出动画效果。
##### ViewAnimator及其子类继承图如下:
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/e61190ef76c6a7ef70345787f9faaf51f3de6605.png)

##### 实例代码
###### 布局文件
```java
    <ViewAnimator
        android:id="@+id/viewAnimator"
        android:layout_width="match_parent"
        android:animateFirstView="true"
        android:inAnimation="@anim/slide_in_right"
        android:outAnimation="@anim/slide_out_left"
        android:layout_weight="1"
        android:layout_height="0dp">
    </ViewAnimator>

    <Button
        android:id="@+id/last"
        android:text="上一个"
        android:layout_width="match_parent"
        android:layout_height="50dp" />
    <Button
        android:id="@+id/next"
        android:text="下一个"
        android:layout_width="match_parent"
        android:layout_height="50dp" />
```

##### 动画
slide_in_left.xml
```html
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="-100%p" android:duration="400"></translate>
</set>
```
slide_in_right.xml
```html
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
<translate android:fromXDelta="100%p" android:duration="400"></translate>
</set>
```

###### 代码
> 这边只是简单的增加5个TextView

```java
        for (int i = 0; i < 5; i++) {
            TextView textView = new TextView(this);
            textView.setText("A"+i);
            viewAnimator.addView(textView);
        }

        last.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //上一个View
                viewAnimator.showPrevious();
            }
        });

        next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //下一个View
                viewAnimator.showNext();

            }
        });

```
效果如下
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/QQ%E6%88%AA%E5%9B%BE20160301230541.jpg)