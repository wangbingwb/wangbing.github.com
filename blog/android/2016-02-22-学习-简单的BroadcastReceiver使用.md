BoradcastReceiver是安卓系统的四大组件之一，这种组件本质上一种全局监听器，可用于监听全局的广播消息。主要接受系统发出或用户开发的程序所发出的Broadcast Intent。与启动activity和service类似
##### 启动BroadcastReceiver需要2步
1. 创建BroadcastReceiver的Intent
2. Context的sendBroadcast()或sendOrderedBroadcast()方法来启动指定的BroadcastReceiver。

##### 注册BroadcastReceiver有两种方式
1. 代码中指定
```java
IntentFilter intentFilter = new IntentFilter("android.intent.action.test");
 MyBroadcastReceiver myBroadcastReceiver = new MyBroadcastReceiver();
registerReceiver(myBroadcastReceiver, intentFilter);
```
2. AndroidManifest中定义
```java
<receiver android:name=".receiver.MyBroadcastReceiver">
<intent-filter>
<action android:name="android.intent.action.test"></action>
</intent-filter>
</receiver>
```
当系统Broadcast发生后，对应接收器会被实例化，onReceive()会被启动执行。
> 注意 onReceive()方法不能在10s钟执行完，系统会抛出异常。因此不能在该方法执行耗时的操作。

##### 发送广播
只需调用context的sendBroadcast(Intent intent)
如:
```java
Intent intent = new Intent();
intent.setAction("android.intent.action.test");
sendBroadcast(intent);
```
还可以在Intent中添加消息以达到传递信息的目的
```java
intent.putExtra("msg","I am message");
```
Receiver中可以这样取用
```java
    @Override
    public void onReceive(Context context, Intent intent) {
        String msg = intent.getStringExtra("msg");
    }
```
