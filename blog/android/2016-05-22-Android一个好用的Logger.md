#### Android一个好用的Logger

[Github库](https://github.com/orhanobut/logger "Github库")

##### 在Android studio中使用Logger

配置方法一
如果快捷键是默认的，那按F4会弹出配置窗口
依次-->app-->Dependencies-->绿色+号-->选择Maven库
如图：
搜索关键字logger，找到com.orhanobut:logger :* -->OK
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160522154458.jpg)


配置方法二
直接在app下build.gradle文件中dependencies中添加如下一句：
`compile 'com.orhanobut:logger :1.11'

![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160522165301.jpg)

依赖成功后，即可使用该库。

以下是我的测试代码
```java
        Logger.i("iiiiiiiiiiiiii");
        Logger.e("eeeeeeeeeeeeee");
        Logger.d("eeeeeeeeeeeeee");
        Logger.w("eeeeeeeeeeeeee");
        Logger.json("{\"name\":\"小明\",\"年龄\":\"18岁\"}");
```

```java
. I/PRETTYLOGGER﹕ ╔═══════════════════════════════════════════════
. I/PRETTYLOGGER﹕ ║ Thread: main
. I/PRETTYLOGGER﹕ ╟───────────────────────────────────────────────
. I/PRETTYLOGGER﹕ ║ Activity.performCreate  (Activity.java:5264)
. I/PRETTYLOGGER﹕ ║    MainActivity.onCreate  (MainActivity.java:66)
. I/PRETTYLOGGER﹕ ╟───────────────────────────────────────────────
. I/PRETTYLOGGER﹕ ║ iiiiiiiiiiiiii
. I/PRETTYLOGGER﹕ ╚═══════════════════════════════════════════════
. E/PRETTYLOGGER﹕ ╔═══════════════════════════════════════════════
. E/PRETTYLOGGER﹕ ║ Thread: main
. E/PRETTYLOGGER﹕ ╟───────────────────────────────────────────────
. E/PRETTYLOGGER﹕ ║ Activity.performCreate  (Activity.java:5264)
. E/PRETTYLOGGER﹕ ║    MainActivity.onCreate  (MainActivity.java:67)
. E/PRETTYLOGGER﹕ ╟───────────────────────────────────────────────
. E/PRETTYLOGGER﹕ ║ eeeeeeeeeeeeee
. E/PRETTYLOGGER﹕ ╚═══════════════════════════════════════════════
. D/PRETTYLOGGER﹕ ╔═══════════════════════════════════════════════
. D/PRETTYLOGGER﹕ ║ Thread: main
. D/PRETTYLOGGER﹕ ╟───────────────────────────────────────────────
. D/PRETTYLOGGER﹕ ║ Activity.performCreate  (Activity.java:5264)
. D/PRETTYLOGGER﹕ ║    MainActivity.onCreate  (MainActivity.java:68)
. D/PRETTYLOGGER﹕ ╟───────────────────────────────────────────────
. D/PRETTYLOGGER﹕ ║ eeeeeeeeeeeeee
. D/PRETTYLOGGER﹕ ╚═══════════════════════════════════════════════
. W/PRETTYLOGGER﹕ ╔═══════════════════════════════════════════════
. W/PRETTYLOGGER﹕ ║ Thread: main
. W/PRETTYLOGGER﹕ ╟───────────────────────────────────────────────
. W/PRETTYLOGGER﹕ ║ Activity.performCreate  (Activity.java:5264)
. W/PRETTYLOGGER﹕ ║    MainActivity.onCreate  (MainActivity.java:69)
. W/PRETTYLOGGER﹕ ╟───────────────────────────────────────────────
. W/PRETTYLOGGER﹕ ║ eeeeeeeeeeeeee
. W/PRETTYLOGGER﹕ ╚═══════════════════════════════════════════════
. D/PRETTYLOGGER﹕ ╔═══════════════════════════════════════════════
. D/PRETTYLOGGER﹕ ║ Thread: main
. D/PRETTYLOGGER﹕ ╟───────────────────────────────────────────────
. D/PRETTYLOGGER﹕ ║ Activity.performCreate  (Activity.java:5264)
. D/PRETTYLOGGER﹕ ║    MainActivity.onCreate  (MainActivity.java:70)
. D/PRETTYLOGGER﹕ ╟───────────────────────────────────────────────
. D/PRETTYLOGGER﹕ ║ {
. D/PRETTYLOGGER﹕ ║     "年龄": "18岁",
. D/PRETTYLOGGER﹕ ║     "name": "小明"
. D/PRETTYLOGGER﹕ ║ }
. D/PRETTYLOGGER﹕ ╚═══════════════════════════════════════════════

```