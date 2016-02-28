自动完成文本框（AutoCompleteTextView）从EditText派生出来的，实际上它也是一个文本编辑框。
但是它比普通的文本编辑框多了一项功能，就是当用户输入一定字符后，出现一个下提示拉框供用户选择。选择后可以自动填写完整文本框。
因此AutoCompleteTextView除了从EditText继承来的XML属性和方法外。它还有自己的XML属性和方法。
##### 如下：

###### xml属性
```java
        android:completionHint="comhint" //设置下拉框提示标题
        android:completionThreshold="1"  //至少输入1个字符出现提示
        android:dropDownAnchor="@id/btn_s" //以某个控件定位，不填默认自己
        android:dropDownWidth="300dp" //下拉框宽度
        android:dropDownHeight="match_parent" //下拉框高度
```

###### java方法
```java
        auto.setCompletionHint("aa");
        auto.setThreshold(1);
        auto.setDropDownAnchor(R.id.d);
        auto.setDropDownWidth(400);
        auto.setDropDownHeight(400);
```

###### 提示的内容
只需设置一个String的适配器
```java
        String[] str =  new String[]{
                "aaa",
                "bbb",
                "bbb",
                "bbb",
                "bbb",
                "ccc",
                "ddd",
                "ddd"
        };

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,str);
        setAdapter(adapter);
```
###### 下面只需输入关键字就会出现以下提示
![](http://vi1.6rooms.com/live/2016/02/28/22/1002v1456669631346489587_b.jpg)
