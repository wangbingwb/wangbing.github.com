�������л�java������ѭ�����û������ظ������ǣ����л���jsonString����֡�$ref���ȹؼ��֣�����ʵ���Ǹ�����Ҳ��һ���������ǿ�����Ҫ�õ���ȷ�����Ч����

��Ȼ���ùؼ��ֵĳ�����Ϊ����һЩ���ӽṹ�����⣬����һ����������������л��Ķ���û��������еĸ��ӡ�ֻ��ָ����ͬһ�����������߼���ȷ�ġ�

#####����رմ����л�������
toJSONString֮ʱ������SerializerFeature.DisableCircularReferenceDetect���á�

���£�
```java
    String jsonStr = JSON.toJSONString(object, SerializerFeature.DisableCircularReferenceDetect);
```