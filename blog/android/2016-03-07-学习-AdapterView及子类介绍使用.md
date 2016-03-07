AdapterView组件是一组重要的组件，AdapterView本身是一个抽象基类，它派生的子类在用法上十分相似，只是在显示界面上有一定的区别。
- AdapterView继承自ViewGroup，说明它是一个容器
- AdapterView可以包括多个“列表项”，并将多个“列表项”以合适的形式显示出来。
- AdapterView的“列表项”可以由Adapter提供。只需调用AdapterView的setAdapter(Adapter)即可设置Adapter

下面是AdapterView的继承关系图:
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160307205614.jpg)
AdapterView有三个派生子类：AbsListView，AbsSpinner和AdapterViewAnimator，不过它们依旧是抽象的。我们一般使用它们子类。

1. AbsListView(列表视图)
列表视图是手机系统中常用的一种组件，它以垂直的列表形式显示所有列表项。
AbsListView提供以下常用XML属性
```java
        //选择模式singleChoice单选，none不显示，multipleChoice，multipleChoice多选
        android:choiceMode="singleChoice"
        //true选中后背景挡在最上，看不到下面，不知有什么用
        android:drawSelectorOnTop="false"
        //是否可以拖滚动条快速滚动
        android:fastScrollEnabled="true"
        //选中的背景
        android:listSelector="@drawable/list_selected"
        //true表示在header以下位置分割条
        android:smoothScrollbar="true"
        //滚动条被拉倒最下
        android:stackFromBottom="true"
        //过滤，需Adapter需实现Filter接口
        android:textFilterEnabled="true"
```

下面列出ListView常用XML属性
```java
        android:divider="#FF0000"//设置分割条颜色
        android:dividerHeight="1dp"//设置分割条高度
        android:footerDividersEnabled="true"//是否显示footerViwe之前分割符
        android:headerDividersEnabled="true"//是否显示headerViwe之后分割符

```

#### 一个简单的例子:
布局文件
```java
    <ListView
        android:id="@+id/listView"
        android:choiceMode="singleChoice"
        android:drawSelectorOnTop="false"
        android:fastScrollEnabled="true"
        android:listSelector="@drawable/list_selected"
        android:smoothScrollbar="true"
        android:stackFromBottom="true"
        android:textFilterEnabled="true"

        android:divider="#FF0000"
        android:dividerHeight="1dp"
        android:footerDividersEnabled="true"
        android:headerDividersEnabled="true"

        android:layout_width="match_parent"
        android:layout_height="match_parent">
    </ListView>
```

drawable:
```java
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="#00ff00"></solid>
</shape>
```
代码实现
```java
        String[] strings = {
                "苏州",
                "泰州",
                "扬州",
                "上海",
                "南京"
        };
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,strings);

        listView.setAdapter(adapter);
```

效果图
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160307220907.jpg)


