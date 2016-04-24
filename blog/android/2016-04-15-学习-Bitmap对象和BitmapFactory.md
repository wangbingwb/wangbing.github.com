Bitmap代表一张位图对象。Bitmap类的构造函数是私有的，并不能实例化。通常我们使用它的静态方法来实例化一个Bitmap对象
#####下面是一些方法及参数介绍：
```java
//通过源位图创建新的Bitmap对象
public static Bitmap createBitmap(Bitmap src)

//通过源位图(x,y)坐标点挖取宽width和高height，创建新的Bitmap对象
public static Bitmap createBitmap(Bitmap source, int x, int y, int width, int height)

//通过源位图(x,y)坐标点挖取宽width和高height，创建新的Bitmap对象，并按Matrix进行变换
public static Bitmap createBitmap(Bitmap source, int x, int y, int width, int height,
		Matrix m, boolean filter)

//直接创建一个Bitmap对象，并指定该Bitmap对象的质量
public static Bitmap createBitmap(int width, int height, Config config)
public static Bitmap createBitmap(DisplayMetrics display, int width,
		int height, Config config)

//创建宽width和高height的Bitmap对象，其像素值设置为colors数组中从offset开始范围为stride的值。
public static Bitmap createBitmap(int colors[], int offset, int stride,
		int width, int height, Config config)

//创建宽width和高height的Bitmap对象，其内部的像素被colors数组中相应的颜色值所填充。
public static Bitmap createBitmap(DisplayMetrics display, int colors[],
		int offset, int stride, int width, int height, Config config)

//创建宽width和高height的Bitmap实例，其内部的像素被colors数组中相应的颜色值所填充。
public static Bitmap createBitmap(int colors[], int width, int height, Config config)

//创建宽width和高height的Bitmap实例，其内部的像素被colors数组中相应的颜色值所填充。
public static Bitmap createBitmap(DisplayMetrics display, int colors[],
		int width, int height, Config config)

//将源位图缩放至宽dstWidth*高dstHeight创建新Bitmap对象
public static Bitmap createScaledBitmap(Bitmap src, int dstWidth, int dstHeight,
            boolean filter)
```

#####Bitmap.Config对象：

- Bitmap.Config ALPHA_8   
- Bitmap.Config ARGB_4444   
- Bitmap.Config ARGB_8888   
- Bitmap.Config RGB_565  

　　A　　R　　G　　B
透明度　红色　绿色　蓝色

ALPHA_8        代表8位Alpha位图
ARGB_4444      代表16位ARGB位图
ARGB_8888     代表32位ARGB位图
RGB_565         代表8位RGB位图

#####另外BitmapFactory是一个工具类，它也可以用来创建Bitmap对象。它提供了以下方法：
```java
//通过输入流来创建Bitmap对象
public static Bitmap decodeStream(InputStream is) 

//通过指定路径文件来创建Bitmap对象
 public static Bitmap decodeFile(String pathName) 

//通过Resource资源来创建Bitmap对象
public static Bitmap decodeResource(Resources res, int id)

//通过字节数据来创建Bitmap对象
public static Bitmap decodeByteArray(byte[] data, int offset, int length)

//从FileDescriptor对应的文件中解析创建Bitmap对象
public static Bitmap decodeFileDescriptor(FileDescriptor fd) 
```