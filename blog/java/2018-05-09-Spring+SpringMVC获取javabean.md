Spring+SpringMVC 中获取javabean

网上获取的方式比较多，但总是比较模糊。时而有用时而没用，关键是配置杂乱，记录不全。
而Spring的容器和SpringMVC的容器又是父子关系，相互之间并不是相同的，我这里介绍一种比较靠谱的获取方式，可以分别获取父容器和子容器。

####第一步 web.xml中配置监听
```java
  <!-- spring容器监听器 -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
```

####第二步 任意类中获取

```java
        //获取Spring的根容器
        this.rootWac = ContextLoader.getCurrentWebApplicationContext();
        //获取ServletContext
        this.servletContext = rootWac.getServletContext();
        //获取SpringMVC的子容器
        this.mvcApplicationContext = WebApplicationContextUtils.getWebApplicationContext(servletContext, "org.springframework.web.servlet.FrameworkServlet.CONTEXT.mvc-dispatcher");
        //获取子容器中bean，则使用子容器对象来获取，
        this.viewResolver = this.mvcApplicationContext.getBean(FreeMarkerViewResolver.class);

```