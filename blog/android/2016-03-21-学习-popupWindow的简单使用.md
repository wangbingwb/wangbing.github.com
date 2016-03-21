PopupWindow可以创建类似对话框风格的窗口，使用PopupWindow创建对话框只需两步
1.创建PopupWindow对象
2.显示PopupWindow，调用PopupWindow的showAsDropDown(View v)放在某个View下面，或showAtLocation()指定位置

#### 一个简单的例子：
```java
btn.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        final PopupWindow popupWindow = new PopupWindow();

        //设置内容
        View inflate = getLayoutInflater().inflate(R.layout.pop, null);
        Button dismiss = (Button) inflate.findViewById(R.id.dismiss);
        dismiss.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                popupWindow.dismiss();
            }
        });
        popupWindow.setContentView(inflate);

        //设置宽高
        popupWindow.setWidth(ViewGroup.LayoutParams.MATCH_PARENT);
        popupWindow.setHeight(400);

        //显示
        popupWindow.showAsDropDown(findViewById(R.id.btn), 0, 0);

    }
});
```

##### 布局
```java
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:background="#aaaaaa"
    android:layout_height="match_parent">

    <TextView
        android:layout_weight="1"
        android:text="popupWindow"
        android:layout_width="match_parent"
        android:layout_height="0dp" />

    <Button
        android:id="@+id/dismiss"
        android:text="dismiss"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />
</LinearLayout>
```

##### 效果
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160321233159.gif)


#### 这边指定位子显示
```java
popupWindow.showAtLocation(findViewById(R.id.btn), Gravity.BOTTOM ,0, 0);
```
##### 效果
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160321233160.gif)