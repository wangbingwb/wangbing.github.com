当需序列化java对象有循环引用或是有重复引用是，序列化后jsonString会出现“$ref”等关键字，但是实际是该属性也是一个对象，我们可能需要得到正确的输出效果。

当然，该关键字的出现是为避免一些复杂结构的问题，但是一般情况下我们需序列化的对象并没有想象的中的复杂。只是指向了同一个对象。这是逻辑正确的。

#####如果关闭此序列化操作？
toJSONString之时，增加SerializerFeature.DisableCircularReferenceDetect配置。

如下：
```java
    String jsonStr = JSON.toJSONString(object, SerializerFeature.DisableCircularReferenceDetect);
```