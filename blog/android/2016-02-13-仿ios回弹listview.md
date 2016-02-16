:fa-pencil:ios的列表拖动效果很人性化，当拖出界后也可以一直拖。安卓的只会过界后边缘发光，感觉好丑。于是开始查找。
#### 1.安卓listview本身已经自带的
只需要重写overScrollBy
```java
    @Override
    protected boolean overScrollBy(int deltaX, int deltaY, int scrollX, int scrollY, int scrollRangeX, int scrollRangeY, int maxOverScrollX, int maxOverScrollY, boolean isTouchEvent) {
         scrollRangeY = 200；//这边给个值，就可以拖过界
         return super.overScrollBy(int deltaX, int deltaY, int scrollX, int scrollY, int scrollRangeX, int scrollRangeY, int maxOverScrollX, int maxOverScrollY, boolean isTouchEvent)
    }
```
这种方法亲身试过，简单的很，但是偶尔会回弹失效，不知道是不是我的测试机便宜货还是谷歌留的bug。
于是我没有使用这个。

#### 2.组合控件的方式
这种方法用的也是比较多的,网上例子也不少，我这就不贴了。

#### 3.自定义listview
以下是我的一些思路
```flow
1=>start: 开始
1.5=>start: overScrollBy(获取越界状态)
2=>operation: onTouchEvent(拦截MotionEvent)
3=>condition:  继续拉(或推)
4=>operation: 抬起手指
5=>operation: onBound(回弹)
6=>end: 结束
7=>operation: 手动推(或拉)回原位
8=>operation: 释放MotionEvent

1->1.5->2->3
3(yes)->4->5->6
3(no)->7->8->6
```

#### 实例代码
```java
package com.wb.widgets;

import android.content.Context;
import android.graphics.Canvas;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.widget.ListView;

/**
 * Created by YiSD on 2015/12/5.
 */
public class BoundListView extends ListView {
    public static int OVERSCROLL_STATE_NORMAL = 0;//正常
    public static int OVERSCROLL_STATE_PULL = -1;//拉
    public static int OVERSCROLL_STATE_PUSH = 1;//推

    private int mOverScrollState = OVERSCROLL_STATE_NORMAL;
    private float lastY = -1;//最近一次Y轴位置

    /**
     * 小于0-->pull,大于0-->push
     */
    private int mOverY = 0;

    public BoundListView(Context context) {
        super(context);
    }

    public BoundListView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    public void setOverScrollMode(int mode) {
        //去掉边缘发光效果
        super.setOverScrollMode(OVER_SCROLL_NEVER);
    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        switch (ev.getAction()){
            case MotionEvent.ACTION_DOWN:
                if (mOverY < 0){
                    mOverScrollState = OVERSCROLL_STATE_PULL;
                }else if (mOverY > 0){
                    mOverScrollState = OVERSCROLL_STATE_PUSH;
                }
        }
        if (mOverScrollState != OVERSCROLL_STATE_NORMAL){
            switch (ev.getAction()){
                case MotionEvent.ACTION_UP:
                    mOverScrollState = OVERSCROLL_STATE_NORMAL;
                    onBound();
                    return true;
            }

            if (lastY < 0){
                lastY = ev.getY();
            }else {
                if (Math.abs(ev.getY() - lastY) > 30){
                    lastY = ev.getY();
                    return true;
                }
                if (ev.getY() - lastY != 0){
                    if (mOverScrollState == OVERSCROLL_STATE_PULL){
                        mOverY -= (ev.getY() - lastY);
                        if (mOverY > 0){
                            mOverY = 0;
                            mOverScrollState = OVERSCROLL_STATE_NORMAL;
                            ev.setAction(MotionEvent.ACTION_DOWN);
                            super.onTouchEvent(ev);
                        }
                    }else if(mOverScrollState == OVERSCROLL_STATE_PUSH){
                        mOverY -= (ev.getY() - lastY);
                        if (mOverY < 0){
                            mOverY = 0;
                            mOverScrollState = OVERSCROLL_STATE_NORMAL;
                            ev.setAction(MotionEvent.ACTION_DOWN);
                            super.onTouchEvent(ev);
                        }
                    }
                }
                lastY = ev.getY();
                invalidate();
            }
            return true;
        }else {
            return super.onTouchEvent(ev);
        }
    }

    @Override
    protected boolean overScrollBy(int deltaX, int deltaY, int scrollX, int scrollY, int scrollRangeX, int scrollRangeY, int maxOverScrollX, int maxOverScrollY, boolean isTouchEvent) {
        if(isTouchEvent){
            if (deltaY < 0){
                mOverScrollState = OVERSCROLL_STATE_PULL;
            }else {
                mOverScrollState = OVERSCROLL_STATE_PUSH;
            }
            mOverY += deltaY;
            invalidate();
        }
        return true;
    }

    @Override
    public void draw(Canvas canvas) {
        canvas.translate(0,-mOverY/2);
        super.draw(canvas);
    }

    /**
     * 回弹归位
     */
    private void onBound(){
        final int during = 1000;
        final int d = 10;
        if (mOverY != 0){
            new Thread(){
                @Override
                public void run() {
                    int flag = 1;
                    if (mOverY<0){
                        flag = -1;
                        mOverY = -mOverY;
                    }
                    int temp = mOverY;

                    int i = 0;
                    while (i < during && Math.abs(temp) >= 5 && mOverScrollState == OVERSCROLL_STATE_NORMAL){
                        try {
                            Thread.sleep(d);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                        i += d;
                        temp = (int) (Math.pow((double)i / during - 1, 2)*temp);
                        mOverY = flag*temp;
                        postInvalidate();
                    }
                    mOverY = 0;
                    postInvalidate();
                }
            }.start();
        }
    }
}
```