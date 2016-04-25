SharedPrefercences是Android提供给我们来存少量数据的，注意是少量的。因为SharedPreferences最终是以XML文件来存放的，所以注定不适合存放大数据。而且使用该方式存放数据时，数据通常较简单。例如字符串、数量等简单数据。存放的方式也是以简单的key-value键值对。

#### 获得
SharedPreferences本身是一个接口，程序是无法直接创建的。我们通常是通过Context提供的getSharedPreferences(String name, int mode)方法来获取SharedPreferences对象。
参数name不用说，mode这里有3个可选值：
1. Context.MODE_PRIVATE
该SharedPreferences只能被本程序访问。

2. Context.MODE_WORLD_READABLE
该SharedPreferences可以被其他程序读，但不能写

3. Context.MODE_WORLD_WRITEABLE
该SharedPreferences可以被其他程序读写。


#### 使用
获得SharedPreferences对象后，我们可以使用以下方法：
- boolean contains(String key)
查看是否包含某值

- abstract Map<String,?> getAll()
获取全部key-value对象

- Xxx getXxx(String key, Xxx defaultValue)
Xxx可以是boolean、int、long等基本类型，defaultValue就是当文件中没有找到对应value时返回的值。

SharedPreferences对象只能用来读取，而不能写。我们需要SharedPreferences.editor()来获得它的写文件的对象。它为我们提供了以下方法：
- putXxx(String key, Xxx value);
Xxx可以是boolean、int、long等基本类型

-  remove(String key)
移除某个key值

- commit()
以上修改都需要调用该方法提交，才能生效。

以下简单实例：
```java
       SharedPreferences test = this.getSharedPreferences("test", MODE_PRIVATE);

        SharedPreferences.Editor edit = test.edit();
        edit.putInt("count",10);

        int count = test.getInt("count", 1);
```
