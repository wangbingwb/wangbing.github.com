Configuration类是专门用于描述手机设备上的配置信息的，信息可能包括用户的配置项，也包括系统的配置项。

获取方法：
```java
Configuration cf = getResources().getConfiguration();
```

##### 以下是一些可能会经常用到的：
```java
        //获取字体缩放
        float fontScale = cf.fontScale;
```

```java
        //获取当前设备的键盘类型
        int keyboard = cf.keyboard;
//        Configuration.KEYBOARD_12KEY;12个小键盘
//        Configuration.KEYBOARD_NOKEYS;无键盘
//        Configuration.KEYBOARD_QWERTY;普通键盘
//        Configuration.KEYBOARD_UNDEFINED;未定义
```
```java
        //返回当前设备键盘是否可用
        int keyboardHidden = cf.keyboardHidden;
//        Configuration.KEYBOARDHIDDEN_NO;有键盘可用
//        Configuration.KEYBOARDHIDDEN_UNDEFINED;未定义
//        Configuration.KEYBOARDHIDDEN_YES;所有键盘隐藏不可用
```
```java
        //获取移动信号国家码
        int mcc = cf.mcc;
```
```java
        //获取移动信号网络码
        int mnc = cf.mnc;
```
```java
        //返回设备的导航类型
        int navigation = cf.navigation;
//        Configuration.NAVIGATION_DPAD;DPAD导航
//        Configuration.NAVIGATION_NONAV;无导航
//        Configuration.NAVIGATION_TRACKBALL;轨迹球导航
//        Configuration.NAVIGATION_UNDEFINED;未定义
//        Configuration.NAVIGATION_WHEEL;滚轮导航
```
```java
        //获取屏幕的方向
        int orientation = cf.orientation;
//        Configuration.ORIENTATION_LANDSCAPE;横向
//        Configuration.ORIENTATION_PORTRAIT;竖向
//        Configuration.ORIENTATION_UNDEFINED;未定义
//        Configuration.ORIENTATION_SQUARE;方形
```
```java
        //获取触摸屏的触摸的方式
        int touchscreen = cf.touchscreen;
//        Configuration.TOUCHSCREEN_FINGER;接受手指的触摸屏
//        Configuration.TOUCHSCREEN_NOTOUCH;无触摸屏
//        Configuration.TOUCHSCREEN_UNDEFINED;未定义
//        Configuration.TOUCHSCREEN_STYLUS;触摸笔的触摸屏
```
```java
        //获取当前区域
        Locale locale = cf.locale;
```