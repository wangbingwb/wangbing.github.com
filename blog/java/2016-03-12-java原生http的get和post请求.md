今天面试时，到上机部分，用到原始的http请求方式。一下懵逼了，以前在这块真没怎么涉及，除了学习时看过几遍。其他地方还真没怎么用到过。就算用到的也是一套封装好api。
好吧，回来有空了。重新看一遍，顺便写个dome。加深一下记忆，顺便整理一下，写个dome，方便以后再遇到，也可以直接拿来用不是？

#### 1.先看一下Java原生http请求如何的
我们在游览器中访问需要一个url，然后enter后会返回一个html页面。

java中也需要这个，而且把它封装成一个URL对象。通过URL的openConnection()，打开一个URLConnection对象，其实只是一个虚拟的连接，并没有连通。这时我们可以通过返回的URLConnection这个对象来设置request的head信息，以及一些访问配置。当一切就绪后，再调用URLConnection的connect()，这时才会建立连接。连接之后调用URLConnection的getInputStream()就可以得到我们需要的html网页文件的流，之后如何处理全看业务了。
下面贴例子
```java
public static void main(String[] args) {
        BufferedReader bufferedReader = null;
        try {
            URL url = new URL("http://localhost:3000/wb/index.html");

            URLConnection urlConnection = url.openConnection();//获得连接对象
            urlConnection.setConnectTimeout(3 * 1000);//设置多长时间超时
            urlConnection.connect();//连接

            //得到输入流
            bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));

            //解析打印出来
            String line;
            while ((line = bufferedReader.readLine()) != null){
                System.out.println(new String(line.getBytes(),"utf-8"));
            }

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if (bufferedReader != null){
                try {
                    bufferedReader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
```

上面几句话就完成一个http请求，当然实际情况不可能这么简单。
http常用的就是get和post，上面的例子只是一个get请求，参数直接放到url中便可。
post请求与get请求有点不同，就是建立连接的方式不同。上面有getInputStream(),自然而然会有getOutputStram()，他就是用来post请求的。

#### 2.post请求只需要稍微改动上面的get代码
```java
public static void main(String[] args) {
        BufferedReader bufferedReader = null;
        PrintWriter out = null;
        try {
            URL url = new URL("http://www.baidu.com");

            URLConnection urlConnection = url.openConnection();
            urlConnection.setConnectTimeout(3 * 1000);

            //这边post，以下需要设置，否则post报异常
            urlConnection.setDoOutput(true);
            urlConnection.setDoInput(true);
            out = new PrintWriter(urlConnection.getOutputStream());
            // 发送请求参数
            out.print("key=value");
            // flush输出流的缓冲
            out.flush();

            bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));

            String line;
            while ((line = bufferedReader.readLine()) != null) {
                System.out.println(new String(line.getBytes(), "utf-8"));
            }

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bufferedReader != null) {
                    bufferedReader.close();
                }
                if (out != null){
                    out.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }
```
