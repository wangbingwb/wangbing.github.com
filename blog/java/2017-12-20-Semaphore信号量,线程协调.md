介绍不多说 https://www.cnblogs.com/nullzx/p/5270233.html

Semaphore初始化时给一个数值，就是释放的信号数量，决定着多少线程可以同步执行。

方法acquire()获取信号，当所有信号被占用时，便会阻塞直到获取到。
方法release()释放信号，当我代码执行完成，占用的信号的便可释放让其他线程通行。

####实例：
```java
    ExecutorService executorService = Executors.newFixedThreadPool(4);
    final Semaphore semaphore = new Semaphore(2);

    for (int i = 0; i < 4; i++) {
        executorService.execute(new Runnable() {
            public void run() {
                try {
                    //获得信号
                    semaphore.acquire();

                    //do something
                    System.out.println(new SimpleDateFormat("HH:mm:ss").format(new Date()) + "获得信号量时间");
                    TimeUnit.SECONDS.sleep(30);

                    //释放信号
                    semaphore.release();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
    }
    executorService.shutdown();
```

####执行结果
```java
10:50:15获得信号量时间
10:50:16获得信号量时间
10:50:45获得信号量时间
10:50:46获得信号量时间
```