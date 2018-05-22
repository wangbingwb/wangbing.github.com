###因为UTF-8支持各种语言，所以项目中全部以UTF-8为准讨论乱码解决方式###

解决方式一
> 找到IntelliJ IDEA\bin\idea.exe.vmoptions或IntelliJ IDEA\bin\idea64.exe.vmoptions
结尾追加 -Dfile.encoding=UTF-8

以上为全局方法

解决方式二
> 和方式一原理一样，但是只针对单个项目
打开Run/Debug Configurations配置界面
找打 VM options 添加 -Dfile.encoding=UTF-8

解决方式三
> Tomcat_HOME/conf/server.xml修改Tomcat全局配置文件
<Connector executor="tomcatThreadPool"
        port="8080" protocol="HTTP/1.1"
        connectionTimeout="20000"
        redirectPort="8443"
        URIEncoding="UTF-8" />

解决方式四
> Idea本身引起的乱码
打开File->Settings->Editor-File Encodings
修改 IDE Encoding 为UTF-8
修改 Project Encoding 为UTF-8
修改以下项目File/Directory的Default Encoding编码为UTF-8
修改properties Files编码为UTF-8

解决方式五
>查看单文件是否有乱码现象
打开文件右下角编码格式改为UTF-8，可能会导致中文乱码，改为原来ctrl+C,切为UTF-8再ctrl+V

解决方式六
>文件本身编码信息已经丢失，例如部分中文字符无法显示正常。此种情况一般是无法恢复了，只能手动恢复乱码。
原因是几种编码切换中，字节码丢失导致的，无恢复可能性。
