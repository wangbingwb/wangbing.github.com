ImageButton的布局大小默认是按照图片的大小来设定的，比如图片100*100，那么布局大小也是100*100。

但在实际使用时，图片为了显示较好切得都是高清大一点的图。而大小也不是固定的。有时可能只想要固定一个尺寸，而另一个去自适应。

例如上面100*100，我需要高50，则希望高50，而宽会根据高来自适应。再调整图片缩放关系得到一个50*50的图片。

**于是发生下面的情况:**
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160824103704.jpg)

我的天啦，怎么这么丑。那么多的白的是个什么情况。原来原因是应为ImageButton的布局并不会自动缩放。只能自己去重写ImageButton了。

```java
public class WbImageButton extends ImageButton {
    private int mSrcWitdh;//原宽度
    private int mSrcHeight;//原高度
    private int mExactlyWidth;//期望宽度
    private int mEactlyHeight;//期望高度

    public WbImageButton(Context context) {
        super(context);
    }

    public WbImageButton(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);

        Drawable drawable = getDrawable();
        Rect bounds = drawable.getBounds();
        //获取图片原大小
        mSrcWitdh = bounds.width();
        mSrcHeight = bounds.height();

        if (mSrcWitdh != 0 && mSrcHeight != 0){
            if (MeasureSpec.getMode(widthMeasureSpec) == MeasureSpec.EXACTLY && MeasureSpec.getMode(heightMeasureSpec) != MeasureSpec.EXACTLY){
                //宽度确定，高度自适应
                mExactlyWidth = MeasureSpec.getSize(widthMeasureSpec);
                mEactlyHeight = mExactlyWidth * mSrcHeight / mSrcWitdh;
                setMeasuredDimension(mExactlyWidth,mEactlyHeight);
            }else if (MeasureSpec.getMode(widthMeasureSpec) != MeasureSpec.EXACTLY && MeasureSpec.getMode(heightMeasureSpec) == MeasureSpec.EXACTLY){
                //高度确定，宽度自适应
                mEactlyHeight = MeasureSpec.getSize(heightMeasureSpec);
                mExactlyWidth = mEactlyHeight * mSrcWitdh / mSrcHeight;
                setMeasuredDimension(mExactlyWidth,mEactlyHeight);
            }
        }
    }
}

```
**效果如下:**
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160824103603.jpg)
