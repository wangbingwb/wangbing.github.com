viewSwitcher继承自ViewAnimator，都是用来切换View的。ViewAnimator与ViewSwitcher的不同点就在于的ViewAnimator可以add（View view）增加多个视图（2个以上也可以），而ViewSwitch虽然也可add（View view），不过ViewSwitcher最多只能增加2个View。超过2个以上则会报
> java.lang.IllegalStateException: Can't add more than 2 views to a ViewSwitcher

相对于ViewAnimator，这是一个优化，对于不显示的View确实不需要加载到内存，这样对低端机的支持会更好。

##### 下面一个小例子：
```java
@Bind(R.id.viewSwitcher)
    private ViewSwitcher viewSwitcher;
    @Bind(R.id.last)
    private Button last;
    @Bind(R.id.next)
    private Button next;
    private int count = 0;//textView需要显示的内容

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        viewSwitcher.setFactory(new ViewSwitcher.ViewFactory() {
            @Override
            public View makeView() {
                //这边通过makeView来给我们创建实例，而不用addView
                return new TextView(MainActivity.this);
            }
        });

        next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TextView nextView = (TextView)viewSwitcher.getNextView();
                nextView.setText(String.valueOf(++count));
                viewSwitcher.showNext();

            }
        });
        last.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TextView nextView = (TextView)viewSwitcher.getNextView();
                nextView.setText(String.valueOf(--count));
                viewSwitcher.showPrevious();
            }
        });
    }
```

xml布局文件
```html
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ViewSwitcher
        android:id="@+id/viewSwitcher"
        android:layout_width="match_parent"
        android:animateFirstView="true"
        android:inAnimation="@anim/slide_in_right"
        android:outAnimation="@anim/slide_out_left"
        android:layout_weight="1"
        android:layout_height="0dp">
    </ViewSwitcher>

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

</LinearLayout>
```

