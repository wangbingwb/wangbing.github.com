javaWeb集成单个Spring配置
一直以来都是直接套用现有的项目的框架依赖没有单独配置过，突然让配置还真有点反应不过来，到处查资料。想想有些东西还是要记下来的好，就算忘了，看到自己写的也可以很快的回想起来。

####1、POM依赖：
```java
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>3.1.1.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>3.1.1.RELEASE</version>
        </dependency>
```
注：spring-context已经包含了aop、beans、core、expression、asm等jar包。所以就不一一引用的，看着也干净些。

####2、Spring上下文编写
```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.5.xsd">

     //一个测试bean，注入参数count =1
    <bean id="test" class="com.log.dao.Test">
        <property name="count" value="1"></property>
    </bean>

</beans>

````


####3、web.xml配置

```java
    //配置路径方式一，classes文件夹下
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:spring.xml</param-value>
    </context-param>
    //配置路径方式二，WEB-INF文件夹下
    <!--<context-param>-->
        <!--<param-name>contextConfigLocation</param-name>-->
        <!--<param-value>WEB-INF/spring.xml</param-value>-->
    <!--</context-param>-->

    //启动监听器，当web服务启动时，上下文启动
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
```

####4、程序中调用
```java
        WebApplicationContext context = ContextLoader.getCurrentWebApplicationContext();
        Test bean = context.getBean(Test.class);
        bean.print();
```
