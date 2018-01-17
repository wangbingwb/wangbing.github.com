####SpringMVC静态资源访问

xml文件配置
```
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans-4.1.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context-4.1.xsd
        http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc-4.1.xsd">
         .
         .
         .
 
    <mvc:annotation-driven />
    <mvc:resources mapping="/static/**" location="/static/" />

         .
         .
         .

</beans>
```
其中
       xmlns:mvc="http://www.springframework.org/schema/mvc 
      http://www.springframework.org/schema/mvc/spring-mvc-4.1.xsd
也是必不可少的


