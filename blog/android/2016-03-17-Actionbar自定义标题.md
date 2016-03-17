周围也有几个做安卓开发的同事，不过他们好像不怎么用安卓中自带的title或actionbar。更多的是涉及有标题的界面是在contentView中自定义。效果杠杠的，也很灵活，各种效果也可以很好的展示。
但是在我想来，标题部分是一个通用功能，并不属于主要内容展示区的，没有必要去与内容混合在一起。从google的设计理念也可以看出，标题是与内容不同的。
标题部分样式完全可以在BaseActivity中实现，其他Activity继承即可，我们所要变换的只是各个Activity内容对应的标题信息。
Actionbar完全有能力实现我们所需要功能，结构比在contentView中定义一个组合title清晰多了。

#### 注意点：
主题默认是不开启Title和Actionbar。原因是：当我程序中不需要显示actionbar，onCreate中调用actionBar.hide()，还是会闪现以下，体验感很不好。所以主题中需要默认关闭title和actionbar

下面是我实现的效果：
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160317232548.jpg)


#### 以下是我的实现代码：
主题样式中必须设置以下属性
```java
        <item name="android:windowTitleSize">0dp</item>
        <item name="android:windowActionBar">false</item>
```

#### 标题布局
```java
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="50dp"
    android:layout_gravity="center_vertical"
    android:background="@android:color/darker_gray"
    android:orientation="horizontal" >

    <TextView
        android:id="@+id/left"
        android:text="返回"
        android:layout_width="0dp"
        android:layout_weight="1"
        android:layout_height="match_parent"
        android:textSize="18sp"
        android:gravity="center"
        android:textColor="#FF0000FF" />

    <TextView
        android:id="@+id/title"
        android:text=""
        android:layout_weight="3"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:textSize="18sp"
        android:gravity="center"
        android:textColor="#FFFFFF00" />

    <TextView
        android:id="@+id/right"
        android:text=""
        android:layout_weight="1"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:textSize="18sp"
        android:gravity="center"
        android:textColor="#FFFFFF00" />
</LinearLayout>
```

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //这边开启Actionbar
        getWindow().requestFeature(Window.FEATURE_ACTION_BAR);
    }
```

##### 下面是BaseActivity中的方法
```java
public void setTitle(String left,String title,String right){
        final ActionBar actionBar = getActionBar();
        if (actionBar != null){
            //这边设置背景透明色，然后我们就可以自有发挥了
            actionBar.setBackgroundDrawable(new ColorDrawable(Color.argb(0, 0, 0, 0)));
            //布局
            actionBar.setCustomView(R.layout.tit);
            //开启显示自定义
            actionBar.setDisplayShowCustomEnabled(true);
            //下面两个必须设为false,如果不设，看下效果就知道
            actionBar.setDisplayShowHomeEnabled(false);
            actionBar.setDisplayShowTitleEnabled(false);

            //下面就是正常的代码了，我这边只是设置了3个TextView
            TextView txtTitle = (TextView) actionBar.getCustomView().findViewById(R.id.title);
            txtTitle.setText(title);
            TextView txtLeft = (TextView) actionBar.getCustomView().findViewById(R.id.left);
            TextView txtRight = (TextView) actionBar.getCustomView().findViewById(R.id.right);
            txtLeft.setText(left);
            txtRight.setText(right);

            //这边还有可以设置动画，感觉棒棒哒！
            View customView = actionBar.getCustomView();
            AnimationSet set = new AnimationSet(true);
            AlphaAnimation alphaAnimation = new AlphaAnimation(0,1);
            alphaAnimation.setDuration(1000);
            set.addAnimation(alphaAnimation);
            customView.startAnimation(set);
            actionBar.show();
        }
    }
```

##### 另外的Activity只需继承
```java
public class MainActivity extends BaseActivity
```

##### 下面调用，需要title则掉用，不需要则不掉用
```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setTitle("<","我是标题","右");
    }
```

##### 在程序中还可以隐藏、显示
```java
        select.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final ActionBar actionBar = getActionBar();
                if (actionBar != null){
                    if (actionBar.isShowing()){
                        View customView = actionBar.getCustomView();
                        AnimationSet set = new AnimationSet(true);
                        AlphaAnimation alphaAnimation = new AlphaAnimation(1,0);
                        alphaAnimation.setDuration(1000);
                        set.addAnimation(alphaAnimation);
                        customView.startAnimation(set);
                        actionBar.hide();
                    }else {
                        View customView = actionBar.getCustomView();
                        AnimationSet set = new AnimationSet(true);
                        AlphaAnimation alphaAnimation = new AlphaAnimation(0,1);
                        alphaAnimation.setDuration(1000);
                        set.addAnimation(alphaAnimation);
                        customView.startAnimation(set);
                        actionBar.show();
                    }
                }
            }
        });
```

