ViewAnimator��һ�����࣬���̳���FrameLayout����������ֳ�FrameLayout�����������Խ����view������һ������ViewAnimatore�������ӵĹ��ܣ���View�л�ʱ���Ա��ֳ�����Ч����
##### ViewAnimator��������̳�ͼ����:
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/e61190ef76c6a7ef70345787f9faaf51f3de6605.png)

##### ʵ������
###### �����ļ�
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
        android:text="��һ��"
        android:layout_width="match_parent"
        android:layout_height="50dp" />
    <Button
        android:id="@+id/next"
        android:text="��һ��"
        android:layout_width="match_parent"
        android:layout_height="50dp" />
```

##### ����
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

###### ����
> ���ֻ�Ǽ򵥵�����5��TextView

```java
        for (int i = 0; i < 5; i++) {
            TextView textView = new TextView(this);
            textView.setText("A"+i);
            viewAnimator.addView(textView);
        }

        last.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //��һ��View
                viewAnimator.showPrevious();
            }
        });

        next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //��һ��View
                viewAnimator.showNext();

            }
        });

```
Ч������
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/QQ%E6%88%AA%E5%9B%BE20160301230541.jpg)