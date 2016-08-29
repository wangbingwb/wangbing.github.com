工具:
D:\Android\sdk\platform-tools\adb.exe

在只有一个模拟器的情况下命令行`adb shell`即可进入模拟器的控制台
如图:
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160823102802.jpg)

但是当有多个模拟器或真机时会提示
`error: more than one device/emulator`

不用急 `adb devices` 列出所有，我这边如下：
```java
D:\Android\sdk\platform-tools>adb devices
List of devices attached
192.168.56.101:5555     device
CJL5T16120034629        unauthorized
```

一共有两个，如果我想要进入第一个需要加一个`-s`参数
如下
```java
D:\Android\sdk\platform-tools>adb -s 192.168.56.101:5555 shell
root@vbox86p:/ #
```

接下来只需要熟练的linux命令就可以完成一些简单的任务了

例如以下一些简单常用命令:
`ls` 显示文件或目录 `-a` 参数显示所有，包括隐藏文件

`ll` 与上个类似，不是显示的是详细信息

`cd` 目录变换命令

`pwd` 显示当前目录

`mkdir` 建立新目录

`rmdir` 删除空目录

`cp` 复制命令

`rm` 移除文件或目录 `-rf` 参数删除整个目录包括子目录

`mv` 移动目录

`cat` 由第一行显示文档内容

`tac` 有最后一行显示文档内容

`touch` 新建文件

`date` 时间

`find[path][option]` 查找文件 -name 'key' 参数文件名为key
