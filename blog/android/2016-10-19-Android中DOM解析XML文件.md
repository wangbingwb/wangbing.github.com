**DOM方式解析xml是需要把xml文档读到内存中形成树形结构，但是这样一来，如果xml文件很大化就不太适合了。**


#### 首先看下XML文件
```java
<?xml version="1.0" encoding="utf-8"?>
<books>
    <book price="100$">
        <name>疯狂Java</name>
        <author>未知</author>
    </book>
    <book price="100$">
        <name>疯狂英语</name>
        <author>未知</author>
    </book>
</books>
```
>这里我放置的位子是res/raw/books.xml，当然也可以放到assets文件下。至于res/xml下的文件目前不知道如何用io流的形式读取。

#### 关键代码
```java
try {
    //创建文档构建对象
    DocumentBuilder documentBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
    //根据io输入流生成文档对象
    Document doc = documentBuilder.parse(getResources().openRawResource(R.raw.books));
    //获取根元素
    Element documentElement = doc.getDocumentElement();

    if (documentElement != null){
        NodeList books = documentElement.getElementsByTagName("book");

        //循环读取子元素
        for (int i = 0; i < books.getLength(); i++) {
            Node bookNode = books.item(i);
            if (bookNode.getNodeType() == Node.ELEMENT_NODE){
                Element item = (Element) bookNode;

                //当前book节点，取price属性
                String price = item.getAttribute("price");
                
                String name = "";
                String author = "";
                //下面获取该元素下的属性元素
                NodeList childNodes = item.getChildNodes();
                for (int j = 0; j < childNodes.getLength(); j++) {
                    Node node = childNodes.item(j);
                    if (node.getNodeType() == Node.ELEMENT_NODE){
                        Element e = (Element) node;
                        if ("name".equals(e.getTagName())){
                            name = e.getTextContent();
                        }
                        if ("author".equals(e.getTagName())){
                            author = e.getTextContent();
                        }
                    }

                }
                Log.d("--->",name+"/"+author+"="+price);
            }
        }
    }
} catch (ParserConfigurationException e) {
    e.printStackTrace();
} catch (SAXException e) {
    e.printStackTrace();
} catch (IOException e) {
    e.printStackTrace();
}
```

#### 控制台结果
```java
 D/--->: 疯狂Java/未知=100$
 D/--->: 疯狂英语/未知=100$
```

