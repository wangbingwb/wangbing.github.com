TextView中使用SpannableString很简单，因为SpannableString继承了CharSequence。
#####SpannableString构造：
	`SpannableString(CharSequence source)`
#####设置样式
	`public void setSpan(Object what, int start, int end, int flags)`
####参数的意义
- what
    表示具体的样式，例如粗细，大小，颜色
- start
    样式开始的位置
- end
    样式结束的位置
- flags
    用来定义当文字发生变化时，如何去重新表现样式。
    例如：现在是EditText，当文本发生变化时、在中间位子或前后插入字符时如何去重新显示样式便是改flags的作用。

下面总结了一下常用的文字样式设置方法，当然并不是全部使用了。因为这次主要使用的是TextView,默认内容固定不会改变，所有下面的实例代码中的flags并没有意义。

####效果图
![](http://osswb.oss-cn-shanghai.aliyuncs.com/image/20161010152741.jpg)

####代码
```java
{
    TextView textView = new TextView(this);
    SpannableString spannableString = new SpannableString("文字加粗");
    spannableString.setSpan(new StyleSpan(Typeface.BOLD), 2, 4, Spanned.SPAN_INCLUSIVE_INCLUSIVE);

    textView.setText(spannableString);
    view.addView(textView);
}
{
    TextView textView = new TextView(this);
    SpannableString spannableString = new SpannableString("文字字体");
    spannableString.setSpan(new TypefaceSpan("serif"), 2, 4, Spanned.SPAN_INCLUSIVE_INCLUSIVE);

    textView.setText(spannableString);
    view.addView(textView);
}
{
    TextView textView = new TextView(this);
    SpannableString spannableString = new SpannableString("文字斜体");
    spannableString.setSpan(new StyleSpan(Typeface.ITALIC), 2, 4, Spanned.SPAN_INCLUSIVE_INCLUSIVE);

    textView.setText(spannableString);
    view.addView(textView);
}
{
    TextView textView = new TextView(this);
    SpannableString spannableString = new SpannableString("文字背景红色");
    spannableString.setSpan(new BackgroundColorSpan(Color.RED), 2, 6, Spanned.SPAN_INCLUSIVE_INCLUSIVE);

    textView.setText(spannableString);
    view.addView(textView);
}
{
    TextView textView = new TextView(this);
    SpannableString spannableString = new SpannableString("文字蓝色");
    spannableString.setSpan(new ForegroundColorSpan(Color.BLUE), 2, 4, Spanned.SPAN_INCLUSIVE_INCLUSIVE);

    textView.setText(spannableString);
    view.addView(textView);
}
{
    TextView textView = new TextView(this);
    SpannableString spannableString = new SpannableString("文字带下划线");
    spannableString.setSpan(new UnderlineSpan(), 2, 6, Spanned.SPAN_INCLUSIVE_INCLUSIVE);

    textView.setText(spannableString);
    view.addView(textView);
}
{
    TextView textView = new TextView(this);
    SpannableString spannableString = new SpannableString("文字大小100px");
    spannableString.setSpan(new AbsoluteSizeSpan(100), 2, 9, Spanned.SPAN_INCLUSIVE_INCLUSIVE);

    textView.setText(spannableString);
    view.addView(textView);
}
{
    TextView textView = new TextView(this);
    SpannableString spannableString = new SpannableString("文字删除线");
    spannableString.setSpan(new StrikethroughSpan(), 2, 5, Spanned.SPAN_INCLUSIVE_INCLUSIVE);

    textView.setText(spannableString);
    view.addView(textView);
}
{
    TextView textView = new TextView(this);
    SpannableString spannableString = new SpannableString("文字URL");
    spannableString.setSpan(new URLSpan("tel:4155551212"), 2, 5, Spanned.SPAN_INCLUSIVE_INCLUSIVE);

    textView.setText(spannableString);
    view.addView(textView);
}
{
    TextView textView = new TextView(this);
    SpannableString spannableString = new SpannableString("这是下标");
    spannableString.setSpan(new SubscriptSpan(), 2, 4, Spanned.SPAN_INCLUSIVE_INCLUSIVE);

    textView.setText(spannableString);
    view.addView(textView);
}
{
    TextView textView = new TextView(this);
    SpannableString spannableString = new SpannableString("这是上标");
    spannableString.setSpan(new SuperscriptSpan(), 2, 4, Spanned.SPAN_INCLUSIVE_INCLUSIVE);

    textView.setText(spannableString);
    view.addView(textView);
}
{
    TextView textView = new TextView(this);
    SpannableString spannableString = new SpannableString("这是中间对齐");
    spannableString.setSpan(new AlignmentSpan.Standard(Layout.Alignment.ALIGN_CENTER), 0, 6, Spanned.SPAN_INCLUSIVE_INCLUSIVE);

    textView.setText(spannableString);
    view.addView(textView);
}
{
    TextView textView = new TextView(this);
    SpannableString spannableString = new SpannableString("前面多个点");
    spannableString.setSpan(new BulletSpan(10,Color.RED), 0, 0, Spanned.SPAN_INCLUSIVE_INCLUSIVE);

    textView.setText(spannableString);
    view.addView(textView);
}
```