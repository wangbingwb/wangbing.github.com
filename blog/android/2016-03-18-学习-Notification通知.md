Notification是显示在手机状态栏的通知，手机状态栏位于手机屏幕的最上方，用来显示手机网络状态，电池状态，时间等。Notification是一种具有全局效果的通知，程序中通过 NotificationManager服务来发送Notification。Notification是一个系统的服务。

通知创建的方法可以分以下几步：
1. 调用getSystemService(NOTIFICATION_SERVICE),获取服务。
2. 通过构造器构造一个Notification对象。
3. 调用服务发送Notification

##### 一个简单的例子
```java
NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

Notification notification = new Notification.Builder(MainActivity.this)
        .setDefaults(Notification.DEFAULT_ALL)
        .setAutoCancel(true)//点击通知后，状态栏自动删除
        .setContentTitle("我是title")//-->必须
        .setContentText("我是内容我是内容我是内容我是内容")//-->必须
        .setSmallIcon(R.drawable.j1)//图片-->必须
//                        .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.drawable.j2))//大图非必须
        .setContentIntent(PendingIntent.getActivity(MainActivity.this, 1, new Intent(MainActivity.this, MainActivity.class), PendingIntent.FLAG_CANCEL_CURRENT)).build();

notificationManager.notify(1, notification);
```

##### 这里需要理解的
##### 1.setDefaults()用来提醒，一般可以有铃声、闪光灯、震动。
- Notification.DEFAULT_ALL：铃声、闪光、震动均系统默认。
- Notification.DEFAULT_SOUND：系统默认铃声。
- Notification.DEFAULT_VIBRATE：系统默认震动。
- Notification.DEFAULT_LIGHTS：系统默认闪光。

##### 2.PendingIntent和Intent区别
PendingIntent表示将要发生的意图，而Intent是立马发生的意图。这里用的是PendingIntent。
PendingIntent可以通过它的静态方法getXxx(）来实例化，参数依次是（context，requestCode，Intent，flag）
关于flag有以下几个值
- FLAG_CANCEL_CURRENT：如果构建的PendingIntent已经存在，则取消前一个，重新构建一个。
- FLAG_NO_CREATE：如果前一个PendingIntent已经不存在了，将不再构建它。
- FLAG_ONE_SHOT：表明这里构建的PendingIntent只能使用一次。
- FLAG_UPDATE_CURRENT：如果构建的PendingIntent已经存在，则替换它，常用。

##### 取消该通知
```java
NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
notificationManager.cancel(1);
//notificationManager.cancel("tag",1);//取消带tag且为1的
//notificationManager.cancelAll();取消所有
```
#### 效果如下

![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160319160539.gif)