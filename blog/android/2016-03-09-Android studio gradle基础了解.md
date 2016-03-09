刚开始学习java时，使用的eclipse，对其他java类IDE不熟悉，对项目构建更是了解甚微。而从进了新公司后，开始使用IDEA开发工具，几个月使用下来，发现它确实比eclipse好很多，就拿项目构建来说，IDEA集成的MAVEN，构建一个项目只需要几步即可轻松搭建符合各种流行框架。如果你们公司还在使用最古老的方法，手动考架包，那么你们就out了。
IDEA了，有个双包胎软件，那就是Android studio，studio整个界面使用几乎跟IDEA相同。两者都可以开发Android项目，不同点从名字上就可以看出studio是专门为Android开发量身定制的一款开发工具。因此使用Android studio相对IDEA对开发安卓应用的兼容性更好。
Android studio默认构建工具是gradle
#### 下面了解一下gradle：
[史上最详细的Android Studio系列教程四--Gradle基础](https://segmentfault.com/a/1190000002439306 "asd")

#### 什么是Gradle？
Gradle是一种依赖管理工具，基于Groovy语言，面向Java应用为主，它抛弃了基于XML的各种繁琐配置，取而代之的是一种基于Groovy的内部领域特定（DSL）语言。

Android studio创建项目时会生成几个.gradle文件
如下
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160309123323.jpg)
这里一共出现了3个.gradle
- MyApplication
    1.build.gradle
    2.settings.gradle
- app
    3.build.gradle

#### 1.build.gradle
```java
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:1.0.0'
    }
}

allprojects {
    repositories {
        jcenter()
    }
}
```
这边出现了2个repositories
> buildscript中声明的gradle脚本自身需要使用的资源
> allprojects中声明的是整个项目或是整个模块所依赖的资源。

因此项目中需要依赖公司私库可以在allprojects的repositories中声明
例如：
```java
        maven {
            url 'http://nexus.simple.com:8081/nexus/content/groups/public/'
        }
```

#### 2.settings.gradle
```java
    include ':app'
```
settings.gradle内容很简单，是全局的项目配置文件，里面主要声明一些需要加入gradle的module。
例如我这边只有一个app module，这边只需 
*include ':app'*
如果我还有另一个项目叫abb 可以这样 
*include ':app :abb'*

#### 3.build.gradle
```java
apply plugin: 'com.android.application'

android {
    compileSdkVersion 22 //SDK版本
    buildToolsVersion "23.0.2"//编译版本

    defaultConfig {
        applicationId "com.example.wb.myapplication"//应用程序包名
        minSdkVersion 19//最低sdk运行版本
        targetSdkVersion 22//APP是打算面向哪个安卓版本
        versionCode 1 //版本值
        versionName "1.0" //版本显示名称，显示给用户看的
    }
    buildTypes {
        release {
            minifyEnabled false //控制代码是否混淆，防止反编译
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
//这个proguard-android.txt是sdk中groguard默认的文件，具体地址在：/opt/sdk/tools/proguard/proguard-android.txt 
        }
    }
}

dependencies {//依赖包
    compile fileTree(dir: 'libs', include: ['*.jar'])//libs目录下jar包
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:22.2.1'//maven库依赖包
}
```
    apply plugin: 'com.android.application'
    声明安卓程序

这边引用maven库依赖包很简单。
maven项目中依赖配置3项就能定位jar包，如下：
```java
<dependency>  
    <groupId>junit</groupId>  
    <artifactId>junit</artifactId>  
    <version>3.8.1</version>  
</dependency>  
```
gradle中也是3项定位，只是比maven项目中更简洁
形如： compile 'groupId:artifactId :version'
上面的compile 'com.android.support:appcompat-v7 :22.2.1'就是如此

