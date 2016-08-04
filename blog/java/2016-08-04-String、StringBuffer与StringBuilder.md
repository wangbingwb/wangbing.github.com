String代表字符串常量
StringBuffer和StringBuilder代表字符串变量

在效率方面:
StringBuilder >  StringBuffer  >  String


1.如果要操作少量的数据用 String
2.单线程操作字符串缓冲区 下操作大量数据用 StringBuilder
3.多线程操作字符串缓冲区 下操作大量数据用 StringBuffer