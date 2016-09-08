今天在把eclipse Android项目转为Android Studio项目时，在编译安装apk后发现手机上的文字乱码。
原来是应为eclipse项目原本使用的是GBK编码，而Android Studio默认使用UTF-8编码去编译，所以代码编译是没有问题的，但是一遇到中文字符，就会乱码。

解决办法是告诉编译器用GBK去编译它
只需要配置build.gradle

```xml
android {
    compileSdkVersion 8
    buildToolsVersion "24.0.0"


    //这边是关键的一步，指定编码
    compileOptions {
        encoding "GBK"
    }

}
```