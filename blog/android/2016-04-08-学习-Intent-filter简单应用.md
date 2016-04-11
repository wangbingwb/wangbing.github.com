Intent代表了Android启动的“意图”，Android应用会根据Intent来启动指定的组件，至于到底启动哪个组件，则取决于Intent的各属性。
形如：
```java
Intent intent = new Intent(this, NextActivity.class)
```
这样的Intent声明一般是显示声明：“我要启动哪个组件，便指定哪个类”。这种方式很常用。但有时候，我们并不需要去指定启动哪个组件。而是只要启动一个可以完成我们行动的组件。这个组件也可能不存在，那么明显上面指定类的方法是行不通的。
那么下面这个方式不明确的意图，称为隐式声明。一般通过设置Intent的属性来表达想要的意图。
intent-filter一般与该方式配合使用。<intent-filter>是组件在AndroidManifest.xml中注册时所定义的一系列属性。“filter”中文意思“过滤器”，结合起来就是意图过滤，过滤什么？当然是为了过滤组件，也就是说只有符合过滤条件的组件才会启动。

##### 例如：
```java
<intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
```
这段配置作用就是定义了程序的入口组件，当我们的程序安装后，Android程序是不会知道的确切的启动Activity的，通过以上的<intent-filter>中的配置来表明它是程序入口。Android便可以启动它。一般情况下，一个安卓应用的中只有一个程序入口。这边是系统对intent-filter的应用。
##### 下面是一个简单的例子：
##### Activity：
```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        send.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setAction("android.intent.action.test");
                intent.putExtra("name","wb");//传递信息
                sendBroadcast(intent);
            }
        });
    }
});
```
##### BroadcastReceiver：
```java
public class MyBroadcastReceiver extends BroadcastReceiver{
    @Override
    public void onReceive(Context context, Intent intent) {

        String name = intent.getStringExtra("name");//获取信息
        Log.e("/","-->"+name);
    }
}
```
##### AndroidManifest中注册信息
```java
        <receiver android:name=".receiver.MyBroadcastReceiver">
            <intent-filter>
                <action android:name="android.intent.action.test"></action>
                <category android:name="android.intent.category.DEFAULT"></category>
            </intent-filter>
        </receiver>
```

当按下send时，控制台会打印出：
```
04-08 22:57:48.950  12656-12656/com.example.yisd.myapplication E//﹕ -->wb
```

那么Android是如何知道我们要启动这个BroadcastReceiver的。
这里主要是intent-filter的子元素启的作用。
Intent的Action与Category属性，它们都是普通的字符串。
- Action：表示Intent所要完成的一个抽象的“动作”，intent-filter中可以设置多个，但是Intent类只能设置一个Action，但是可以设置多个category
- category：表示增加的额外类别信息

通常2者结合使用，至于这个抽象的“动作”是由Activity等组件来完成，Action字符串本身并不做任何处理。
另外Android提供的一系列标准的Action。例如Intent.ACTION_VIEW 表示抽象的查看动作
