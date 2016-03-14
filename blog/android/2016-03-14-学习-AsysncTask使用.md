Android中实现异步任务机制之一的AsyncTask是安卓提供的轻量级的异步类，实现简单方便，而且容易实现进度更新。
使用方法可以继承AsyncTask,也可使用匿名类。但都需要提供3个泛型，和必须重载doInBackground(String... params)方法。其他方法可以根据业务来决定是否需要重载。

如下图，各泛型的用处
1.第一String用来传递参数，切参数不定。
2.第二个Integer用来更新进度的参数，一般用数值类来表示
3.第三个String用在doInBackground返回值，该返回值又会用于onPostExecute（）的参数。
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160314233037.jpg)

#### 1.无需更新UI的后台操作
```java
   new AsyncTask<String, Integer, String>() {
        @Override
        protected String doInBackground(String... params) {
            //返回值，进度都无需实现
            //需要异步耗时任务
            return null;
        }
    }.execute();
```

#### 2.需返回更新UI的后台操作
```java
   new AsyncTask<String, Integer, String>() {

        @Override
        protected void onPostExecute(String s) {
            Log.e("log", s);//打印出 "执行成功"
            super.onPostExecute(s);
        }

        @Override
        protected String doInBackground(String... params) {
            return "执行成功";
        }
    }.execute();
```

#### 3.需实时更新进度的后台操作

```java
        @Override
        protected void onProgressUpdate(Integer... values) {
            if (values[0] == 1){
                //更新到1
            }
            if (values[0] == 2){
                //更新到2
            }
            super.onProgressUpdate(values);
        }

        @Override
        protected String doInBackground(String... params) {
            try {
                Thread.sleep(1000);
                publishProgress(1);//更新进度只能使用该方法，它会去调用onProgressUpdate()
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            try {
                Thread.sleep(1000);
                publishProgress(2);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return null;
        }
    }.execute();
```