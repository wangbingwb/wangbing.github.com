#### 首先看效果，根据柱面半径变换可以得到各个值得效果
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160605175845.gif)

因为只是做柱面效果，所以需要变换的只有一个轴向，这里我是变换的X轴。
好吧，道理都懂，关键在于如何实现了。这里我用到之前学到的drawBitmapMesh，它可以对位图对象进行网格扭曲。所以不懂得化还是需要去研究下的。

这里我用到之前学到的drawBitmapMesh是直接对坐标进行变换的，所以实现柱面效果需要知道坐标如何变换。
#### 下面是我制作的一个数学意义上截面图：
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160605172022.jpg)

#### 思路:
-->直线是我们需要扭曲的图像
-->而下面的圆就是即将要扭曲的柱面
-->把直线想象成一张纸，需要贴着圆柱
-->原来Xo的位置变换为Xc位置，如果能求出Xc位置，那变换坐标就能确定了
-->那么怎么求Xc,在R确定的情况下，其实只要知道角a的值，就可以根据三角函数求出Xc的长度。
-->L的长度是知道的，周长也是可以求出的，这样角a也是知道。
-->一切都可以求出，那看来是可行的

#### 实现代码
```java
private int r = 250;

@Override
protected void onDraw(Canvas canvas) {
	int width = getWidth();
	int height = getHeight();
	int meshWidth = 5;
	int meshHeight = 5;

	//获得原始位图
	Bitmap bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
	super.onDraw(new Canvas(bitmap));

	//初始化网格坐标
	float[] vers = new float[(meshWidth+1)*(meshHeight+1)*2];
	for (int y = 0; y <= meshHeight; y++) {
		for (int x = 0; x <= meshWidth; x++) {
			vers[2*x+y*(2*(meshWidth+1))] = (float)width*x/meshWidth;
			vers[2*x+y*(2*(meshWidth+1))+1] = (float)height*y/meshWidth;
		}
	}

	//扭曲坐标
	for (int i = 0; i < vers.length; i+=2) {
		if (vers[i] != width/2){
			//获取周长
			float l = Math.abs(vers[i] - width / 2);
			//获取角度
			double v = Math.toRadians((l/(2*Math.PI*r)) * 360);
			//转换后的长度
			double v1 = Math.sin(v) * r;
			//转成实际坐标
			vers[i] = (float) ((Math.abs(vers[i] - width / 2)/(vers[i] - width / 2))*v1 + width / 2);
		}
	}

	canvas.drawBitmapMesh(bitmap,meshWidth,meshHeight,vers,0,null,0,null);
}
```
