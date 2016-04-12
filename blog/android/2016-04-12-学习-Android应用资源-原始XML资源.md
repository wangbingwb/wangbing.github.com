某些时候，Android应用需要加载一些原始XML资源。例如用于初始化配置，或资源等情况。这时就需要去定义XML资源。
路径是/res/xml 有时可能没有xml这个文件夹，需要自己手动创建。
访问方式：
java：[package_name]R.resource_type.resource_name
XML中:@[package_name: ]resource_type/resource_name

但是实际中更多的是获取实际的XML进行处理，通过以下方法处理
- XmlResourceParser getResources().getXml(int id)
```java
XmlResourceParser xml = getResources().getXml(R.xml.test);
```

Android默认使用内置的Pull解析器来解读XML文件。当Pull解析器开始解析后，开发者通过不断调用Pull解析器的next()方法获取下一个解析事件(开始文档，结束文档，开始标签，结束标签)。当处于某个元素处时，可以通过XmlPullParser的getAttributeValue方法获取该元素的属性值，也可以调用nextText()方法获取文本节点的值。

下面一个简单的例子：
XML文件
```xml
<?xml version="1.0" encoding="utf-8"?>
<books>
    <book price="100">Java</book>
    <book price="200">Android</book>
</books>
```

Java解析代码：
```java
send.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        String str = "";
        try {
            XmlResourceParser xml = getResources().getXml(R.xml.test);
            while (xml.getEventType() != XmlResourceParser.END_DOCUMENT){//没有到文档结尾
                if (xml.getEventType() == XmlResourceParser.START_TAG){//遇到开始标签
                    String tagName = xml.getName();
                    if ("book".equals(tagName)){
                        String price = xml.getAttributeValue(null,"price");
                        str = str + price;
                        str = str + xml.nextText()+"\n";
                    }
                }
                xml.next();
            }
            send.setText(R.string.app_name);
        } catch (XmlPullParserException e) {
            e.printStackTrace();
        }catch (IOException e) {
            e.printStackTrace();
        }

        Toast.makeText(MainActivity.this,str,Toast.LENGTH_LONG).show();
    }
});
```

显示出现的消息就是：
> 100Java
200Android