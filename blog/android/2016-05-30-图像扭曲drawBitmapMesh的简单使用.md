Android中扭曲图片用到了Canvas的drawBitmapMesh方法，如下：
public void drawBitmapMesh(Bitmap bitmap, int meshWidth, int meshHeight,float[] verts, int vertOffset, int[] colors, int colorOffset,Paint paint)

- bitmap是需要扭曲的位图对象
- meshWidth 横向网格数
- meshHeight 纵向网格数（网格的多少决定了图像扭曲的细腻程度，越小越细腻）
- verts所有网格交点的坐标集合，单数为x坐标，双数为y坐标。
- vertOffset需要跳过的个数
- colors 和 colorOffset 不知道怎么用，反正加了之后图像颜色变得很怪，这次不研究

在扭曲的过程中，实际只需要更改网格交点的坐标就可以实现效果

就如PS中的图形自由变换的效果
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160530221326.jpg)


------------


##### 在Android中扭曲也是这么回事，下面以一个简单的例子来弄明白这回事。

假如有一张100*100像素的图片（这里为了后面计算方便尽量造的可口算化）
分为2*2的网格，则可以计算出所有交点坐标
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160530220803.jpg)

>因此有：(2+1)*(2+1) =9个点，又一个点有x和y轴。

有以下原坐标值
>刚开始以为些是网格的相对坐标，原来就是网格的实际坐标

```java
        float[] verts = new float[]{
                0.0f,0.0f,
                50.0f,0.0f,
                100.0f,0.0f,
                0.0f,50.0f,
                50.0f,50.0f,
                100.0f,50.0f,
                0.0f,100.0f,
                50.0f,100.0f,
                100.0f,100.0f
        };
```
以上坐标实际就是原坐标，是没有任何扭曲效果的。

因此我将中间点往上挪一点
如下：
```java
        float[] verts = new float[]{
                0.0f,0.0f,
                50.0f,0.0f,
                100.0f,0.0f,
                0.0f,50.0f,
                50.0f,35.0f, //这边y轴坐标变了
                100.0f,50.0f,
                0.0f,100.0f,
                50.0f,100.0f,
                100.0f,100.0f
        };
```


#####所以以上几项和到一起就是：
```java
        Bitmap bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.zh_1);
        //为了计算方便创建一个100*100的bitmap
        bitmap = Bitmap.createScaledBitmap(bitmap,100,100,false);

        //计算扭曲后的坐标系（因为这边我默认是2*2网格，就有9个点）
        float[] verts = new float[]{
                0.0f,0.0f,
                50.0f,0.0f,
                100.0f,0.0f,
                0.0f,50.0f,
                50.0f,35.0f,
                100.0f,50.0f,
                0.0f,100.0f,
                50.0f,100.0f,
                100.0f,100.0f
        };
        //绘上扭曲后的图像
        canvas.drawBitmapMesh(bitmap,2,2,verts,0,null,0,null);
```
因为是100*100像素，图片较小，但是扭曲效果还是可以很清晰的看出来的
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160530223806.jpg)