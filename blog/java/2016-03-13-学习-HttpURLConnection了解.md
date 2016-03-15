HttpURLConnection继承了URLConnection，因此它也可以使用get或post发送请求。HttpURLConnection对URLConnection做了一定的封装，使用起来更加的方便一些。
##### 可以这样获得
```java
   HttpURLConnection uc = (HttpURLConnection) url.openConnection();
```

##### 它还提供了几个方便的方法：
获取响应代码
- int getResponseCode()

获取响应信息
- String getResponseMessage()

获取请求方法
- String getRequestMethod()

设置请求方法
- void setRequestMethod(String method)

其他的一些用法与URLConnection一样。
比如Get请求
```java
URL url = new URL("http://192.168.1.103:3000/wb/index.html?key1=value1");
    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

    urlConnection.setRequestMethod("GET");
    urlConnection.setConnectTimeout(3 * 1000);
    urlConnection.connect();
    bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));

    String line = null;
    while ((line = bufferedReader.readLine()) != null){
        Log.i("log", line);
    }
```

比如Post请求
```java
URL url = new URL("http://192.168.1.103:3000/wb/index.html");
    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

    urlConnection.setRequestMethod("POST");
    urlConnection.addRequestProperty("name", "test");
    urlConnection.setConnectTimeout(3 * 1000);
    OutputStream outputStream = urlConnection.getOutputStream();
    //设置参数
    outputStream.write("key1=value1&key2=value2".getBytes());

    bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));

    String line = null;
    while ((line = bufferedReader.readLine()) != null){
        Log.e("log1", line);
    }
```