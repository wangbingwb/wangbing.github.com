StackView是AdapterViewAnimator的子类。它会以堆叠的方式来显示对个列表项。

##### 按切换方式可以分以下2种:
1. 拖走StackView中处于顶端的组件，下一个View将显示出来。将上一个View拖进StackView，将使之显示出来.
2. 通过调用StackView的showNext(),showPrevious()控制显示下一个，上一个组件。

##### 下面布局：
```java
    <StackView
        android:id="@+id/stackView"
        android:animateFirstView="true"
        android:loopViews="true"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1">
    </StackView>

    <Button
        android:id="@+id/previous"
        android:text="上一个"
        android:layout_width="match_parent"
        android:layout_height="50dp" />
    <Button
        android:id="@+id/next"
        android:text="下一个"
        android:layout_width="match_parent"
        android:layout_height="50dp" />
```

##### 代码实现:
```java
        int[] ints =new int[]{
                R.drawable.zh_1,
                R.drawable.zh_1,
                R.drawable.zh_1,
                R.drawable.zh_1,
                R.drawable.zh_1,
                R.drawable.zh_1,
        };
        List<Map<String,Object>> data = new ArrayList<>();

        for (int i = 0; i < ints.length; i++) {
            Map<String, Object> item = new HashMap<>();
            item.put("imgId",ints[i]);
            data.add(item);
        }

        SimpleAdapter simpleAdapter = new SimpleAdapter(this, data, R.layout.img, new String[]{"imgId"}, new int[]{R.id.img_id});
        //设置一个图片Adapter
        stackView.setAdapter(simpleAdapter);

        next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stackView.showNext();
            }
        });
        previous.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stackView.showPrevious();
            }
        });
```
##### 运行效果就如下面，好似叠放在一起。
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160306224123.jpg)