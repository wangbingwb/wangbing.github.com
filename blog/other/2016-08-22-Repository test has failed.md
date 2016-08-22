因为换了一个电脑，所以工具全部都需要重新安装一遍。
Android studio是考的所以不需要安装，而当安装好Git之后，去下载一个git工程时出现了问题。

Test URL出现:
`repository test has failed`

而直接clone出现
`Failed to start Git process`

android studio以前一直是考的，没有出现过异常，那么问题就出现在git安装上了。

找了半天，终于找到原因了，原来是Git安装时，有时不会在环境变量path中添加Git路径。
例如我在path添加
`C:\Program Files\Git\cmd`
这样Android studio 则可以找到目录

如果不想配置环境变量，还可以直接在Android studio中配置
File --> settings --> Version Control --> Git 如图:
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20160822210248.jpg)
