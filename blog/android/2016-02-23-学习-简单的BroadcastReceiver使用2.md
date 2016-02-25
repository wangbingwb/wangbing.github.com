#### Broadcast的种类又可以分为以下两种:
##### 1. Normal Broadcast(普通广播)
> sendBroadcast()

完全异步的，同一时刻所有接受者都可以接受。效率较高，但缺点是接受者之间无法交流，无法传递。
##### 2. Ordered Broadcast(有序广播)
> sendOrderedBroadcast()

接受者按预定声明的优先级一次接受广播。级别高的接受者将先一步接受并处理，然后再传递给低级别的。
这样高级别的就可以给低级别的传递消息。并且该广播可以终止，比如A级别>B级别，A处理完，可以终止传递，这样B就不会接受到。

- 消息直接的传递:
A中放入消息
```java
    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle bundle = new Bundle();
        bundle.putString("first","first message");
        setResultExtras(bundle);
    }
```
B中获取
```java
    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle resultExtras = getResultExtras(true);
        String first = resultExtras.getString("first");
    }
```

- 终止传播代码如下:
```java
    @Override
    public void onReceive(Context context, Intent intent) {
        String msg = intent.getStringExtra("msg");
        abortBroadcast();//终止传播
    }
```
