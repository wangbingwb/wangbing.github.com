windowSoftInputMode指定了虚拟键盘的显示模式。一个友好的app这方面也是要注意的，因此了解虚拟键盘各个模式的特性很有必要。
在这里，我对几种显示模式都做一定的了解与总结。不能到用时才过来学习就晚了。

对于整个应用的模式设置是可以在appliction的应用主题中设置的，如下：
```java
    <!-- Base application theme. -->
    <style name="AppTheme" parent="android:Theme">
        <item name="android:windowSoftInputMode">stateUnspecified|adjustUnspecified</item>
    </style>

```

另外针对Activity层，可以在AndroidManifest.xml文件每个activity节点设置，如下：
```java
        <activity
        	android:windowSoftInputMode="stateUnspecified|adjustUnspecified"
            android:name=".NextActivity"
            android:label="@string/title_activity_next" >
            <intent-filter>
                <action android:name="android.test"></action>
                <category android:name="android.intent.category.DEFAULT"></category>
            </intent-filter>
        </activity>

```


代码中的设置方法
```java
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_UNSPECIFIED 
                | WindowManager.LayoutParams.SOFT_INPUT_ADJUST_UNSPECIFIED);

```


以上方法中都发现参数都是给的2个state***和adjust***，
- state***表示显示状态
- adjust***表示调整关系

想想，其实google这么设计也是有道理了，虚拟键盘显不显示是需要一个参数，而显示之后虚拟键盘会占屏幕一部分位置，这时却是得有一个处理虚拟键盘与内容调整的方式。这样需要给2个参数却是合理的。

说了这么多其实就是了解为什么要这样设，知道为什么这样设，下面才要去了解如何去设置这些值，如何选择合适的方式。

以上代码中使用了stateUnspecified和adjustUnspecified,其实这是系统默认的设置方式。给2个参数时是用的｜运算符来连接的，所以哪怕我们只给一个也是会生效的。

我觉得这样一个问题拿到手：
-->首先确定需不需要显示虚拟键盘
-->然后需不需要处理虚拟键盘与内容的关系

如果理清了上面2个要求，其实其他就是选值得问题。

下面重点来讲各个值得效果

在style中加上
```java
<item name="android:windowSoftInputMode">stateVisible</item>
```
>Unspecified代表未指定的意思，如果未指定，那么所有的方法就由系统来自己判定了。该显示就显示，不改显示就不显示。因此，这2个值下面就不做分析了。

### 虚拟键盘显示方式：

#### stateVisible 

从字面意思也可以看出是显示的意思，但是显示的意思太广泛，完全没有头绪。但是在什么情况会出现显示这个效果了，我们都知道键盘是用来与用户交互的，而Activity也是与用户交互的，那么应该虚拟键盘也应该是为Activity准备的吧。先来个Activity看看
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160601223616.gif)
如效果图所示刚进入Activity虚拟键盘就显示出现，但是第一Activity中有个EditText且获得了焦点，不确定是否有效。但是接着第二个Activity也是显示了，并有其他可输入控件获得焦点，看来是起效了。但是第二Activity关闭了虚拟键盘后，再回到第一个，发现键盘消失了，这是什么鬼。再点到第二个Activity，键盘又出现了。多看几次，第二个回到第一个用的finish而不是start，哦~，好像发现了什么

-->总结:原来每次进入新的Activity时就会显示虚拟键盘


------------


#### stateHidden 
这个与上一个类似，这边不多做分析
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160601223236.gif)

-->总结:原来每次进入新的Activity时就会隐藏虚拟键盘


------------


####  stateAlwaysVisible
这个与第一个相比有点像，但是多了个Always，好吧，有点懵逼。
继续看效果图分析
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160601224009.gif)
看着好像与第一个stateVisible有点像，反正进入Activity就显示出虚拟键盘。不过有个问题，stateVisible时我从第二个Activityf finish回第一个Activity时，把虚拟键盘关了，返回第一个Activity时也是不会存显示虚拟键盘的。但是现在这个关闭键盘后返回第一个Activity居然还是显示出来了。差别好像找到了。

-->总结:这个是stateVisible加强版，除了有stateVisible的所有特性外，有在键盘被关闭后返回上一个Activity时还是会显示虚拟键盘。



------------


#### stateAlwaysHidden
有了上一个的理解，这个应该也是比较好理解的，除了stateHidden的特性外，它也应该是多了其他功能的。想想上一个是怎么发现差别，是在第二个Activity关闭虚拟键盘，返回第一个Activity时，虚拟键盘却显示出来发现的。这个与stateAlwaysVisible长得这么像，好吧，也这样找找看。
直接看效果
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160601234520.gif)

与stateAlwaysVisible值时相反的时，这是我是点开虚拟键盘的，但是返回第一个Activity时，还是被隐藏了。问题好像也出来了。

-->总结:是stateHidden加强版，当前键盘开启的情况下返回上一个键盘会被隐藏。

------------

#### stateUnchanged
字面意思是不变，好吧，怎么个不变法了。分析一下上面几种的情况，都是指定了一种状态，要么显示，要么隐藏。难道没有什么折中的办法。只能继续看效果：
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160601224633.gif)
分析：刚进Activity没有显示，那么应该是由系统决定是否显示了。好吧，那我只能使用我的 绝招了EditText我点-->出现了-->进入第二个Activity-->键盘没有消失-->再次绝招，我关-->返回第一个-->果然键盘没有显示。

总结：当Activity切换时，键盘状态会保持不变。


------------


### 以下为键盘与内容的关系：

#### adjustNothing 
直接看当有很多东西时，是怎么调整关系的。
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160601225027.gif)
貌似什么都没发生，果然与名称Nothing相对应啊。

--> 总结：不会做任何调整，而是会遮住内容。

#### adjustPan 
直接看效果
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160601225131.gif)
好像整个界面网上移了，连标题也一起移动了。

--> 总结： 系统会自动调整布局以使内容不被键盘遮挡


#### adjustResize 
先来与上面布局一样时的效果
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160601225352.gif)
好像与adjustNothing效果一样嘛，没有做调整。
继续如果换一下布局，例如在外面套一个ScrollView，再看效果：
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160601225534.gif)

与adjustPan好像有点区别，虽然都可以看见被遮挡的内容了，但是这个的标题貌似还在原位没动。好像只是ScrollView的高度变矮了点，变得可以滑动了。

--> 总结：在正常布局是与adjustNothing一样的不会调整。但是如果布局中使用了类似ScrollView可以滚动的控件后。系统是会自动调整滚动视图的大小使得内容可见。