####注解注入
这边只使用了两种注解@Resource和@Autowired来实验。

#####1、假设有一个Service组件

那么
@Resource和@Autowired注解都不需要参数，便能准确的注入。总的来说还是差不多的

####2、 假设有一个接口，2个实现类
那么注入时如果和以上一样会出现，无法正确注入。这时候就需要我们给他指定了。

@Resource指定对象的方式是这样的
例如我这边两个实现类Ser1和Ser2

那么在注解注入时需要变为
@Resource(name = "ser1")
或
@Resource(name = "ser2")

>name的值是有规则的，是具体类名称首字母变为小写的名称。

@Autowired没有类似接口
需要在该注解同一块添加@Qualifier("ser1");

就会变成这样
@Autowired
@Qualifier("ser1")

>如此便可以在有多喝同类型的情况正确注入