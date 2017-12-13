Long类型转为js数字类型会丢失精度问题，无非是js支持的精度与javaLong类型支持的精度不一样导致的。
虽然数字类型的精度有限，但是字符串没有精度等问题，因此将Long类型转换为字符是解决问题的一个较好的办法。

#####思路一
    通过获得fastjson源码来修改，既Long类型返回为String类型。但是此方法较麻烦，需要更改依赖等。之前曾用过。

#####思路二
    这个问题应该是既有问题，fastjson应该不会不对此做出解决方案，终于在寻找多次尝试后成功了，该方法较简单，可以说只需要在对象转换为jsonString时增加一行配置代码即可。

如下：

在对象转换成jsonString时通过ValueFilter来实现。
```java
   String jsonString = JSON.toJSONString(baseResponse, new ValueFilter() {
        @Override
        public Object process(Object o, String s, Object o1) {
            if (o1 instanceof Long) {
                Long o11 = (Long) o1;
                return String.valueOf(o11);
            }
            return o1;
        }
    });

```

在没有设置自己的ValueFilter时，每个属性在序列化是按照其本身类型来序列化。但是通过这个过滤器，我可能一拦截此Long类型，并转为String，则不会在出现js精度丢失问题。