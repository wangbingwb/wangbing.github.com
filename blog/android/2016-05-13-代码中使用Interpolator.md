最近写代码时突然蹦出个想法，Android应用中用到好多动画，而动画控制动画变化速率是用Interpolator来控制的
例如下方
```java
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android" android:interpolator="@android:anim/decelerate_interpolator">
    <translate android:toXDelta="100%p" android:duration="400"></translate>
</set>

```

**android:interpolator="@android:anim/decelerate_interpolator"**指定了特定的变化率。然后程序会自己计算速率，而达到我们需要的效果。
然而有时我们也会使用到这种变化率，并不一定是动画，也可能是其他方面。而不能复用上方的用法。
那么难道我们只能自己去定义一个函数来满足需求嘛?这种常用的变化率函数Android没有必要只能XML文件中使用，代码中也应该可以使用才是。
于是我去看了下Interpolator的几个对应类的源码。原来其实Android早就想到了，我们完全可以使用Interpolator的所有的速率计算函数。

####那么下面针对DecelerateInterpolator这个类来看下
```java
public class DecelerateInterpolator implements Interpolator, NativeInterpolatorFactory {
    public DecelerateInterpolator() {
    }

    /**
     * Constructor
     *
     * @param factor Degree to which the animation should be eased. Setting factor to 1.0f produces
     *        an upside-down y=x^2 parabola. Increasing factor above 1.0f makes exaggerates the
     *        ease-out effect (i.e., it starts even faster and ends evens slower)
     */
    public DecelerateInterpolator(float factor) {
        mFactor = factor;
    }

````
这些是在代码中可以直接构造的构造器。没什么好看的。

mFactor是什么了，好像是个成员变量，先不管，往下看。

```java
    public DecelerateInterpolator(Context context, AttributeSet attrs) {
        this(context.getResources(), context.getTheme(), attrs);
    }

    /** @hide */
    public DecelerateInterpolator(Resources res, Theme theme, AttributeSet attrs) {
        TypedArray a;
        if (theme != null) {
            a = theme.obtainStyledAttributes(attrs, R.styleable.DecelerateInterpolator, 0, 0);
        } else {
            a = res.obtainAttributes(attrs, R.styleable.DecelerateInterpolator);
        }

        mFactor = a.getFloat(R.styleable.DecelerateInterpolator_factor, 1.0f);

        a.recycle();
    }

````
这些是布局文件中用到的构造器，好像也没什么关系。继续看。


```java
    public float getInterpolation(float input) {
        float result;
        if (mFactor == 1.0f) {
            result = (float)(1.0f - (1.0f - input) * (1.0f - input));
        } else {
            result = (float)(1.0f - Math.pow((1.0f - input), 2 * mFactor));
        }
        return result;
    }

    private float mFactor = 1.0f;

```
咦，这里好像有点意思mFactor也给了个默认值。getInterpolation会接受参数，仔细看下面计算分明就是使用的一个一元二次函数嘛。
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160513211356.jpg)

当input为0~1时返回值也是0~1，且是有速率变化的。我们根据返回值的0~1的比值与我们实际需要的值相乘便可得到我们要的值。

###### 那么程序中怎么使用了，如下：
```java
        DecelerateInterpolator decelerateInterpolator = new DecelerateInterpolator();
        for (int i = 0; i <= 10;i++) {
            Log.e("--","i="+i/10.0f+"-->"+decelerateInterpolator.getInterpolation(i/10.0f));
        }

```
###### 结果是这样
>  i=0.0-->0.0
 i=0.1-->0.19000006
 i=0.2-->0.35999995
 i=0.3-->0.51
 i=0.4-->0.64
 i=0.5-->0.75
 i=0.6-->0.84000003
 i=0.7-->0.90999997
 i=0.8-->0.96
 i=0.9-->0.99
 i=1.0-->1.0

自此应该可以确定是可以使用的。

再看看下面还有什么
```java
    /** @hide */
    @Override
    public long createNativeInterpolator() {
        return NativeInterpolatorFactoryHelper.createDecelerateInterpolator(mFactor);
    }
}
```
这个应该是系统调用需要的好像跟我们没什么关系。