####使用的目的:

 在一项耗时任务上，不可能无限期的等待下去。无论是从程序健壮性，还是从代码优雅上来看，把不可控变为可控是靠谱的。


ExecutorService有两个方法submit和execute,两个都可以用来执行任务，不同的是submit可以执行Callable和Runable，而execute只能执行Runable

区别是submit可以返回一个Future对象，该对象可以通过get()获取任务执行的结果，Callable可以返回结果而Runable返回的为空。

####一个简单实例
```java
    ExecutorService executorService = Executors.newCachedThreadPool();
    Future future = executorService.submit(new Callable<Integer>() {
        public Integer call() {
            int i = 10;
            while (i > 0) {
                i--;
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("sleep...");
            }
            return 1;
        }
    });

    try {
        Object o = future.get(5, TimeUnit.SECONDS);

        System.out.println("在指定时间内完成，结果为："+o);
    } catch (InterruptedException e) {
        e.printStackTrace();
    } catch (ExecutionException e) {
        e.printStackTrace();
    } catch (TimeoutException e) {
        System.out.println("任务执行时间超时");
    }
    executorService.shutdown();
```