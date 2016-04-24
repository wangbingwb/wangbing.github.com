/res/raw目录下是用来放一些原生资源的。与assets中存放的资源不同，raw中的文件是被R文件索引的，我们可以直接在程序中通过R.raw.*来引用它。


##### 例如下面：
```java
InputStream inputStream = getResources().openRawResource(R.raw.sys);
```
这边可以获得文件的输入流，接下来便可以根据业务来处理。


再介绍下android中的Properties工具类
以上我在raw文件夹中放置了sys.properties文件
```java
key1=123456789
key2=123123123
```

#####下面是具体调用方式
```java
try {
	//获取输入
	InputStream inputStream = getResources().openRawResource(R.raw.sys);
	//创建Properties实例
	Properties properties = new Properties();
	//加载sys.properties文件
	properties.load(inputStream);

	//这边即可获取
	Log.i("info", ""+properties.get("key1"));
	Log.i("info", ""+properties.get("key2"));
} catch (IOException e) {
	e.printStackTrace();
}
```