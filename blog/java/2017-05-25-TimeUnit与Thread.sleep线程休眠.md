线程休眠一般情况下Thread.sleep()是使用比较多的。其参数是一个毫秒级的单位。所以在实际休眠时间较长的情况下数字便难以阅读。

TimeUnit则解决以上问题，如下

```java
    //休眠一秒
    TimeUnit.SECONDS.sleep(1);
    //休眠一分钟
    TimeUnit.MINUTES.sleep(1);
    //休眠一小时
    TimeUnit.HOURS.sleep(1);
    //休眠一天
    TimeUnit.DAYS.sleep(1);

```

TimeUnit还有单位转换方法

```java
    // 1秒转换为毫秒数
    TimeUnit.SECONDS.toMillis(1)
    // 1秒转换为分钟数
    TimeUnit.SECONDS.toMinutes(1)
    // 1秒转换为分钟数
    TimeUnit.DAYS.toHours(1)
    // 1分钟转换为秒数
    TimeUnit.SECONDS.convert(1, TimeUnit.MINUTES)
```