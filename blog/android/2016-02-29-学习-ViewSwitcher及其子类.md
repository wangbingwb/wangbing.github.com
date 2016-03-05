TextSwitcher和ImageSwitcher是继承自ViewSwitcher。是ViewSwitcher的扩展，用法几乎相同。唯一的区别就在factory返回的对象有了约束。

##### TextSwitcher的factory返回的只能是TextView及其子类
```java
        textSwitcher.setFactory(new ViewSwitcher.ViewFactory() {
            @Override
            public View makeView() {
                return new TextView(MainActivity.this);
            }
        });
```
切换文字可以这样:
```java
        textSwitcher.setText("next")
```

##### ImageSwitcher的factory返回的只能是ImageView及其子类
```java
        imageSwitcher.setFactory(new ViewSwitcher.ViewFactory() {
            @Override
            public View makeView() {
                return new ImageView(MainActivity.this);
            }
        });
```
切换图片可以这样:
```java
        imageSwitcher.setImageResourse(R.drawable.img)
```

- 其他用法与ViewSwitcher类似